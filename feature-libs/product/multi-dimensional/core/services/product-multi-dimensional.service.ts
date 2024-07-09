/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { BaseOption, Product, VariantMatrixElement, VariantOption, VariantOptionQualifier } from '@spartacus/core';
import { p } from './p';
import { ProductMultiDimensionalImagesService } from './product-multi-dimensional-images.service';
import { VariantCategory } from '../model/augmented-core.model';

@Injectable({ providedIn: 'root' })
export class ProductMultiDimensionalService {
  imagesService = inject(ProductMultiDimensionalImagesService);

  getVariants(product: Product): VariantCategory[] {
    // @ts-ignore
    product = p;
    console.log(this.groupBaseOptions(product));

    return this.groupBaseOptions(product);
  }

  groupBaseOptions(product: Product): VariantCategory[] {
    const variantMatrix = product.variantMatrix ?? [];
    const variantCategories: VariantCategory[] = [];
    const baseOptions: BaseOption = product.baseOptions?.[0] ?? {};
    let selectedQualifiers: VariantOptionQualifier[] = baseOptions.selected?.variantOptionQualifiers ?? [];
    const temp: any[] = [
      {
        name: 'Color',
        qualifier: 'B2C_Color',
        value: 'Red'
      },
      {
        name: 'Size',
        qualifier: 'B2C_SIZE',
        value: 'L'
      },
      {
        name: 'Material',
        qualifier: 'B2C_Material',
        value: 'Cotton'
      }
    ];
    selectedQualifiers = temp;

    // Blue M Cotton

    baseOptions.options?.forEach((option: VariantOption) => {
      option.variantOptionQualifiers?.forEach((qualifier: VariantOptionQualifier) => {
        if (qualifier.name) {

          let variantCategory = variantCategories.find(v => v.name === qualifier.name);

          if (!variantCategory) {
            variantCategory = { name: qualifier.name, variantOptions: [], hasImages: false };
            variantCategories.push(variantCategory);
          }

          if (this.shouldAdd(variantCategory.name, selectedQualifiers, option.variantOptionQualifiers ?? [])) {

            const images = this.imagesService.getImagesFromVariantMatrix(qualifier, product);
            variantCategory.variantOptions.push({
              value: qualifier.value ?? '',
              code: option.code ?? '',
              images,
              order: this.getOrderFromVariantMatrix(qualifier, variantMatrix)
            });

          }
        }
      });
    });

    return variantCategories.map((variantCategory: VariantCategory) => {
      const hasImages = !!variantCategory.variantOptions.find((option) => option.images.length);
      return {
        ...variantCategory,
        variantOptions: variantCategory.variantOptions.sort((a, b) => a.order - b.order),
        hasImages
      };
    });
  }

  shouldAdd(groupName: string, selectedQualifiers: VariantOptionQualifier[], optionQualifiers: VariantOptionQualifier[]): boolean {
    return optionQualifiers.every((optionQualifier: VariantOptionQualifier) => {
      if (optionQualifier.name === groupName) {
        return true;
      }

      return selectedQualifiers.find(((selectedOptionQualifier: VariantOptionQualifier) => {
        return optionQualifier.value === selectedOptionQualifier.value;
      }));
    });
  }

  getOrderFromVariantMatrix(qualifier: VariantOptionQualifier, variantMatrix: VariantMatrixElement[]): number {
    let order = 0;
    const traversMatrix = (matrix: VariantMatrixElement[]) => {
      for (const matrixElement of matrix) {
        const isMatch = matrixElement.variantValueCategory.name === qualifier.value && matrixElement.parentVariantCategory.name === qualifier.name;
        if (isMatch) {
          order = matrixElement.variantValueCategory.sequence;
          break;
        }
      }
    };
    traversMatrix(variantMatrix);
    return order;
  }

}
