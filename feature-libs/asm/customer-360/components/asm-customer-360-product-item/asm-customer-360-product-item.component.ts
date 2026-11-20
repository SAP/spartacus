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
} from '@angular/core';
import { Product, TranslatePipe } from '@spartacus/core';
import { MediaComponent } from '@spartacus/storefront';
import { ProductItem } from '../asm-customer-360-product-listing/product-item.model';

@Component({
  selector: 'cx-asm-customer-360-product-item',
  templateUrl: './asm-customer-360-product-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MediaComponent, TranslatePipe],
})
export class AsmCustomer360ProductItemComponent {
  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input() product: ProductItem;
  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input() quantity: number;
  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input() isOrderEntry = true;
  readonly selectProduct = output<Product>();
}
