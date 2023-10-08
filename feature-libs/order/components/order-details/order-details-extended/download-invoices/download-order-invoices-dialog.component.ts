/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
  AfterViewChecked,
  inject,
} from '@angular/core';
import { Order, OrderOutlets } from '@spartacus/order/root';
import { InvoicesListComponent } from '@spartacus/pdf-invoices/components';
import { PDFInvoicesFacade } from '@spartacus/pdf-invoices/root';
import {
  ICON_TYPE,
  FocusConfig,
  LaunchDialogService,
} from '@spartacus/storefront';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-download-order-invoices-dialog',
  templateUrl: './download-order-invoices-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadOrderInvoicesDialogComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  protected subscription = new Subscription();
  @ViewChild(InvoicesListComponent, { static: false })
  public invoiceComponent: InvoicesListComponent;
  readonly OrderOutlets = OrderOutlets;
  invoiceCount: number | undefined = undefined;
  iconTypes = ICON_TYPE;
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: true,
    focusOnEscape: true,
  };
  order: Order;
  protected launchDialogService = inject(LaunchDialogService);
  protected invoicesFacade = inject(PDFInvoicesFacade);
  protected cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.subscription.add(
      this.launchDialogService.data$.subscribe((data: Order) => {
        this.order = data;
      })
    );
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
    if (this.invoiceComponent.pagination !== undefined) {
      this.invoiceCount = this.invoiceComponent.pagination.totalResults;
    }
  }

  close(reason?: any, _message?: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
