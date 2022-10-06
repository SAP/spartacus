/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CdcLoginFailEvent } from '@spartacus/cdc/root';
import { EventService, StateEventService } from '@spartacus/core';
import { CdcAuthActions } from '../auth/store/actions/index';

@Injectable({
  providedIn: 'root',
})
export class CdcEventBuilder {
  constructor(
    protected stateEventService: StateEventService,
    protected eventService: EventService
  ) {
    this.register();
  }

  /**
   * Registers CDC events
   */
  protected register(): void {
    this.registerLoginFailEvent();
  }

  /**
   * Register the login fail event
   */
  protected registerLoginFailEvent(): void {
    this.stateEventService.register({
      action: CdcAuthActions.LOAD_CDC_USER_TOKEN_FAIL,
      event: CdcLoginFailEvent,
    });
  }
}
