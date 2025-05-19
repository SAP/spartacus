import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthStorageDbWorkerService {
  protected worker: Worker;

  protected initializer: Promise<void>;
  protected resolveInitialized: () => void;

  public key = 'authToken';

  initWorker() {
    if (this.initializer) {
      return this.initializer;
    }

    // Initialize the Web Worker
    this.worker = new Worker('assets/auth-web-worker-db.js');

    this.initializer = new Promise((r) => {
      this.resolveInitialized = r;
    });

    this.worker.onmessage = this.handleMessage.bind(this);
  }

  token$ = new ReplaySubject<string | null>();

  constructor() {
    this.initWorker();
  }

  // Handle responses from the Web Worker
  handleMessage(event: MessageEvent) {
    console.log('message from worker', event.data);
    const { status, action, value, error } = event.data;

    if (status === 'success') {
      switch (action) {
        case 'storeToken':
          console.log('Token stored successfully.');
          break;
        case 'deleteToken':
          console.log('Token deleted successfully.');
          this.token$.next(null);
          break;
        case 'getToken':
          this.token$.next(value);
          break;
        case 'init':
          this.resolveInitialized();
          break;
        default:
          console.error('Unknown action:', action);
      }
    } else {
      console.error('error', error);
    }
  }

  storeToken(value: string) {
    console.log('storeToken', value);
    this.worker.postMessage({ action: 'storeToken', key: this.key, value });
  }

  retrieveToken() {
    console.log('retrieveToken');
    this.worker.postMessage({ action: 'getToken', key: this.key });

    return this.token$.asObservable();
  }

  deleteToken() {
    console.log('deleteToken');

    this.worker.postMessage({ action: 'deleteToken', key: this.key });
  }
}
