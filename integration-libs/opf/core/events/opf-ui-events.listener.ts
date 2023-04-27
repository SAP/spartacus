/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { OpfUiClearEvent } from 'integration-libs/opf/root/events/opf.events';
import { Subscription } from 'rxjs';
import { OpfService } from '../facade/opf.service';

@Injectable({
  providedIn: 'root',
})
export class OpfUiEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(
    protected eventService: EventService,
    protected opfService: OpfService
  ) {
    this.onOpfUiClear();
  }

  /**
   * Registers events for the cart base actions.
   */
  protected onOpfUiClear(): void {
    this.subscriptions.add(
      this.eventService
        .get(OpfUiClearEvent)
        .subscribe(() => this.opfService.clearOpfUiState())
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
