/*jshint undef:false */
(function (window) {
  var document = window.document;
  var script = document.createElement('script');
  var sibling = document.getElementsByTagName('script')[0];
  script.src = '/./test/assets/waterfall-subscription-widget.1.0.0.js';
  script.async = true;
  script.type = 'text/javascript';
  sibling.parentNode.insertBefore(script, sibling);
}(this));
