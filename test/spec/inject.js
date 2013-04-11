define([
  './util'
],
function (util) {
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

    it('should inject the markup in each .waterfall-subscription-widget',
      function () {
        var widgets = 
          iframe.contentDocument.querySelectorAll(util.getWidgetSelector(''));

        $(widgets).each(function (i, el) {
          expect(el.innerHTML.length).to.be.greaterThan(0);
          expect(el.hasAttribute('data-waterfall-listid')).to.be(false);
        });
      });
  });
});
