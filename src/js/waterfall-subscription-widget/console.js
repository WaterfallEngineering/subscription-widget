define([
],
function () {
  var nop = function () {};
  var console = {};
  var fnsToWrap = ['debug', 'log', 'error'];

  function wrap(consoleFn) {
    return function () {
      var msg = Array.prototype.join.call(arguments, '');
      return window.console[consoleFn]('waterfall-subscription-widget: ' + msg);
    };
  }

  for (var i = 0, fn; i < fnsToWrap.length; i++) {
    fn = fnsToWrap[i];
    console[fn] = !!window.console ? wrap(fn) : nop;
  }

  return console;
});
