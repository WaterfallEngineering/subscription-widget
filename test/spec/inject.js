define([
  './util',
  './assets/default-content.js'
],
function (util, defaultContent) {
  describe('the snippet', function () {
    var iframe = document.querySelector('iframe');

    before(function (done) {
      iframe.src = 'assets/test-inject.html?css';
      util.waitOnFrame(iframe, done);
    });

    it('should inject the styles exactly once', function () {
      var styles = iframe.contentDocument.
        querySelectorAll(util.getWidgetSelector('styles'));

      expect(styles.length).to.be(1);
    });

    describe('for each .waterfall-subscription-widget', function () {
      var widgets = 
        iframe.contentDocument.querySelectorAll(util.getWidgetSelector(''));

      it('should inject the markup', function () {
        $(widgets).each(function (i, el) {
          expect(el.innerHTML.length).to.be.greaterThan(0);
        });
      });

      it('should populate the injected markup with default content',
        function () {
          var html = iframe.contentDocument.
            querySelector('[data-waterfall-widgetid="abc123"]').innerHTML;
          for (var k in defaultContent) {
            expect(html).to.contain(defaultContent[k]);
          }
        });

      it('should override the default content if a data attr is specified',
        function () {
          var el = iframe.contentDocument.
            querySelector('[data-waterfall-widgetid="456def"]');
          var html = el.innerHTML;
          var attr;

          for (var k in defaultContent) {
            attr =
              'data-waterfall-' + k.replace(/([A-Z])/g, '-$1').toLowerCase();

            if (el.hasAttribute(attr)) {
              expect(html).to.contain(el.getAttribute(attr));
            }
          }
        });
    });
  });
});
