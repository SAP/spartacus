/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Product } from '@spartacus/core';
import { BundleProductListOutlets } from '../../bundle-outlets.model';

@Component({
  selector: 'cx-bundle-product-grid-item',
  templateUrl: './bundle-product-grid-item.component.html',
})
export class BundleProductGridItemComponent {
  readonly BundleProductListOutlets = BundleProductListOutlets;
  @Input() product: Product;
  @Output() checkDetails = new EventEmitter<Product>();

  onCheckDetails(): void {
    this.checkDetails.emit(this.product);
  }
}
