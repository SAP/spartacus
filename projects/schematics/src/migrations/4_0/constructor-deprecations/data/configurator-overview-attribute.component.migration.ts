/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BREAKPOINT_SERVICE,
  CONFIGURATOR_OVERVIEW_ATTRIBUTE_COMPONENT,
} from '../../../../shared/constants';
import {
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_OVERVIEW_ATTRIBUTE_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs/product-configurator/rulebased/components/overview-attribute/configurator-overview-attribute.component.ts
    class: CONFIGURATOR_OVERVIEW_ATTRIBUTE_COMPONENT,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedParams: [],
    addParams: [
      {
        className: BREAKPOINT_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
  };
