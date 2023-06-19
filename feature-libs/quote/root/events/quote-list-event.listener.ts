/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import {
  EventService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { QuoteListReloadQueryEvent } from './quote-list.events';

@Injectable({
  providedIn: 'root',
})
export class QuoteListEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(
    protected eventService: EventService,
    protected globalMessageService: GlobalMessageService
  ) {
    this.onQuoteListReload();
  }

  protected onQuoteListReload(): void {
    this.subscriptions.add(
      this.eventService.get(QuoteListReloadQueryEvent).subscribe(() => {
        this.globalMessageService.add(
          { key: 'sorting.pageViewUpdated' },
          GlobalMessageType.MSG_TYPE_ASSISTIVE,
          500
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
