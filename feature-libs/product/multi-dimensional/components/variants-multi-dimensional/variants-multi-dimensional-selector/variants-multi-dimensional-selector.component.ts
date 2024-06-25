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
} from '@spartacus/core';
import { VariantsMultiDimensionalService } from '../../../core/services/variants-multi-dimensional.service';
import { ActivatedRoute } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { VariantsCategories } from '../../../core/model/augmented-core.model';

@Component({
  selector: 'cx-variants-multi-dimensional-selector',
  templateUrl: './variants-multi-dimensional-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsMultiDimensionalSelectorComponent implements OnChanges {
  protected config: Config = inject(Config);
  protected multiDimensionalService: VariantsMultiDimensionalService = inject(
    VariantsMultiDimensionalService
  );
  protected productService: ProductService = inject(ProductService);
  protected routingService: RoutingService = inject(RoutingService);
  protected route: ActivatedRoute = inject(ActivatedRoute);

  @Input()
  product: Product;

  variants: VariantsCategories[] = [];

  protected readonly PRODUCT_SCOPE = ProductScope.VARIANTS_MULTIDIMENSIONAL;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.product) {
      this.variants = this.multiDimensionalService.getVariants(this.product);
    }
  }

  variantHasImages(variants: VariantsCategories[]): boolean {
    return this.multiDimensionalService.variantHasImages(variants);
  }

  changeVariant(code: string | undefined): void {
    if (code) {
      this.productService
        .get(code, this.PRODUCT_SCOPE)
        .pipe(filter(Boolean), take(1))
        .subscribe((product: Product) => {
          this.routingService.go({
            cxRoute: 'product',
            params: product,
          });
        });
    }
  }

  getVariantOptionImages(variantOptionQualifier: VariantOptionQualifier[]) {
    const images = {};
    const defaultImageObject = {
      altText: this.product.name || '',
    };

    variantOptionQualifier.forEach((element: any) => {
      const imageObject = Object.assign(defaultImageObject, {
        format: element.image?.format,
        url: this.getBaseUrl() + element.image?.url,
      });
      Object.assign(images, imageObject);
    });

    return images;
  }

  isSelected(cat: VariantMatrixElement) {
    return cat.variantOption?.code === this.product.code;
  }

  protected getBaseUrl(): string {
    return (
      (this.config as OccConfig).backend?.media?.baseUrl ??
      (this.config as OccConfig).backend?.occ?.baseUrl ??
      ''
    );
  }
}
