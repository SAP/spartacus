/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SampleCartProduct, SampleProduct } from './checkout-flow';

export const multiDBaseProduct: SampleProduct = {
  name: 'cyber-shot-w55',
  code: '676442_md',
};
export const multiDProduct: SampleProduct = {
  name: 'Cyber-Shot W55',
  code: '676442_md_1',
};

export const cartWithMultipleVariantProducts: SampleCartProduct = {
  estimatedShipping: '$11.99',
  total: '$703.74',
  totalAndShipping: '$715.73',
};

export const cartWithTotalVariantProduct: SampleCartProduct = {
  estimatedShipping: '$11.99',
  total: '$240.87',
  totalAndShipping: `$252.86`,
};
