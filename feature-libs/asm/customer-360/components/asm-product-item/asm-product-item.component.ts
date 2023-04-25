/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
import { Product } from '@spartacus/core';
import { ProductItem } from '../asm-customer-product-listing/product-item.model';

@Component({
  selector: 'cx-asm-product-item',
  templateUrl: './asm-product-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsmProductItemComponent {
  @Input() product: Product | ProductItem;
  @Input() quantity: number;
  @Input() isOrderEntry = true;
  @Output() selectProduct = new EventEmitter<Product>();
}
