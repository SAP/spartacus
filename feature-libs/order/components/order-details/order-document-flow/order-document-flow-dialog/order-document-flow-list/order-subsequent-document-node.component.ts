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
import { SapOrderSubsequentDocument } from '@spartacus/order/root';
import { ICON_TYPE } from '@spartacus/storefront';

@Component({
  selector: 'cx-order-subsequent-document-node',
  templateUrl: './order-subsequent-document-node.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OrderSubsequentDocumentNode {
  iconTypes = ICON_TYPE;

  @Input() documents: SapOrderSubsequentDocument[];
  @Input() selectedDocument?: SapOrderSubsequentDocument;
  @Input() depth: number = 0;
  @Output() documentSelected = new EventEmitter<SapOrderSubsequentDocument>();

  haveSubNodes(document: SapOrderSubsequentDocument): boolean {
    return (
      !!document.sapSubsequentDocuments &&
      document.sapSubsequentDocuments.length > 0
    );
  }

  onDocumentSelection(document: SapOrderSubsequentDocument): void {
    this.documentSelected.emit(document);
  }
}
