$(function () {
  var succeedsEl = $('.success');

  function onSandboxMessage(e) {
    var message;

    try {
      message = JSON.parse(e.originalEvent.data);
      if (message.type === 'ready') {
        $(iframe.contentWindow).off('message', onSandboxMessage);
        injectSinon();
      }
    } catch (e) {
      return;
    }
  }

  function injectSinon() {
    var subscriptionFrame = iframe.contentDocument.
      querySelector('.waterfall-subscription-widget iframe');
    var frameDoc = subscriptionFrame.contentDocument;
    var server;

    function waitForSinon() {
      var frameWin = subscriptionFrame.contentWindow;

      if (!frameWin.sinon || !frameWin.sinon) {
        setTimeout(waitForSinon, 0);
        return;
      }

      var sinonIE = frameDoc.createElement('script');
      sinonIE.src = '../test/sinon-ie.js';
      frameDoc.body.appendChild(sinonIE);

      setTimeout(function () {
        server = subscriptionFrame.contentWindow.sinon.fakeServer.create();
        server.respondWith('POST', /\/api\/v2\/widget\/*/, function (req) {
          console.log('Received subscription req:', req.method, req.url);
          req.respond(succeedsEl.is(':checked') ? 204 : 404, {}, '');
        });
        server.autoRespond = true;
        console.log('DID IT BRO');
      }, 100);
    }

    var sinon = frameDoc.createElement('script');
    sinon.src = '../test/sinon.js';
    frameDoc.body.appendChild(sinon);

    setTimeout(waitForSinon, 0);
  }

  var iframe = $('.sandbox')[0];
  $(iframe.contentWindow).on('message', onSandboxMessage);
});

