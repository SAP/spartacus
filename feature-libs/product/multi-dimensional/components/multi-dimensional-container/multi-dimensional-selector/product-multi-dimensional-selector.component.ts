/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  Product,
  ProductScope,
  ProductService,
  RoutingService,
  VariantCategory,
  VariantMatrixElement,
} from '@spartacus/core';
import { ProductMultiDimensionalService } from '../../../core/services/product-multi-dimensional.service';
import { ActivatedRoute } from '@angular/router';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'cx-variants-multi-dimensional-selector',
  templateUrl: './product-multi-dimensional-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductMultiDimensionalSelectorComponent implements OnChanges {
  protected multiDimensionalService: ProductMultiDimensionalService = inject(
    ProductMultiDimensionalService
  );
  protected productService: ProductService = inject(ProductService);
  protected routingService: RoutingService = inject(RoutingService);
  protected route: ActivatedRoute = inject(ActivatedRoute);

  @Input()
  product: Product;

  categories: VariantCategory[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.product) {
      this.categories = this.multiDimensionalService.getVariants(this.product);
    }
  }

  changeVariant(code: string | undefined): void {
    if (code) {
      this.productService
        .get(code, ProductScope.MULTIDIMENSIONAL)
        .pipe(filter(Boolean), take(1))
        .subscribe((product: Product) => {
          this.routingService.go({
            cxRoute: 'product',
            params: product,
          });
        });
    }
  }

  isSelected(category: VariantMatrixElement) {
    return category.variantOption?.code === this.product.code;
  }
}
