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
import { ActivatedRoute } from '@angular/router';
import {
  Product,
  ProductScope,
  ProductService,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import {
  VariantCategoryGroup,
  VariantCategoryOption,
} from '@spartacus/product/multi-dimensional/root';
import { filter, map, take } from 'rxjs/operators';
import { ProductMultiDimensionalService } from '../../../core/services/product-multi-dimensional.service';
import { Observable } from 'rxjs/internal/Observable';

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
  protected translationService: TranslationService = inject(TranslationService);

  @Input()
  product: Product;

  selectedVariant: string;
  categories: VariantCategoryGroup[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.product) {
      this.categories = this.multiDimensionalService.getVariants(this.product);
      this.selectedVariant = this.product.code ?? '';
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

  getCategoryName(category: VariantCategoryGroup): string {
    if (category.hasImages) {
      const selectedValue = this.getSelectedValue(category.name);

      return `${category.name}${selectedValue ? `: ${selectedValue}` : ''}`;
    }

    return category.name;
  }

  getSelectedValue(categoryName: string): string {
    const category = this.categories.find((cat) => cat.name === categoryName);

    if (category && this.selectedVariant) {
      const selectedOption = category.variantOptions.find(
        (option) => option.code === this.selectedVariant
      );

      return selectedOption ? selectedOption.value : '';
    }

    return '';
  }

  isSelected(code: string): boolean {
    return code === this.product.code;
  }

  onAriaLabel(
    option: VariantCategoryOption,
    categoryName: string
  ): Observable<string> {
    const isSelected = this.isSelected(option.code);

    if (isSelected) {
      return this.translationService
        .translate('multiDimensional.selectedVariant')
        .pipe(map((text) => `${text}, ${option.value} ${categoryName}`));
    }

    return this.translationService
      .translate('multiDimensional.variantThumbnailTitle', {
        value: option.value,
        category: categoryName,
      })
      .pipe(map((text) => `${text}`));
  }
}
