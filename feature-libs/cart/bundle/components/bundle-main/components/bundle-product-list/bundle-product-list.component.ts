/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
import {
    ProductBtnActionTypes,
    ProductSelectionState,
} from '@spartacus/cart/bundle/core';
import { Product } from '@spartacus/core';

@Component({
  selector: 'cx-bundle-product-list',
  templateUrl: './bundle-product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BundleProductListComponent {
  @Input() products: Product[];
  @Input() selectedProducts: Product[];
  @Input() productAction: ProductBtnActionTypes;

  @Output() readonly toggleProduct = new EventEmitter<ProductSelectionState>();
  @Output() readonly edit = new EventEmitter<string>();

  toggleSelection(selectionState: ProductSelectionState): void {
    console.log('toggleSel');
    this.toggleProduct.next(selectionState);
  }

  onEditProduct(productCode: string): void {
    this.edit.next(productCode);
  }
}
