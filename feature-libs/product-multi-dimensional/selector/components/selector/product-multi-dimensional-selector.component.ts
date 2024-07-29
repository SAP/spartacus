/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  isNotNullable,
  Product,
  ProductScope,
  ProductService,
  RoutingService,
} from '@spartacus/core';
import { ProductMultiDimensionalSelectorService } from '@spartacus/product-multi-dimensional/selector/core';
import { ActivatedRoute } from '@angular/router';
import {
  distinctUntilChanged,
  filter,
  shareReplay,
  take,
  tap,
} from 'rxjs/operators';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { VariantCategoryGroup } from '../../root/model/augmented-core.model';

@Component({
  selector: 'cx-product-multi-dimensional-selector',
  templateUrl: './product-multi-dimensional-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductMultiDimensionalSelectorComponent {
  protected multiDimensionalService: ProductMultiDimensionalSelectorService =
    inject(ProductMultiDimensionalSelectorService);
  protected productService: ProductService = inject(ProductService);
  protected routingService: RoutingService = inject(RoutingService);
  protected route: ActivatedRoute = inject(ActivatedRoute);
  protected currentProductService: CurrentProductService = inject(
    CurrentProductService
  );

  product$: Observable<Product> = this.currentProductService.getProduct().pipe(
    filter(isNotNullable),
    distinctUntilChanged(),
    shareReplay(1),
    tap((product) => {
      this.categories = this.getVariants(product);
    })
  );
  categories: VariantCategoryGroup[] = [];

  changeVariant(code: string | undefined): void {
    if (code) {
      this.productService
        .get(code, ProductScope.LIST)
        .pipe(filter(Boolean), take(1))
        .subscribe((product: Product) => {
          this.routingService.go({
            cxRoute: 'product',
            params: product,
          });
        });
    }
  }

  isSelected(code: string, product: Product) {
    return code === product.code;
  }

  protected getVariants(product: Product) {
    return this.multiDimensionalService.getVariants(product);
  }
}
