/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Product, VariantMatrixElement } from '@spartacus/core';
import { ProductMultiDimensionalSelectorImagesService } from './product-multi-dimensional-selector-images.service';
import { VariantCategoryGroup, VariantCategoryOption } from '../model';

@Injectable({ providedIn: 'root' })
export class ProductMultiDimensionalSelectorService {
  protected imagesService = inject(
    ProductMultiDimensionalSelectorImagesService
  );

  /**
   * Retrieves variant categories for a given product, extracting options recursively
   * from the variant matrix and adjusting for currently selected elements.
   *
   * @param {Product} product - The product object containing variant data.
   * @returns {VariantCategoryGroup[]} - An array of variant categories with their options.
   *
   * @description
   * This method processes a product's variant matrix to create an array of variant categories,
   * each containing its respective options. It handles model conversions to ensure that the
   * returned data is structured appropriately for the UI. Without these conversions, the UI
   * would not be able to display the variant options correctly, and some attributes required
   * for navigation would be missing.
   *
   * @example
   * Given initially selected option "Blue 2 L":
   * Color:        Red             (Blue)
   * Size:      1     2         1      (2)
   * Fit:     M  L  M   L     M   L   M   (L)
   *
   * The method extracts all available colors (e.g., Red and Blue) and recursively retrieves options
   * until all variant options are exhausted, based on the currently selected options. For example the second row
   * contains multiple sizes of the same value, representing different products. Since the user can change
   * only one variant at a time, we need to identify only the products that reflect the current selections,
   * as shown in the tree with rows like (Blue), (2), (L).
   *
   * Color:        Red             (Blue)
   * Size:                       1      (2)
   * Fit:                              M   (L)
   *
   * @see checkIfEveryOptionHasImages
   * @see imagesService.getVariantOptionImage
   */
  getVariants(product: Product): VariantCategoryGroup[] {
    let variantMatrix = product.variantMatrix ?? [];
    /** Levels determines the depth of the variantMatrix  */
    const levels = product.categories ?? [];
    const code = product.code ?? '';

    const variantCategories: VariantCategoryGroup[] = [];

    levels.forEach((_) => {
      const variantCategoryGroup: VariantCategoryGroup =
        this.createVariantCategoryGroup(variantMatrix);

      variantMatrix.forEach((element: VariantMatrixElement) => {
        const variantOptionCategory = this.createVariantOptionCategory(element);

        variantCategoryGroup.variantOptions.push(variantOptionCategory);

        /** Check if the current element has child elements and is in the currently selected branch */
        if (element.variantOption?.code === code && element.elements?.length) {
          /**
           * Update the variantMatrix to reflect the currently selected elements.
           * For example, when navigating through the Color category,
           * adjust the matrix to represent the Size options
           * available within the Blue branch. The left branch (Red) is discarded as
           * it does not contain the currently selected product.
           *
           * Color:        Red             (Blue)
           * Size:      _1_     _2_      1      (2)
           */
          variantMatrix = element.elements;
        }
      });

      variantCategories.push(variantCategoryGroup);
    });

    return this.checkIfEveryOptionHasImages(variantCategories);
  }

  /**
   * Checks if every variant option in the category has images.
   *
   * @param {VariantCategoryGroup[]} variantCategories - An array of variant categories.
   * @returns {VariantCategoryGroup[]} - An array of variant categories with updated image information.
   */
  protected checkIfEveryOptionHasImages(
    variantCategories: VariantCategoryGroup[]
  ): VariantCategoryGroup[] {
    return variantCategories.map(
      (variantCategoryGroup: VariantCategoryGroup) => {
        const variantOptions = variantCategoryGroup.variantOptions;
        const hasImages =
          variantCategoryGroup.hasImages &&
          variantOptions.every((option) => !!option.image);

        return {
          ...variantCategoryGroup,
          variantOptions,
          hasImages,
        };
      }
    );
  }

  /**
   * Creates a variant option category from a variant matrix element.
   *
   * @param {VariantMatrixElement} element - The variant matrix element.
   * @returns {VariantCategoryOption} - The variant category option.
   *
   * @description
   * This method converts a variant matrix element into a variant category option.
   * It extracts the variant category name, option qualifiers, and images to create
   * the appropriate data structure for the UI.
   *
   * @see imagesService.getVariantOptionImage
   */
  protected createVariantOptionCategory(
    element: VariantMatrixElement
  ): VariantCategoryOption {
    const variantCategoryName = element.variantValueCategory?.name ?? '';
    const variantOptionQualifiers =
      element.variantOption?.variantOptionQualifiers ?? [];
    const image = this.imagesService.getVariantOptionImage(
      variantOptionQualifiers,
      variantCategoryName
    );

    return {
      image,
      value: variantCategoryName,
      code: element.variantOption?.code ?? '',
    };
  }

  /**
   * Creates a variant category group from a variant matrix.
   *
   * @param {VariantMatrixElement[]} elements - The variant matrix elements.
   * @returns {VariantCategoryGroup} - The variant category.
   *
   * @description
   * This method creates a variant category from the first element of a variant matrix.
   * The category name and image presence status (`hasImages`) are consistent for each
   * element in the array. It initializes the category's name, option list, and image presence status.
   */
  protected createVariantCategoryGroup(
    elements: VariantMatrixElement[]
  ): VariantCategoryGroup {
    const parentVariantCategory = elements.length
      ? elements[0]?.parentVariantCategory
      : undefined;

    return {
      name: parentVariantCategory?.name ?? '',
      variantOptions: [],
      hasImages: !!parentVariantCategory?.hasImage,
    };
  }
}
