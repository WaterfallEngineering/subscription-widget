/*jshint undef:false */
(function (window) {
  var document = window.document;
  var script = document.createElement('script');
  var sibling = document.getElementsByTagName('script')[0];
  script.src = '<%= url.path  + url.file %>';
  script.async = true;
  script.type = 'text/javascript';
  sibling.parentNode.insertBefore(script, sibling);
}(this));
