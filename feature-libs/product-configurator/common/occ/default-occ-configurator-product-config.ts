/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';
import { ConfiguratorProductScope } from '../core/model/configurator-product-scope';

export const defaultOccConfiguratorProductConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        product: {
          configurator:
            'products/${productCode}?fields=code,configurable,configuratorType',
          configuratorProductCard:
            'products/${productCode}?fields=code,description,images(DEFAULT)',
        },
      },
    },
    loadingScopes: {
      product: {
        list: {
          include: [ConfiguratorProductScope.CONFIGURATOR],
        },
      },
    },
  },
};
