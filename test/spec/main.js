require.config({
  paths: {
    'text': '/src/js/text',
    'assets': '../assets'
  }
});

define([
  './inject',
  './validate',
  './submit',
  './subscribe-frame'
],
function () {
  mocha.run();
});
