/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CHECKOUT_CONFIG_SERVICE,
  CHECKOUT_DELIVERY_FACADE,
  CHECKOUT_DETAILS_SERVICE,
  CHECKOUT_PAYMENT_FACADE,
  CLEAR_CHECKOUT_FACADE,
  EXPRESS_CHECKOUT_SERVICE,
  USER_ADDRESS_SERVICE,
  USER_PAYMENT_SERVICE,
} from '../../../../shared/constants';
import {
  SPARTACUS_CHECKOUT_OLD_COMPONENTS,
  SPARTACUS_CHECKOUT_OLD_ROOT,
  SPARTACUS_CORE,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const EXPRESS_CHECKOUT_SERVICE_MIGRATION: ConstructorDeprecation = {
  // feature-libs/checkout/components/services/express-checkout.service.ts
  class: EXPRESS_CHECKOUT_SERVICE,
  importPath: SPARTACUS_CHECKOUT_OLD_COMPONENTS,
  deprecatedParams: [
    {
      className: USER_ADDRESS_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: USER_PAYMENT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CHECKOUT_DELIVERY_FACADE,
      importPath: SPARTACUS_CHECKOUT_OLD_ROOT,
    },
    {
      className: CHECKOUT_PAYMENT_FACADE,
      importPath: SPARTACUS_CHECKOUT_OLD_ROOT,
    },
    {
      className: CHECKOUT_DETAILS_SERVICE,
      importPath: SPARTACUS_CHECKOUT_OLD_COMPONENTS,
    },
    {
      className: CHECKOUT_CONFIG_SERVICE,
      importPath: SPARTACUS_CHECKOUT_OLD_COMPONENTS,
    },
  ],
  addParams: [
    {
      className: CLEAR_CHECKOUT_FACADE,
      importPath: SPARTACUS_CHECKOUT_OLD_ROOT,
    },
  ],
};
