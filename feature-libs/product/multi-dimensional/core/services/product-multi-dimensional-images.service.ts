/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Config, Image, OccConfig, Product, VariantMatrixElement, VariantOptionQualifier, VariantQualifier } from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class ProductMultiDimensionalImagesService {
  protected config: Config = inject(Config);

  /**
   * Retrieves images for a given variant option qualifier from the product's variant matrix.
   */
  getImagesFromVariantMatrix(qualifier: VariantOptionQualifier, product: Product): Image[] {
    const variantMatrix = product.variantMatrix ?? [];
    const categoryName = qualifier.name;
    let images: Image[] = [];

    /**
     * Recursively traverses the variant matrix to find and collect images
     */
    const traverMatrix = (matrix: VariantMatrixElement[]) => {
      for (const matrixElement of matrix) {
        const elements = matrixElement.elements ?? [];
        const hasImages = matrixElement.parentVariantCategory.hasImage;
        /**
         * Checks if the searched variant option matches the matrix node values.
         *
         * Example:
         * - Option: Color red
         * - Node:
         *   - parentVariantCategory.name: Color
         *   - variantValueCategory.name: Red
         */
        const isMatch = categoryName === matrixElement.parentVariantCategory.name
          && qualifier.value === matrixElement.variantValueCategory.name;

        if (isMatch && hasImages) {
          images = this.getVariantOptionImages(matrixElement.variantOption?.variantOptionQualifiers, qualifier);
          break;
        } else {
          traverMatrix(elements);
        }
      }
    };

    traverMatrix(variantMatrix);

    return images;
  }

  /**
   * Retrieves the images for variant option qualifiers that match the specified format.
   */
  protected getVariantOptionImages(variantOptionQualifiers: VariantOptionQualifier[], qualifier: VariantOptionQualifier): Image[] {
    const format = VariantQualifier.SWATCH;
    return variantOptionQualifiers
      .filter(
        (optionQualifier) => optionQualifier.image?.format === format
      )
      .map((optionQualifier) => {
        const altText = optionQualifier.image?.altText ?? qualifier.value;
        return {
          altText,
          format: optionQualifier.image?.format,
          url: this.getBaseUrl() + optionQualifier.image?.url
        };
      });
  }

  protected getBaseUrl(): string {
    return (
      (this.config as OccConfig).backend?.media?.baseUrl ??
      (this.config as OccConfig).backend?.occ?.baseUrl ??
      ''
    );
  }
}
