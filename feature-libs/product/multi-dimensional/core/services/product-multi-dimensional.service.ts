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
    const levels = product.categories;
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

    levels.forEach((_, i: number) => {
      const parentVariantCategory = variantMatrix[0].parentVariantCategory;

      const variantCategory: VariantCategory = {
        name: parentVariantCategory.name,
        variantOptions: [],
        hasImages: parentVariantCategory.hasImage,
        order: parentVariantCategory.priority ?? i,
      };

      variantMatrix.forEach((element: VariantMatrixElement, j: number) => {
        const images = this.imagesService.getVariantOptionImages(
          element.variantOption.variantOptionQualifiers,
          element.variantValueCategory.name
        );

        const variantOptionCategory = {
          images,
          value: element.variantValueCategory.name,
          code: element.variantOption.code,
          order: element.variantValueCategory.sequence ?? j,
        };

        variantCategory.variantOptions.push(variantOptionCategory);

        if (element.variantOption.code === code && element.elements.length) {
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

    return this.sortAndCheckIfEveryOptionHasImages(variantCategories);
  }

  /**
   * Sorts the variant options and checks if every variant option in the category
   * has images.
   *
   * Example:
   *
   * {
   *   name: "Color",
   *   variantOptions: [
   *     {
   *       value: Blue
   *       images: [...]
   *     },
   *     {
   *       value: Red
   *       images: [...]
   *     }
   *   ]
   * }
   */
  protected sortAndCheckIfEveryOptionHasImages(
    variantCategories: VariantCategory[]
  ): VariantCategory[] {
    return variantCategories
      .map((variantCategory: VariantCategory) => {
        const variantOptions = variantCategory.variantOptions;
        const hasImages =
          variantCategory.hasImages ??
          variantOptions.every((option) => option.images.length);
        const sortedVariantOptions = [...variantOptions];
        sortedVariantOptions.sort((a, b) => a.order - b.order);

        return {
          ...variantCategory,
          variantOptions: sortedVariantOptions,
          hasImages,
        };
      })
      .sort((a, b) => a.order - b.order);
  }
}
