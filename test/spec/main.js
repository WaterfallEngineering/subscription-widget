require.config({
  paths: {
    'text': '/src/js/text',
    'assets': '../assets'
  }
});

define([
  './inject',
  './validate',
  './submit'
],
function () {
  mocha.run();
});
