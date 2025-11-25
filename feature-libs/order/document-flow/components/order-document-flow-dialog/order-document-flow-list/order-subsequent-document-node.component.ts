/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';
import { OrderSubsequentDocument } from '@spartacus/order/document-flow/root';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { TranslatePipe, CxDatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-order-subsequent-document-node',
  templateUrl: './order-subsequent-document-node.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, NgClass, NgIf, IconComponent, TranslatePipe, CxDatePipe],
})
export class OrderSubsequentDocumentNodeComponent {
  iconTypes = ICON_TYPE;

  @Input() documents: OrderSubsequentDocument[];
  @Input() selectedDocument?: OrderSubsequentDocument;
  @Input() depth: number = 0;
  @Output() documentSelected = new EventEmitter<OrderSubsequentDocument>();

  haveSubNodes(document: OrderSubsequentDocument): boolean {
    return (
      !!document.sapSubsequentDocuments &&
      document.sapSubsequentDocuments.length > 0
    );
  }

  onDocumentSelection(document: OrderSubsequentDocument): void {
    this.documentSelected.emit(document);
  }
}
