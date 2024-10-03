/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CONFIGURATOR_ATTRIBUTE_HEADER_COMPONENT,
  CONFIGURATOR_COMMONS_SERVICE,
  CONFIGURATOR_GROUPS_SERVICE,
  CONFIGURATOR_STOREFRONT_UTILS_SERVICE,
  CONFIGURATOR_UI_SETTINGS_CONFIG,
} from '../../../../shared/constants';
import { SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_ATTRIBUTE_HEADER_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    //feature-libs/product-configurator/rulebased/components/attribute/header/configurator-attribute-header.component.ts
    class: CONFIGURATOR_ATTRIBUTE_HEADER_COMPONENT,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedParams: [
      {
        className: CONFIGURATOR_STOREFRONT_UTILS_SERVICE,
        importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      },
    ],
    addParams: [
      {
        className: CONFIGURATOR_COMMONS_SERVICE,
        importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      },
      {
        className: CONFIGURATOR_GROUPS_SERVICE,
        importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      },
      {
        className: CONFIGURATOR_UI_SETTINGS_CONFIG,
        importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      },
    ],
  };
