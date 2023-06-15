/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { OpfUiClearEvent } from '@spartacus/opf/base/root';
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
   * Clear opf UI when requested
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
