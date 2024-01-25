/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  BaseOption,
  isNotUndefined,
  Product,
  ProductScope,
  ProductService,
  RoutingService,
  VariantOptionQualifier,
  VariantQualifier,
} from '@spartacus/core';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'cx-product-variant-size-selector',
  templateUrl: './product-variant-size-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductVariantSizeSelectorComponent {
  constructor(
    private productService: ProductService,
    private routingService: RoutingService
  ) {}

  @Input()
  product: Product;

  @Input()
  variants: BaseOption;

  changeSize(code: string): null {
    if (code) {
      this.productService
        .get(code, ProductScope.LIST)
        .pipe(
          // below call might looks redundant but in fact this data is going to be loaded anyways
          // we're just calling it earlier and storing
          filter(isNotUndefined),
          take(1)
        )
        .subscribe((product: Product) => {
          this.routingService.go({
            cxRoute: 'product',
            params: product,
          });
        });
    }
    return null;
  }
  getVariantOptionValue(qualifiers: VariantOptionQualifier[]) {
    const obj = qualifiers.find((q) => q.qualifier === VariantQualifier.SIZE);
    return obj ? obj.value : '';
  }
}
