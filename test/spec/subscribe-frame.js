define(function () {
  describe('the subscribe frame', function () {
    var iframe = document.querySelector('iframe');

    function on(listener) {
      window.addEventListener('message', listener);
    }

    function off(listener) {
      window.removeEventListener('message', listener);
    }

    function getMessageListener(fn) {
      return function (e) {
        if (e.data === 'mocha-zero-timeout') {
          return;
        }
        fn.call(this, e);
      };
    }

    before(function (done) {
      iframe.src = 'assets/subscribe-frame.html#widget-id';
      var listener = getMessageListener(function onMessage() {
        off(listener);
        done();
      });

      on(listener);
    });

    it('should post `ready` to its parent on load', function (done) {
      var listener = getMessageListener(function onMessage(e) {
        var message = JSON.parse(e.data);

        expect(message.type).to.be('ready');
        expect(message.id).to.be('widget-id');

        off(listener);
        done();
      });

      on(listener);
      iframe.contentWindow.location.reload();
    });

    describe('on receiving a `subscribe` message', function () {
      var xhr;
      var requests;

      beforeEach(function (done) {
        var listener = getMessageListener(function onMessage() {
          function waitForSinon() {
            var frameWin = iframe.contentWindow;

            if (!frameWin.sinon || !frameWin.sinon) {
              setTimeout(waitForSinon, 0);
              return;
            }

            xhr = iframe.contentWindow.sinon.useFakeXMLHttpRequest();
            xhr.onCreate = function (req) {
              requests.push(req);
            };

            requests = [];

            done();
          }

          var frameDoc = iframe.contentDocument;

          off(listener);

          var sinon = frameDoc.createElement('script');
          sinon.src = '../sinon.js';
          frameDoc.body.appendChild(sinon);

          var sinonIE = frameDoc.createElement('script');
          sinonIE.src = '../sinon-ie.js';
          frameDoc.body.appendChild(sinonIE);

          setTimeout(waitForSinon, 0);
        });

        on(listener);
        iframe.contentWindow.location.reload();
      });

      it('should POST to `/api/v1/widget/{id}/subscribe/{msisdn}`',
        function (done) {
          function waitForRequest() {
            if (requests.length < 1) {
              setTimeout(waitForRequest, 0);
              return;
            }

            expect(requests.length).to.be(1);
            expect(requests[0].url).
              to.be('/api/v2/widget/123abc/subscribe/5125551234');
            done();
          }

          iframe.contentWindow.postMessage(JSON.stringify({
            type: 'subscribe',
            widgetId: '123abc',
            mobileNumber: '5125551234'
          }), '*');

          setTimeout(waitForRequest, 0);
        });

        describe('on receiving success', function () {
          it('should post `result` with success === true to its parent',
            function (done) {
              var listener = getMessageListener(function onMessage(e) {
                var message = JSON.parse(e.data);

                expect(message.type).to.be('result');
                expect(message.success).to.be(true);
                expect(message.message).to.be('Successfully subscribed');

                off(listener);
                done();
              });

              on(listener);

              iframe.contentWindow.postMessage(JSON.stringify({
                type: 'subscribe',
                widgetId: '123abc',
                mobileNumber: '5125551234'
              }), '*');

              setTimeout(function () {
                requests[0].respond(204, {}, '');
              }, 0);
            });
          });

        describe('on receiving error', function () {
          it('should post `result` with success === false to its parent',
            function (done) {
              var listener = getMessageListener(function onMessage(e) {
                var message = JSON.parse(e.data);

                expect(message.type).to.be('result');
                expect(message.success).to.be(false);
                expect(message.message).to.be('Subscription failed');

                off(listener);
                done();
              });

              on(listener);

              iframe.contentWindow.postMessage(JSON.stringify({
                type: 'subscribe',
                widgetId: '123abc',
                mobileNumber: '5125551234'
              }), '*');

              setTimeout(function () {
                requests[0].respond(404, {}, '');
              }, 0);
            });
          });
    });
  });
});
