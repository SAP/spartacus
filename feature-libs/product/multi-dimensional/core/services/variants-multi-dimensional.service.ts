/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Product, VariantMatrixElement, VariantOption, VariantOptionQualifier } from 'projects/core/src/model';
import { VariantsCategories } from '../model/augmented-core.model';

// import { productData } from './product-data';

interface Leaf {
  variantMatrixElement: VariantMatrixElement;
  variantOptionQualifiers: VariantOptionQualifier[];
}

@Injectable({ providedIn: 'root' })
export class VariantsMultiDimensionalService {
  variantHasImages(variants: any[]): boolean {
    return variants.some(
      (variant: VariantMatrixElement) => variant.parentVariantCategory?.hasImage
    );
  }

  getVariants(product: Product): VariantsCategories[] {

    // product = {
    //   ...product,
    //   code: '88116000_1',
    //   variantMatrix: productData.variantMatrix,
    //   categories: productData.categories,
    //   baseOptions: productData.baseOptions
    // };
    const baseOptions = product?.baseOptions ?? [];

    const variantMatrix = product.variantMatrix ?? [];
    const variantOptions = baseOptions[0].options ?? [];
    const leafElements = this.findLeafElements(variantMatrix, variantOptions);
    const selectedVariants = baseOptions[0]?.selected?.variantOptionQualifiers ?? [];

    const options: {
      qualifier: string;
      qualifiers: VariantOptionQualifier[];
    }[] = this.findAllOptions(variantOptions, selectedVariants);

    return product && product.variantMatrix
      ? this.groupVariantsByCategory(options, leafElements, selectedVariants)
      : [];
  }

  groupVariantsByCategory(
    options: { qualifier: string; qualifiers: VariantOptionQualifier[] }[],
    leafElements: Leaf[],
    selectedVariants: VariantOptionQualifier[]
  ): VariantsCategories[] {
    return options.map((option) => ({
      name: option.qualifier,
      categoryVariants: leafElements.reduce((variantMatrixElements, leaf) => {
        const matchesCriteria = selectedVariants.every((selected) =>
          selected.name === option.qualifier ||
          leaf.variantOptionQualifiers.some(
            (vo) => vo.name === selected.name && vo.value === selected.value
          )
        );

        /**
         * All Selected Variant Qualifiers (Except Matching Option): It must have all
         * the qualifiers present in the selectedVariants array
         * Matching Option Qualifier (Match or Non-Match):
         * For the qualifier where VariantOptionQualifier.qualifier matches
         * the current option.name, the qualifier value can either be the same
         * as option.name (match) or different from option.name (non-match)
         */
        if (matchesCriteria) {
          option.qualifiers.forEach((optionQualifier) => {
            const match = leaf.variantOptionQualifiers.find(
              (vo) => vo.qualifier === optionQualifier.qualifier && vo.value === optionQualifier.value
            );
            if (match) {
              variantMatrixElements.push({
                ...leaf.variantMatrixElement,
                variantValueCategory: { name: optionQualifier.value }
              });
            }
          });
        }
        return variantMatrixElements;
      }, [] as VariantMatrixElement[])
    }));
  }

  findLeafElements(variantMatrix: VariantMatrixElement[], variantOptions: VariantOption[]): Leaf[] {
    const leafElements: Leaf[] = [];
    const traverseElements = (matrix: VariantMatrixElement[]) => {

      matrix.forEach((element: VariantMatrixElement) => {
        if (!element.elements || element.elements.length === 0) {
          const qualifiers = variantOptions.find((option) => option.code === element.variantOption?.code)?.variantOptionQualifiers;
          if (qualifiers) {
            leafElements.push({
              variantMatrixElement: element,
              variantOptionQualifiers: qualifiers
            });
          }
        } else {
          traverseElements(element.elements);
        }
      });
    };

    traverseElements(variantMatrix);

    return leafElements;
  }

  findAllOptions(variantOptions: VariantOption[], selectedVariants: VariantOptionQualifier[]): {
    qualifier: string;
    qualifiers: VariantOptionQualifier[];
  }[] {
    const optionsMap = new Map<string, VariantOptionQualifier>();

    variantOptions.forEach((v) => {
      v?.variantOptionQualifiers?.forEach((qualifier) => {
        const value = qualifier.value ?? '';
        optionsMap.set(value, qualifier);
      });
    });


    return selectedVariants.map((selectedVariant) => {
      const qualifiers: VariantOptionQualifier[] = [];
      Array.from(optionsMap.values()).forEach((value) => {
        if (value.qualifier === selectedVariant.qualifier) {
          qualifiers.push(value);
        }
      });
      return { qualifier: selectedVariant.name as string, qualifiers };
    });
  }
}
