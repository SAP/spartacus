/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  output,
  input,
} from '@angular/core';
import { CxDatePipe, TranslatePipe } from '@spartacus/core';
import { OrderSubsequentDocument } from '@spartacus/order/document-flow/root';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';

@Component({
  selector: 'cx-order-subsequent-document-node',
  templateUrl: './order-subsequent-document-node.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, TranslatePipe, CxDatePipe],
})
export class OrderSubsequentDocumentNodeComponent {
  iconTypes = ICON_TYPE;

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input() documents: OrderSubsequentDocument[];
  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input() selectedDocument?: OrderSubsequentDocument;
  readonly depth = input<number>(0);
  readonly documentSelected = output<OrderSubsequentDocument>();

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
