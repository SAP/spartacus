/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input, Output,
} from '@angular/core';
import {
  SapOrderSubsequentDocument,
} from '@spartacus/order/root';
import { ICON_TYPE } from '@spartacus/storefront';

@Component({
  selector: 'cx-order-subsequent-document-list',
  templateUrl: './order-subsequent-document-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OrderSubsequentDocumentList {
  iconTypes = ICON_TYPE;

  @Input() documents: SapOrderSubsequentDocument[];
  @Input() selectedDocument?: SapOrderSubsequentDocument;
  @Output() documentSelected = new EventEmitter<SapOrderSubsequentDocument>;

  onDocumentSelection(document: SapOrderSubsequentDocument): void {
    this.documentSelected.emit(document);
  }

}
