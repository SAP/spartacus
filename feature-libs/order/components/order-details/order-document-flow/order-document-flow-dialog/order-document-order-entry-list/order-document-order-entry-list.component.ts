/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SapOrderSubsequentDocumentEntry } from '@spartacus/order/root';

@Component({
  selector: 'cx-order-document-order-entry-list',
  templateUrl: './order-document-order-entry-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OrderDocumentOrderEntryListComponent {
  @Input() entries?: SapOrderSubsequentDocumentEntry[];
}
