/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { DownloadOrderInvoicesEvent } from '@spartacus/order/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MyAccountV2DownloadInvoicesEventListener implements OnDestroy {
  protected subscription = new Subscription();
  protected eventService = inject(EventService);
  protected launchDialogService = inject(LaunchDialogService);
  constructor() {
    this.onDownloadInvoices();
  }
  protected onDownloadInvoices() {
    this.subscription.add(
      this.eventService.get(DownloadOrderInvoicesEvent).subscribe((event) => {
        this.openDialog(event);
      })
    );
  }
  protected openDialog(event: DownloadOrderInvoicesEvent) {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.DOWNLOAD_ORDER_INVOICES,
      undefined,
      undefined,
      event.order
    );
    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
