/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ANGULAR_CORE,
  CONFIGURATOR_GROUPS_SERVICE,
  CONFIGURATOR_STOREFRONT_UTILS_SERVICE,
  KEYBOARD_FOCUS_SERVICE,
  PLATFORM_ID_STRING,
  WINDOW_REF,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_STOREFRONT_UTILS_SERVICE_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs/product-configurator/rulebased/components/service/configurator-storefront-utils.service.ts
    class: CONFIGURATOR_STOREFRONT_UTILS_SERVICE,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedParams: [
      {
        className: CONFIGURATOR_GROUPS_SERVICE,
        importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      },
      {
        className: PLATFORM_ID_STRING,
        importPath: ANGULAR_CORE,
      },
    ],
    removeParams: [
      {
        className: PLATFORM_ID_STRING,
        importPath: ANGULAR_CORE,
      },
    ],
    addParams: [
      {
        className: WINDOW_REF,
        importPath: SPARTACUS_CORE,
      },
      {
        className: KEYBOARD_FOCUS_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
  };
