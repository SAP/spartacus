/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CxDatePipe, TranslatePipe } from '@spartacus/core';
import { OrderSubsequentDocumentEntry } from '@spartacus/order/document-flow/root';

@Component({
  selector: 'cx-order-document-order-entry-list',
  templateUrl: './order-document-order-entry-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, TranslatePipe, CxDatePipe],
})
export class OrderDocumentOrderEntryListComponent {
  @Input() entries?: OrderSubsequentDocumentEntry[];
}
