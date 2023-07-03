/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CdcLoadUserTokenFailEvent } from '@spartacus/cdc/root';
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
    this.registerLoadUserTokenFail();
  }

  /**
   * Register the load user token fail event.
   */
  protected registerLoadUserTokenFail(): void {
    this.stateEventService.register({
      action: CdcAuthActions.LOAD_CDC_USER_TOKEN_FAIL,
      event: CdcLoadUserTokenFailEvent,
    });
  }
}
