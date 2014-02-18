/*global define, require */
define([
  'waterfall-subscription-widget/dom',
  'templates/widget',
  'waterfall-subscription-widget/default-content',
  'text!css/subscription-widget.css'
],
function (dom, template, defaultContent, styles) {
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
    var attr;
    var context;

    for (i = 0; i < widgetEls.length; i++) {
      widget = widgetEls[i];
      widget.id = 'waterfall-subscription-widget-' + id;

      // override default content with any data-waterfall attributes
      context = {
        widgetId: widget.id
      };
      for (var k in defaultContent) {
        // convert content property name to an attr name
        attr = 'data-waterfall-' + k.replace(/([A-Z])/g, '-$1').toLowerCase();
        context[k] = widget.hasAttribute(attr) ?
          widget.getAttribute(attr) : defaultContent[k]; 
      }

      widget.innerHTML = template.widget(context);
      id++;
    }
  }

  return inject;
});
