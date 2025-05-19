/** @type {MessagePort} */
let port;

/** @type {Record<string, string>} */
const tokenStore = {};

// Handle messages from the main thread
self.onmessage = (event) => {
  if (event.data.action === 'init' && event.data.port) {
    port = event.data.port;
    port.onmessage = handleMessage;
    console.log('Worker: MessageChannel initialized.');
    self.onmessage = () => {};
  }
};

// Handle messages from the main thread
function handleMessage(event) {
  const { action, key, value } = event.data;

  switch (action) {
    case 'storeToken':
      storeToken(key, value);
      break;
    case 'getToken':
      getToken(key);
      break;
    case 'deleteToken':
      deleteToken(key);
      break;
    default:
      console.error('Web Worker: Unknown action:', action);
  }
}

///////////////////////////////////

function storeToken(key, value) {
  tokenStore[key] = value;

  port.postMessage({
    status: 'success',
    action: 'storeToken',
    value: value,
  });
}

function getToken(key) {
  const value = tokenStore[key];

  port.postMessage({
    status: 'success',
    action: 'getToken',
    value: value,
  });
}

function deleteToken(key) {
  delete tokenStore[key];

  port.postMessage({ status: 'success', action: 'deleteToken' });
}
