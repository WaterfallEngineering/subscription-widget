define([
  '../config'
],
function (config) {
  var STYLES_SELECTOR = '.' + config.widgetClassPrefix + '-styles';
  var MIN_TIMEOUT = 10;
  var MAX_TIMEOUT = 3000;

  return {
    getWidgetClass: function getClass(s) {
      var klass = config.widgetClassPrefix;
      return s ? klass + '-' + s : klass;
    },

    getWidgetSelector: function getWidgetSelector(s) {
      return '.' + this.getWidgetClass(s);
    },

    waitOnFrame: function (frame, callback) {
      function onLoad() {
        if (!frame.contentDocument.querySelector(STYLES_SELECTOR)) {
          if (timeout > MAX_TIMEOUT) {
            return callback(new Error('Timed out waiting for styles to load'));
          }

          setTimeout(onLoad, timeout);
          timeout *= 2;
        } else {
          callback();
        }
      }

      var timeout = MIN_TIMEOUT;
      $(frame).one('load', onLoad);
    }
  };
});
