/** @type {IDBDatabase} */
let db;

getDb();

// Handle messages from the main thread
self.onmessage = (event) => {
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
};

///////////////////////////////////

function getDb() {
  const dbRequest = indexedDB.open('AuthTokenDB', 1);

  dbRequest.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains('tokens')) {
      db.createObjectStore('tokens', { keyPath: 'key' });
    }
  };

  dbRequest.onsuccess = (event) => {
    db = event.target.result;
    console.log('Worker: IndexedDB initialized successfully.');
  };

  dbRequest.onerror = (event) => {
    console.error(
      'Worker: Error initializing IndexedDB:',
      event.target.error
    );
  };
}

// Store a token in IndexedDB
function storeToken(key, value) {
  const transaction = db.transaction(['tokens'], 'readwrite');
  const store = transaction.objectStore('tokens');
  store.put({ key, value });

  transaction.oncomplete = () => {
    self.postMessage({ status: 'success', action: 'storeToken' });
  };

  transaction.onerror = (event) => {
    self.postMessage({
      status: 'error',
      action: 'storeToken',
      error: event.target.error,
    });
  };
}

// Retrieve a token from IndexedDB
function getToken(key) {
  const transaction = db.transaction(['tokens'], 'readonly');
  const store = transaction.objectStore('tokens');
  const request = store.get(key);

  request.onsuccess = () => {
    self.postMessage({
      status: 'success',
      action: 'getToken',
      value: request.result?.value,
    });
  };

  request.onerror = (event) => {
    self.postMessage({
      status: 'error',
      action: 'getToken',
      error: event.target.error,
    });
  };
}

// Delete a token from IndexedDB
function deleteToken(key) {
  const transaction = db.transaction(['tokens'], 'readwrite');
  const store = transaction.objectStore('tokens');
  const request = store.delete(key);

  request.onsuccess = () => {
    self.postMessage({ status: 'success', action: 'deleteToken' });
  };

  request.onerror = (event) => {
    self.postMessage({
      status: 'error',
      action: 'deleteToken',
      error: event.target.error,
    });
  };
}
