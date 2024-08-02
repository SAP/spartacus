/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SampleCartProduct, SampleProduct } from './checkout-flow';

export const multiDBaseProduct: SampleProduct = {
  name: 'SC-H20_MD',
  code: '1978440_md',
};
export const multiDProduct: SampleProduct = {
  name: 'SC-H20_MD Red',
  code: '1978440_md_red',
};

export const cartWithMultipleVariantProducts: SampleCartProduct = {
  estimatedShipping: '$11.99',
  total: '$1,655.20',
  totalAndShipping: '$1,667.19',
};

export const cartWithTotalVariantProduct: SampleCartProduct = {
  estimatedShipping: '$11.99',
  total: '$538.40',
  totalAndShipping: '$550.39',
};
