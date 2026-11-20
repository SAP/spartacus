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
import { TranslatePipe } from '@spartacus/core';
import { OrderSubsequentDocument } from '@spartacus/order/document-flow/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { OrderSubsequentDocumentNodeComponent } from './order-subsequent-document-node.component';

@Component({
  selector: 'cx-order-subsequent-document-list',
  templateUrl: './order-subsequent-document-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OrderSubsequentDocumentNodeComponent, TranslatePipe],
})
export class OrderSubsequentDocumentListComponent {
  iconTypes = ICON_TYPE;

  // TODO: Skipped for migration because:
  //  This input is used in a control flow expression (e.g. `@if` or `*ngIf`)
  //  and migrating would break narrowing currently.
  @Input() documents: OrderSubsequentDocument[];
  readonly selectedDocument = input<OrderSubsequentDocument>();
  readonly documentSelected = output<OrderSubsequentDocument>();

  onDocumentSelection(document: OrderSubsequentDocument): void {
    this.documentSelected.emit(document);
  }
}
