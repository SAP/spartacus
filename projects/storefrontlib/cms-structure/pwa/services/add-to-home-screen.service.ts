/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  WindowRef,
} from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PWAModuleConfig } from '../pwa.module-config';

@Injectable({
  providedIn: 'root',
})
export class AddToHomeScreenService {
  protected config = inject(PWAModuleConfig);
  protected globalMessageService = inject(GlobalMessageService);
  protected winRef = inject(WindowRef);

  protected deferredEvent: any;

  protected canPrompt = new BehaviorSubject<boolean>(false);

  canPrompt$: Observable<boolean> = this.canPrompt.asObservable();

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    if (this.config.pwa?.addToHomeScreen) {
      this.init();
    }
  }

  init() {
    if (this.winRef.nativeWindow) {
      this.winRef.nativeWindow.addEventListener(
        'beforeinstallprompt',
        (event) => {
          event.preventDefault();
          this.deferredEvent = event;
          this.enableAddToHomeScreen();
        }
      );

      this.winRef.nativeWindow.addEventListener('appinstalled', () => {
        this.globalMessageService.add(
          { key: 'pwa.addedToHomeScreen' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );

        this.disableAddToHomeScreen();
        this.deferredEvent = null;
      });
    }
  }

  enableAddToHomeScreen(): void {
    this.canPrompt.next(true);
  }

  disableAddToHomeScreen(): void {
    this.canPrompt.next(false);
  }

  firePrompt(): void {
    if (this.deferredEvent) {
      this.deferredEvent.prompt();
    }
  }
}
