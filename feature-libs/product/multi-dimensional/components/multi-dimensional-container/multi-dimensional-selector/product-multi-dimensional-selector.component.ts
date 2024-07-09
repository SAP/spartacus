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
  Config,
  OccConfig,
  Product,
  ProductScope,
  ProductService,
  RoutingService,
  VariantMatrixElement,
  VariantOptionQualifier,
  VariantQualifier,
} from '@spartacus/core';
import { GroupedOption, ProductMultiDimensionalService } from '../../../core/services/product-multi-dimensional.service';
import { ActivatedRoute } from '@angular/router';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'cx-variants-multi-dimensional-selector',
  templateUrl: './product-multi-dimensional-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductMultiDimensionalSelectorComponent implements OnChanges {
  protected config: Config = inject(Config);
  protected multiDimensionalService: ProductMultiDimensionalService = inject(
    ProductMultiDimensionalService
  );
  protected productService: ProductService = inject(ProductService);
  protected routingService: RoutingService = inject(RoutingService);
  protected route: ActivatedRoute = inject(ActivatedRoute);

  @Input()
  product: Product;

  categoryOptions: GroupedOption[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.product) {
      this.categoryOptions = this.multiDimensionalService.getVariants(this.product);
    }
  }

  variantHasImages(variants: any): boolean {
    return false
    return variants.every((variant: VariantMatrixElement) => {
      if (variant.variantOption?.variantOptionQualifiers) {
        return variant.variantOption.variantOptionQualifiers.every(
          (qualifier: VariantOptionQualifier) => qualifier.image !== undefined
        );
      }
      return false;
    });
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

  getVariantOptionImages(variantOptionQualifiers: VariantOptionQualifier[]): {
    [key: string]: any;
  } {
    const imagesArray = variantOptionQualifiers
      .filter(
        (qualifier) => qualifier.image?.format === VariantQualifier.SWATCH
      )
      .map((qualifier) => ({
        format: qualifier.image?.format,
        url: this.getBaseUrl() + qualifier.image?.url,
      }));

    const images: { [key: string]: any } = {};
    imagesArray.forEach((image, index) => {
      images[`image${index}`] = image;
    });

    return images;
  }

  isSelected(category: VariantMatrixElement) {
    return category.variantOption?.code === this.product.code;
  }

  protected getBaseUrl(): string {
    return (
      (this.config as OccConfig).backend?.media?.baseUrl ??
      (this.config as OccConfig).backend?.occ?.baseUrl ??
      ''
    );
  }
}
