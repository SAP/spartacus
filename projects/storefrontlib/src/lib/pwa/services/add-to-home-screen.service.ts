import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { PWAModuleConfig } from '../pwa.module-config';
import { Store } from '@ngrx/store';
import * as fromGlobalMessage from '../../global-message/store';
import { GlobalMessageType } from './../../global-message/models/message.model';

@Injectable()
export class AddToHomeScreenService {
  isEnabled = false;
  deferredEvent: any;

  private prompts = new Subject();
  private canPrompt = new BehaviorSubject<boolean>(false);

  prompts$ = this.prompts.asObservable();
  canPrompt$ = this.canPrompt.asObservable();

  constructor(
    private config: PWAModuleConfig,
    private store: Store<fromGlobalMessage.GlobalMessageState>
  ) {
    this.prompts$.subscribe(() => {
      this.prompt();
    });
    this.isEnabled = this.config.pwa.addToHomeScreen;
  }

  init() {
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      this.deferredEvent = event;
      if (this.isEnabled) {
        this.enableAddToHomeScreen();
      }
    });

    window.addEventListener('appinstalled', () => {
      this.store.dispatch(
        new fromGlobalMessage.AddMessage({
          type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
          text: 'SAP Storefront was added to your home screen'
        })
      );
      this.disableAddToHomeScreen();
    });
  }

  prompt(): void {
    this.deferredEvent.prompt();
  }

  enableAddToHomeScreen() {
    this.canPrompt.next(true);
  }

  disableAddToHomeScreen() {
    this.canPrompt.next(false);
  }

  firePrompt() {
    this.prompts.next();
  }
}
