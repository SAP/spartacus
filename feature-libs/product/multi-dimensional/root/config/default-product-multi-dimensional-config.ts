/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProductMultiDimensionalConfig } from './product-multi-dimensional-config';
import { VariantQualifier } from '@spartacus/core';

export const defaultProductMultiDimensionalConfig: ProductMultiDimensionalConfig =
  {
    multiDimensional: {
      imageFormat: VariantQualifier.STYLE_SWATCH,
    },
  };
