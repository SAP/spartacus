/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy, inject } from '@angular/core';
import {
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  LogoutEvent,
} from '@spartacus/core';
import { Subscription } from 'rxjs';

/**
 * User account event listener.
 */
@Injectable({
  providedIn: 'root',
})
export class UserAccountEventListener implements OnDestroy {
  protected eventService = inject(EventService);
  protected globalMessageService = inject(GlobalMessageService);

  protected subscriptions = new Subscription();

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.onAuth();
  }

  /**
   * Registers events for the auth events.
   */
  protected onAuth(): void {
    this.subscriptions.add(
      this.eventService.get(LogoutEvent).subscribe(() => {
        this.globalMessageService.add(
          { key: 'authMessages.signedOutSuccessfully' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
