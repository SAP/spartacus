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
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import {
  OccConfig,
  Product,
  VariantMatrixElement,
  VariantQualifier,
} from '@spartacus/core';
import {
  ProductListItemContext,
  ProductListOutlets,
} from '@spartacus/storefront';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { ProductMultiDimensionalService } from '../../../core/services';
import { VariantsCategories } from '../../../core/model/augmented-core.model';

@Component({
  selector: 'cx-multidimensional-icons',
  templateUrl: './product-multi-dimensional-icons.component.html',
  styleUrls: ['./product-multi-dimensional-icons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductMultiDimensionalIconsComponent
  implements OnInit, OnDestroy
{
  protected config = inject(OccConfig);
  @Optional() protected productListItemContext?: ProductListItemContext =
    inject(ProductListItemContext, { optional: true });
  protected mdService = inject(ProductMultiDimensionalService);

  protected subscriptions = new Subscription();
  readonly ProductListOutlets = ProductListOutlets;
  readonly product$: Observable<Product> =
    this.productListItemContext?.product$ ?? EMPTY;

  @Input()
  variants: VariantsCategories[] = [];

  ngOnInit() {
    this.subscriptions.add(
      this.product$.subscribe((product: Product) => {
        if (product.multidimensional && product.variantMatrix?.length) {
          this.variants = this.mdService.getVariants(product);
        }
      })
    );
  }

  variantHasImages(variants: VariantMatrixElement[]): boolean {
    return variants.some(
      (variant: VariantMatrixElement) => variant.parentVariantCategory?.hasImage
    );
  }

  getVariantOptionImages(category: VariantMatrixElement) {
    const images = {};
    const defaultImageObject = {
      altText: category.parentVariantCategory.name || '',
    };
    const variantOptionQualifiers =
      category.variantOption?.variantOptionQualifiers;
    variantOptionQualifiers.forEach((element: any) => {
      const imageObject = Object.assign(defaultImageObject, {
        format: element.image?.format,
        url: this.getBaseUrl() + element.image?.url,
      });
      if (imageObject.format === VariantQualifier.THUMBNAIL) {
        Object.assign(images, imageObject);
      }
    });

    return images;
  }

  protected getBaseUrl(): string {
    return (
      (this.config as OccConfig).backend?.media?.baseUrl ??
      (this.config as OccConfig).backend?.occ?.baseUrl ??
      ''
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
