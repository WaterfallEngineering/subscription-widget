/*global define, require */
define([
  'waterfall-subscription-widget/console',
  'waterfall-subscription-widget/dom',
  'waterfall-subscription-widget/inject'
],
function (console, dom, inject) {
  /*global window, document */
  'use strict';

  var PREFIX = 'waterfall-subscription-widget';
  var ATTR_ROOT = 'data-waterfall-';
  var WIDGETID_ATTR = ATTR_ROOT + 'widgetid';
  var READY_ATTR = ATTR_ROOT + 'ready';
  var PENDING_NUMBER_ATTR = ATTR_ROOT + 'pending-mobile-number';

  function getClassName(name) {
    return !!name ? PREFIX + '-' + name : name;
  }

  function getSelector(selector) {
    return '.' + PREFIX + selector;
  }

  var invalidClass = getClassName('invalid');
  var successClass = getClassName('success');
  var failureClass = getClassName('failure');

  var widgetSelector = getSelector('');
  var submitSelector = getSelector('-submit-btn');
  var resultSelector = getSelector('-result');
  var inputsSelector = getSelector(' input');

  /*
   * Test the value of an input against its `pattern` attribute
   *
   * Return true if the value matches the pattern and false otherwise
   */
  var regexes = {};
  function isValid(el) {
    var pattern = el.getAttribute('pattern');
    if (!regexes[pattern]) {
      regexes[pattern] = new RegExp(pattern);
    }

    return regexes[pattern].test(el.value); 
  }

  /*
   * Validate an input and apply an invalid CSS class if appropriate
   */
  function validate(el) {
    if (!dom.matches(el, inputsSelector)) {
      return;
    }

    var valid = isValid(el);
    if (!valid) {
      dom.addClass(el, invalidClass);
    } else {
      dom.removeClass(el, invalidClass);
    }

    return valid;
  }

  /*
   * Validate all inputs in the widget, apply an invalid CSS class if
   * appropriate and focus the first invalid input
   */
  function validateWidget(widget) {
    var inputs = dom.qsa(widget, inputsSelector);
    var firstInvalid = null;
    
    for (var i = 0; i < inputs.length; i++) {
      if (!validate(inputs[i]) && firstInvalid === null) {
        firstInvalid = i;
      }
    }

    if (firstInvalid !== null) {
      inputs[firstInvalid].focus();
      dom.addClass(widget, invalidClass);
    } else {
      dom.removeClass(widget, invalidClass);
    }

    return firstInvalid === null;
  }

  function getMobileNumber(widget) {
    var areaCode = dom.qs(widget, getSelector('-area-code')); 
    var prefix = dom.qs(widget, getSelector('-prefix')); 
    var lineNo = dom.qs(widget, getSelector('-line-no')); 

    return areaCode.value + prefix.value + lineNo.value;
  }

  /*
   * Post a subscription to the hidden subscribe iframe
   */
  function subscribe(widget) {
    var mobileNumber =
      widget.getAttribute(PENDING_NUMBER_ATTR);
    var widgetId = widget.getAttribute(WIDGETID_ATTR);
    var frame = dom.qs(widget, 'iframe');

    frame.contentWindow.postMessage(JSON.stringify({
      type: 'subscribe',
      widgetId: widgetId,
      mobileNumber: mobileNumber
    }), frame.src);

    widget.removeAttribute(PENDING_NUMBER_ATTR);
  }

  /*
   * Handle a message from the hidden subscribe iframe and dispatch to the
   * appropriate handler if one exists
   */
  var messageHandlers = {};
  function onMessage(e) {
    var widget;
    var message;

    try {
      message = JSON.parse(e.data);

      if (!message.id) {
        console.error('Message with no id specified: ' + e.data);
        return;
      }

      widget = dom.qs('#' + message.id);

      if (messageHandlers[message.type]) {
        messageHandlers[message.type](message, widget);
      } else {
        console.
          error('Unexpected message type "' + message.type + '": ' + e.data);
      }
    } catch (error) {
      console.
        error('Failed to handle message "' + e.data + '": ' + error.message);
    }
  }

  /* 
   * Handle the `ready` message from the subscribe iframe
   *
   * Mark the widget as ready and post any pending subscription
   */
  messageHandlers.ready = function onFrameReady(message, widget) {
    widget.setAttribute(READY_ATTR, true);

    if (widget.hasAttribute(PENDING_NUMBER_ATTR)) {
      subscribe(widget);
    }
  };

  /* 
   * Handle the `result` message from the subscribe iframe
   *
   * Display the result and reset the widget state as appropriate
   */
  messageHandlers.result = function onSubscribeResult(message, widget) {
    var resultEl = dom.qs(widget, resultSelector);
    var inputs, i;

    dom.removeClass(widget, getClassName('busy'));
    dom.qs(widget, submitSelector).removeAttribute('disabled');

    resultEl.innerHTML = message.message;
    if (message.success) {
      // clear the inputs on success
      inputs = dom.qsa(widget, inputsSelector);
      for (i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
      }

      dom.addClass(resultEl, successClass);
    } else {
      dom.addClass(resultEl, failureClass);
    }
  };

  /*
   * Handle a click on the submit button
   */
  function onSubmit(e) {
    var widget = dom.closest(e.target, widgetSelector);
    var button = dom.qs(widget, submitSelector);
    var resultEl = dom.qs(widget, resultSelector);

    dom.removeClass(resultEl, successClass);
    dom.removeClass(resultEl, failureClass);

    if (validateWidget(widget)) {
      // valid subscription

      // disable the submit button and mark the widget as busy
      button.setAttribute('disabled', true);
      dom.addClass(widget, getClassName('busy'));

      // store the number to subscribe to and subscribe if we're ready
      widget.setAttribute(PENDING_NUMBER_ATTR, getMobileNumber(widget));
      if (widget.getAttribute(READY_ATTR) === 'true') {
        subscribe(widget);
      }
    }
  }

  /*
   * Validate each input on blur or change
   */
  function onChanged(e) {
    validate(e.target);
  }

  function onLoad() {
    var widgets;

    inject();

    widgets = dom.qsa(widgetSelector);

    for (var i = 0; i < widgets.length; i++) {
      dom.hook(widgets[i], 'blur', onChanged, true);
      dom.hook(widgets[i], 'change', onChanged, true);

      dom.hook(dom.qs(widgets[i], submitSelector), 'click', onSubmit);
      dom.hook(window , 'message', onMessage);
    }
  }

  if (!document) {
    console.error('no `document` in scope');
    return;
  }

  var widgetId = null;

  // To obtain the id of the subscription widget,
  // 1) find first script with `data-waterfall-widgetid` attr (i.e. the script
  //    that injected the scout file that injected this script)
  var scriptEl = dom.qs('script[' + WIDGETID_ATTR + ']');

  // 2) if none is found, crash
  if (!scriptEl) {
    console.error(PREFIX + ': could not find a script with a' +
      '`data-waterfall-widgetid` attribute');
    return;
  }

  // 3) get the id value and remove the attribute so other scripts don't use it
  widgetId = scriptEl.getAttribute(WIDGETID_ATTR);
  scriptEl.removeAttribute(WIDGETID_ATTR);

  if (document.readyState !== 'complete') {
    // wait for load, which is fine for our purposes
    // and easier to deal with cross-browser
    dom.hook(window, 'load', onLoad);
  } else {
    onLoad();
  }
});

require('waterfall-subscription-widget');

