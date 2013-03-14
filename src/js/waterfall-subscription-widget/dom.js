define([
  'waterfall-subscription-widget/console'
],
function (console) {
  /*global window, document */

  function qs(el, selector) {
    if (typeof el === 'string') {
      selector = el;
      el = document;
    }

    return el.querySelector(selector);
  }

  function qsa(el, selector) {
    if (typeof el === 'string') {
      selector = el;
      el = document;
    }

    return el.querySelectorAll(selector);
  }

  function matches(el, selector) {
    var candidates = el.parentElement.querySelectorAll(selector);

    var i = 0;
    do {
      if (candidates[i] === el) {
        return true;
      }
      i++;
    } while (i < candidates.length);

    return false;
  }

  function closest(el, selector) {
    var parent = el.parentElement;

    if (!parent) {
      return null;
    }

    return matches(parent, selector) ? parent : closest(parent, selector);
  }

  function hook(el, event, handler, capture) {
    if (!el) {
      console.error('cannot hook non-existent element');
      return false;
    } else if (el.addEventListener) {
      return el.addEventListener(event, handler, capture);
    } else if (el.attachEvent) {
      return el.attachEvent(event, handler);
    } else {
      console.error('el', el, 'cannot listen to events');
      return false;
    }
  }

  function hasClass(el, className) {
    var classes = el.className.split(' ');

    for (var i = 0; i < classes.length; i++) {
      if (classes[i] === className) {
        return true;
      }
    }
    return false;
  }

  function addClass(el, className) {
    var classes = el.className.split(' ');

    if (!hasClass(el, className)) {
      classes.push(className);
      el.className = classes.join(' ');
    }
  }

  function removeClass(el, className) {
    var classes = el.className.split(' ');
    var newClasses = [];

    for (var i = 0; i < classes.length; i++) {
      if (classes[i] !== className) {
        newClasses.push(classes[i]);
      }
    }

    el.className = newClasses.join(' ');
  }

  return {
    qs: qs,
    qsa: qsa,
    matches: matches,
    closest: closest,
    hook: hook,
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass
  };
});
