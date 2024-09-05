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
import { Product, I18nModule } from '@spartacus/core';
import { ProductItem } from '../asm-customer-360-product-listing/product-item.model';
import { NgIf } from '@angular/common';
import { MediaModule } from '@spartacus/storefront';

@Component({
    selector: 'cx-asm-customer-360-product-item',
    templateUrl: './asm-customer-360-product-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MediaModule,
        NgIf,
        I18nModule,
    ],
})
export class AsmCustomer360ProductItemComponent {
  @Input() product: ProductItem;
  @Input() quantity: number;
  @Input() isOrderEntry = true;
  @Output() selectProduct = new EventEmitter<Product>();
}
