/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

const matrixElement =
  'variantOption(code,variantOptionQualifiers(image(url,format))),variantValueCategory(name),parentVariantCategory(hasImage,name)';
const variantMatrix = `variantMatrix(${matrixElement},elements(${matrixElement},elements(${matrixElement},elements)))`;
export const defaultOccProductVariantsMultidimensionalConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        product: {
          multi_dimensional:
            'products/${productCode}?fields=multidimensional,categories,' +
            variantMatrix,
          multi_dimensional_guard:
            'products/${productCode}?fields=variantOptions(stock(stockLevel),code),purchasable',
        },
      },
    },
  },
};
