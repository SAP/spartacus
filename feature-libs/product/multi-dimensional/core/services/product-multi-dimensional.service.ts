/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  BaseOption,
  Product,
  VariantMatrixElement,
  VariantOption,
  VariantOptionQualifier,
} from '@spartacus/core';

import { ProductMultiDimensionalImagesService } from './product-multi-dimensional-images.service';
import { VariantCategory } from '../model/augmented-core.model';

@Injectable({ providedIn: 'root' })
export class ProductMultiDimensionalService {
  protected imagesService = inject(ProductMultiDimensionalImagesService);

  getVariants(product: Product): VariantCategory[] {
    return this.groupBaseOptions(product);
  }

  /**
   * organizes the product data into variant categories based on
   * variantMatrix and baseOptions
   */
  protected groupBaseOptions(product: Product): VariantCategory[] {
    const variantMatrix = product.variantMatrix ?? [];
    const variantCategories: VariantCategory[] = [];
    const baseOptions: BaseOption = product.baseOptions?.[0] ?? {};
    const selectedQualifiers: VariantOptionQualifier[] =
      baseOptions.selected?.variantOptionQualifiers ?? [];

    baseOptions.options?.forEach((option: VariantOption) => {
      option.variantOptionQualifiers?.forEach(
        (qualifier: VariantOptionQualifier) => {
          if (qualifier.name) {
            /**
             * Check if the variant category already exists e.g [{name: Color, variantOptions: [...], ...}]
             */
            let variantCategory = variantCategories.find(
              (v) => v.name === qualifier.name
            );

            if (!variantCategory) {
              /**
               * Create a new variant category if it doesn't exist
               */
              variantCategory = {
                name: qualifier.name,
                variantOptions: [],
                hasImages: false,
              };
              variantCategories.push(variantCategory);
            }

            /**
             * Determines whether an option should be added to the category based on the selected variant.
             * For example, if "red medium" is selected from:
             *   - colors: [red, blue]
             *   - sizes: [medium, large]
             *
             * Since only one attribute can be changed at a time:
             *  The valid selections are:
             *     - red large
             *     - blue medium
             */
            if (
              this.shouldAdd(
                variantCategory.name,
                selectedQualifiers,
                option.variantOptionQualifiers ?? []
              )
            ) {
              const images = this.imagesService.getImagesFromVariantMatrix(
                qualifier,
                product
              );

              const order = this.getOrderFromVariantMatrix(
                qualifier,
                variantMatrix
              );

              variantCategory.variantOptions.push({
                order,
                images,
                value: qualifier.value ?? '',
                code: option.code ?? '',
              });
            }
          }
        }
      );
    });

    return this.sortAndCheckIfEveryOptionHasImages(variantCategories);
  }

  /**
   * Determines if a variant option should be included based on selected qualifiers
   */
  protected shouldAdd(
    groupName: string,
    selectedQualifiers: VariantOptionQualifier[],
    optionQualifiers: VariantOptionQualifier[]
  ): boolean {
    return optionQualifiers.every((optionQualifier: VariantOptionQualifier) => {
      if (optionQualifier.name === groupName) {
        return true;
      }

      return selectedQualifiers.find(
        (selectedOptionQualifier: VariantOptionQualifier) => {
          return optionQualifier.value === selectedOptionQualifier.value;
        }
      );
    });
  }

  /**
   * Retrieves the order of the variant based on the variant matrix.
   * It searches for a specific variant option, for example:
   *   Color: red
   *
   *   color - parentVariantCategory.name
   *   red - variantValueCategory.name
   *
   * and returns the corresponding order.
   */
  protected getOrderFromVariantMatrix(
    qualifier: VariantOptionQualifier,
    variantMatrix: VariantMatrixElement[]
  ): number {
    let order;
    const traversMatrix = (matrix: VariantMatrixElement[]) => {
      for (const matrixElement of matrix) {
        const isMatch =
          matrixElement.variantValueCategory?.name === qualifier.value &&
          matrixElement.parentVariantCategory?.name === qualifier.name;
        if (isMatch) {
          order = matrixElement.variantValueCategory?.sequence;
          break;
        }
      }
    };
    traversMatrix(variantMatrix);
    return order ?? 0;
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
    return variantCategories.map((variantCategory: VariantCategory) => {
      const variantOptions = variantCategory.variantOptions;
      const hasImages = variantOptions.every((option) => option.images.length);
      const sortedVariantOptions = variantOptions.sort(
        (a, b) => a.order - b.order
      );
      return {
        ...variantCategory,
        variantOptions: sortedVariantOptions,
        hasImages,
      };
    });
  }
}
