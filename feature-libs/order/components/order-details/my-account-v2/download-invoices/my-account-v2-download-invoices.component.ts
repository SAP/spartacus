/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgIf } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { OrderOutlets } from '@spartacus/order/root';
import { InvoicesListComponent } from '@spartacus/pdf-invoices/components';
import {
  FocusConfig,
  FocusDirective,
  ICON_TYPE,
  IconComponent,
  LaunchDialogService,
  SpinnerComponent,
} from '@spartacus/storefront';

@Component({
  selector: 'cx-my-account-v2-download-invoices',
  templateUrl: './my-account-v2-download-invoices.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FocusDirective,
    IconComponent,
    InvoicesListComponent,
    NgIf,
    SpinnerComponent,
    TranslatePipe,
  ],
})
export class MyAccountV2DownloadInvoicesComponent implements AfterViewChecked {
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

  protected launchDialogService = inject(LaunchDialogService);
  protected cdr = inject(ChangeDetectorRef);

  ngAfterViewChecked() {
    this.cdr.detectChanges();
    if (
      this.invoiceComponent &&
      this.invoiceComponent.pagination !== undefined
    ) {
      this.invoiceCount = this.invoiceComponent.pagination.totalResults;
    }
  }

  close(reason?: any, _message?: string): void {
    this.launchDialogService.closeDialog(reason);
  }
}
