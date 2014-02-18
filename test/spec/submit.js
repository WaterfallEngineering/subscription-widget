define([
  './util'
],
function (util) {
  describe('submit', function () {
    var iframe = document.querySelector('iframe');
    var messageSpy = sinon.spy();
    var frameDoc, frameWin, targetFrameWin;

    this.timeout(10000);

    beforeEach(function (done) {
      iframe.src = 'assets/test-submit.html';
      util.waitOnFrame(iframe, function () {
        frameDoc = iframe.contentDocument;
        frameWin = iframe.contentWindow;
        targetFrameWin = frameDoc.querySelector('iframe').contentWindow;

        $(frameWin).on('message', function (e) {
          if (JSON.parse(e.originalEvent.data).type !== 'ping') {
            messageSpy(e);
          }
        });
        done();
      });
    });

    beforeEach(function () {
      messageSpy.reset();
    });

    it('does nothing if the number is invalid', function (done) {
      var widget = frameDoc.querySelector(util.getWidgetSelector(''));
      var submitButton =
        $(widget.querySelector(util.getWidgetSelector('submit-btn')))[0];

      $(submitButton).click();
      Q.delay(10).then(function () {
          sinon.assert.notCalled(messageSpy);
          done();
        }).
        fail(done);
    });

    describe('if valid', function () {
      var areaCode = '512';
      var prefix = '555';
      var lineNo = '1234';
      var handle;

      beforeEach(function (done) {
        function ping() {
          targetFrameWin.postMessage(JSON.stringify({
            type: 'ping'
          }), '*');

          handle = setTimeout(ping, 100);
        }

        function onPing() {
          clearTimeout(handle);
          messageSpy.reset();
          done();
        }

        $(frameWin).one('message', onPing);
        ping();
      });

      it('marks the widget as busy', function () {
        var widget = frameDoc.querySelector(util.getWidgetSelector(''));
        var areaCodeEl =
          $(widget.querySelector(util.getWidgetSelector('area-code')))[0];
        var prefixEl =
          $(widget.querySelector(util.getWidgetSelector('prefix')))[0];
        var lineNoEl =
          $(widget.querySelector(util.getWidgetSelector('line-no')))[0];
        var submitButton =
          $(widget.querySelector(util.getWidgetSelector('submit-btn')))[0];

        areaCodeEl.value = areaCode;
        prefixEl.value = prefix;
        lineNoEl.value = lineNo;
        $(submitButton).click();

        expect($(widget).hasClass(util.getWidgetClass('busy'))).to.be(true);
      });

      it('disables the submit button', function () {
        var widget = frameDoc.querySelector(util.getWidgetSelector(''));
        var areaCodeEl =
          $(widget.querySelector(util.getWidgetSelector('area-code')))[0];
        var prefixEl =
          $(widget.querySelector(util.getWidgetSelector('prefix')))[0];
        var lineNoEl =
          $(widget.querySelector(util.getWidgetSelector('line-no')))[0];
        var submitButton =
          $(widget.querySelector(util.getWidgetSelector('submit-btn')))[0];

        areaCodeEl.value = areaCode;
        prefixEl.value = prefix;
        lineNoEl.value = lineNo;
        $(submitButton).click();

        expect(submitButton.disabled).to.be(true);
      });

      it('waits for the frame to be ready if not', function (done) {
        var widget = frameDoc.querySelector(util.getWidgetSelector(''));
        var areaCodeEl =
          $(widget.querySelector(util.getWidgetSelector('area-code')))[0];
        var prefixEl =
          $(widget.querySelector(util.getWidgetSelector('prefix')))[0];
        var lineNoEl =
          $(widget.querySelector(util.getWidgetSelector('line-no')))[0];
        var submitButton =
          $(widget.querySelector(util.getWidgetSelector('submit-btn')))[0];

        function onReady() {
          messageSpy.reset();

          $(frameWin).one('message', onSubscribe);
        }

        function onSubscribe() {
          var data;

          expect(messageSpy.callCount).to.be(1);
          data = JSON.parse(messageSpy.firstCall.args[0].originalEvent.data);
          expect(data.widgetId).to.be('123');
          expect(data.mobileNumber).to.be(areaCode + prefix + lineNo);
          done();
        }

        areaCodeEl.value = areaCode;
        prefixEl.value = prefix;
        lineNoEl.value = lineNo;
        $(submitButton).click();

        Q.delay(100).
          then(function () {
            expect(messageSpy.called).to.be(false);

            targetFrameWin.postMessage(JSON.stringify({
              type: 'ready'
            }), '*');

            $(frameWin).one('message', onReady);
          }).
          fail(done);
      });

      describe('if the frame is ready', function () {
        var widget, areaCodeEl, prefixEl, lineNoEl, submitButton, resultEl;

        beforeEach(function (done) {
          widget = frameDoc.querySelector(util.getWidgetSelector(''));
          areaCodeEl =
            $(widget.querySelector(util.getWidgetSelector('area-code')))[0];
          prefixEl =
            $(widget.querySelector(util.getWidgetSelector('prefix')))[0];
          lineNoEl =
            $(widget.querySelector(util.getWidgetSelector('line-no')))[0];
          submitButton =
            $(widget.querySelector(util.getWidgetSelector('submit-btn')))[0];
          resultEl =
            $(widget.querySelector(util.getWidgetSelector('result')))[0];

          function onReady(e) {
            if (JSON.parse(e.originalEvent.data).type !== 'ready') {
              // ignore spurious 'ping' messages
              return;
            }

            $(frameWin).off('message', onReady);

            messageSpy.reset();
            areaCodeEl.value = areaCode;
            prefixEl.value = prefix;
            lineNoEl.value = lineNo;
            $(submitButton).click();
            $(frameWin).one('message', onSubscribe);
          }

          function onSubscribe() {
            done();
          }

          targetFrameWin.postMessage(JSON.stringify({
            type: 'ready'
          }), '*');

          $(frameWin).on('message', onReady);
        });

        it('posts the subscription to the frame', function () {
          var data;

          expect(messageSpy.callCount).to.be(1);
          data = JSON.parse(messageSpy.firstCall.args[0].originalEvent.data);
          expect(data.type).to.be('subscribe');
          expect(data.widgetId).to.be('123');
          expect(data.mobileNumber).to.be(areaCode + prefix + lineNo);
        });

        it('leaves the submit button disabled while the result is pending',
          function () {
            expect(submitButton.disabled).to.be(true);
          });

        describe('on subscription success', function () {
          beforeEach(function (done) {
            targetFrameWin.postMessage(JSON.stringify({
              type: 'result',
              success: true,
              message: 'great success'
            }), '*');

            $(frameWin).one('message', function () {
              setTimeout(done, 50);
            });
          });

          it('marks the widget as not busy', function () {
            expect($(widget).hasClass(util.getWidgetClass('busy'))).
              to.be(false);
          });

          it('clears the phone number inputs', function () {
            expect(areaCodeEl.value).to.be('');
            expect(prefixEl.value).to.be('');
            expect(lineNoEl.value).to.be('');
          });

          it('enables the submit button', function () {
            expect(submitButton.disabled).to.be(false);
          });

          it('displays a success message', function () {
            expect($(resultEl).hasClass(util.getWidgetClass('success'))).
              to.be(true);
            expect($(resultEl).text()).to.be('great success');
          });
        });

        describe('on subscription failure', function () {
          beforeEach(function (done) {
            targetFrameWin.postMessage(JSON.stringify({
              type: 'result',
              success: false,
              message: 'OHNOES'
            }), '*');

            $(frameWin).one('message', function () {
              setTimeout(done, 50);
            });
          });

          it('marks the widget as not busy', function () {
            expect($(widget).hasClass(util.getWidgetClass('busy'))).
              to.be(false);
          });

          it('does not clear the phone number inputs', function () {
            expect(areaCodeEl.value).to.be(areaCode);
            expect(prefixEl.value).to.be(prefix);
            expect(lineNoEl.value).to.be(lineNo);
          });

          it('enables the submit button', function () {
            expect(submitButton.disabled).to.be(false);
          });

          it('displays a failure message', function () {
            expect($(resultEl).hasClass(util.getWidgetClass('failure'))).
              to.be(true);
            expect($(resultEl).text()).to.be('OHNOES');
          });
        });
      });
    });
  });
});

