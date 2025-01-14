/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
  TranslationService,
} from '@spartacus/core';
import {
  ProductMultiDimensionalSelectorService,
  VariantCategoryGroup,
  VariantCategoryOption,
} from '@spartacus/product-multi-dimensional/selector/core';
import { ActivatedRoute } from '@angular/router';
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  take,
  tap,
} from 'rxjs/operators';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable } from 'rxjs';

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
  protected translationService: TranslationService = inject(TranslationService);

  selectedProductCode: string;

  categories: VariantCategoryGroup[] = [];

  product$: Observable<Product> = this.currentProductService
    .getProduct(ProductScope.MULTI_DIMENSIONAL)
    .pipe(
      filter(isNotNullable),
      filter((product) => !!product.multidimensional),
      distinctUntilChanged(),
      shareReplay(1),
      tap((product) => {
        this.categories = this.getVariants(product);
        this.selectedProductCode = product.code ?? '';
      })
    );

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

  getSelectedValue(categoryName: string): string {
    const category = this.categories.find((cat) => cat.name === categoryName);

    if (category && this.selectedProductCode) {
      const selectedOption = category.variantOptions.find(
        (option: VariantCategoryOption) =>
          option.code === this.selectedProductCode
      );

      return selectedOption ? selectedOption.value : '';
    }

    return '';
  }

  onAriaLabel(
    option: VariantCategoryOption,
    categoryName: string
  ): Observable<string> {
    const isSelected = this.isSelected(option.code);

    if (isSelected) {
      return this.translationService
        .translate('multiDimensionalSelector.selectedVariant')
        .pipe(map((text) => `${text}, ${option.value} ${categoryName}`));
    }

    return this.translationService
      .translate('multiDimensionalSelector.variantThumbnailTitle', {
        value: option.value,
        category: categoryName,
      })
      .pipe(map((text) => `${text}`));
  }

  getCategoryName(category: VariantCategoryGroup): string {
    const label = `${category.name}: `;

    if (category.hasImages) {
      const selectedValue = this.getSelectedValue(category.name);
      return `${label}${selectedValue ?? ''}`;
    }

    return label;
  }

  protected isSelected(code: string): boolean {
    return code === this.selectedProductCode;
  }

  protected getVariants(product: Product) {
    return this.multiDimensionalService.getVariants(product);
  }
}
