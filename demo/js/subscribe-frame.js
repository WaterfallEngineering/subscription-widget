/**
 * This frame handles two message types:
 *
 * - result: set the result returned on submit
 * - subscribe: asynchronously return the current result (default is success)
 */

var result = {
  type: 'result',
  success: true,
  message: 'Subscribed to list '
};

var handlers = {};

handlers.

window.onmessage = function (e) {
  var message = JSON.parse(e.data);

  if (handlers[message.type]) {
    handlers[message.type](message);
  }
  e.source.postMessage(JSON.stringify({
    data: e.data,
    origin: e.origin
  }, e.origin));
};
