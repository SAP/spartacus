/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Product, VariantMatrixElement } from '@spartacus/core';
import { VariantCategory } from '../model/augmented-core.model';
import { ProductMultiDimensionalImagesService } from './product-multi-dimensional-images.service';

@Injectable({ providedIn: 'root' })
export class ProductMultiDimensionalService {
  protected imagesService = inject(ProductMultiDimensionalImagesService);

  getVariants(product: Product): VariantCategory[] {
    let variantMatrix = product.variantMatrix ?? [];
    const levels = product.categories ?? [];
    const code = product.code ?? '';

    const variantCategories: VariantCategory[] = [];

    /**
     * Example
     * Given at the beginning we have selected "Blue 2 L",
     *
     * Color:        Red             (Blue)
     * Size:      1     2         1      (2)
     * Fit:     M  L  M   L     M   L   M   (L)
     *
     * At the first level "Color", all available colors such as Red and Blue are extracted, but also
     * elements from the Blue node are used to extract another set of options.
     * This recursive process continues until all Variant Options have been exhaustively retrieved
     *
     */

    levels.forEach((_) => {
      const parentVariantCategory = variantMatrix[0].parentVariantCategory;

      const variantCategory: VariantCategory = {
        name: parentVariantCategory?.name ?? '',
        variantOptions: [],
        hasImages: !!parentVariantCategory?.hasImage,
      };

      variantMatrix.forEach((element: VariantMatrixElement) => {
        const variantCategoryName = element.variantValueCategory?.name ?? '';
        const variantOptionQualifiers =
          element.variantOption?.variantOptionQualifiers ?? [];
        const images = this.imagesService.getVariantOptionImages(
          variantOptionQualifiers,
          variantCategoryName
        );

        const variantOptionCategory = {
          images,
          value: variantCategoryName,
          code: element.variantOption?.code ?? '',
        };

        variantCategory.variantOptions.push(variantOptionCategory);

        if (element.variantOption?.code === code && element.elements?.length) {
          /**
           * Update the variantMatrix to reflect the currently selected elements.
           * For example, when navigating through the Color category,
           * adjust the matrix to represent the Size options
           * available within the Blue branch
           *
           * Color:        Red             (Blue)
           * Size:      _1_     _2_      1      (2)
           */
          variantMatrix = element.elements;
        }
      });

      variantCategories.push(variantCategory);
    });

    return this.checkIfEveryOptionHasImages(variantCategories);
  }

  /**
   * Checks if every variant option in the category has images.
   */
  protected checkIfEveryOptionHasImages(
    variantCategories: VariantCategory[]
  ): VariantCategory[] {
    return variantCategories.map((variantCategory: VariantCategory) => {
      const variantOptions = variantCategory.variantOptions;
      const hasImages =
        variantCategory.hasImages ??
        variantOptions.every((option) => option.images.length);

      return {
        ...variantCategory,
        variantOptions,
        hasImages,
      };
    });
  }
}
