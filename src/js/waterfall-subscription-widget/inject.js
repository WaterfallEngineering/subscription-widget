/*global define, require */
define([
  'waterfall-subscription-widget/dom',
  'text!templates/subscription-widget.template.html',
  'text!css/subscription-widget.css'
],
function (dom, template, styles) {
  /*global window, document */
  'use strict';
  var id = 0;

  function inject() {
    // inject styles
    var styleEl = document.createElement('style');
    styleEl.className = 'waterfall-subscription-widget-styles';
    styleEl.innerHTML = styles;
    document.querySelector('head').appendChild(styleEl);

    // inject markup
    var widgetEls = document.querySelectorAll('.waterfall-subscription-widget');
    var i;

    var widget;
    for (i = 0; i < widgetEls.length; i++) {
      widget = widgetEls[i];
      widget.id = 'waterfall-subscription-widget-' + id;

      widget.innerHTML = template;
      dom.qs(widget, 'iframe').src += '#' + widget.id;
      id++;
    }
  }

  return inject;
});
