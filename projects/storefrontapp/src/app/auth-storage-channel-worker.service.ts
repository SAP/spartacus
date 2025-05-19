import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

// type Status = 'success' | 'error';
interface StoreMessage {
  action: 'storeToken';
  key: string;
  value?: string;
}
interface DeleteMessage {
  action: 'deleteToken';
  key: string;
}
interface GetMessage {
  action: 'getToken';
  key: string;
}
interface InitMessage {
  action: 'init';
  port: MessagePort;
}
type ChannelMessage = StoreMessage | DeleteMessage | GetMessage | InitMessage;

@Injectable({ providedIn: 'root' })
export class AuthStorageChannelWorkerService {
  protected worker: Worker;

  protected initializer: Promise<void>;
  protected resolveInitialized: () => void;

  public key = 'authToken';

  messageChannel = new MessageChannel();

  initWorker() {
    if (this.initializer) {
      return this.initializer;
    }

    this.messageChannel.port1.onmessage = this.handleMessage.bind(this);

    window.onmessage = (event) => {
      console.log('event', event);
    };

    // Initialize the Web Worker
    this.worker = new Worker('assets/auth-web-worker-channel.js');
    this.worker.postMessage(
      <InitMessage>{ action: 'init', port: this.messageChannel.port2 },
      [this.messageChannel.port2]
    );

    this.initializer = new Promise((r) => {
      this.resolveInitialized = r;
    });
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
    this.send(<StoreMessage>{
      action: 'storeToken',
      key: this.key,
      value,
    });
  }

  retrieveToken() {
    console.log('retrieveToken');
    this.send(<GetMessage>{
      action: 'getToken',
      key: this.key,
    });
    console.log('sent getTokenRequest');

    return this.token$.asObservable();
  }

  deleteToken() {
    console.log('deleteToken');

    this.send(<DeleteMessage>{
      action: 'deleteToken',
      key: this.key,
    });
  }

  send(message: ChannelMessage) {
    this.messageChannel.port1.postMessage(message);
  }
}
