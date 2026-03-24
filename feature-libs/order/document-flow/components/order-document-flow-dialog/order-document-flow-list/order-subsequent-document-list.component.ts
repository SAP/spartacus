/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { OrderSubsequentDocument } from '@spartacus/order/document-flow/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { OrderSubsequentDocumentNodeComponent } from './order-subsequent-document-node.component';

@Component({
  selector: 'cx-order-subsequent-document-list',
  templateUrl: './order-subsequent-document-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, OrderSubsequentDocumentNodeComponent, TranslatePipe],
})
export class OrderSubsequentDocumentListComponent {
  iconTypes = ICON_TYPE;

  @Input() documents: OrderSubsequentDocument[];
  @Input() selectedDocument?: OrderSubsequentDocument;
  @Output() documentSelected = new EventEmitter<OrderSubsequentDocument>();

  onDocumentSelection(document: OrderSubsequentDocument): void {
    this.documentSelected.emit(document);
  }
}
