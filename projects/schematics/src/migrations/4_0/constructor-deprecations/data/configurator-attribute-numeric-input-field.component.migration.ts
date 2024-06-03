/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT,
  CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_SERVICE,
  CONFIGURATOR_UI_SETTINGS_CONFIG,
} from '../../../../shared/constants';
import { SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs/product-configurator/rulebased/components/attribute/types/numeric-input-field/configurator-attribute-numeric-input-field.component.ts
    class: CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedParams: [
      {
        className: CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_SERVICE,
        importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      },
    ],
    addParams: [
      {
        className: CONFIGURATOR_UI_SETTINGS_CONFIG,
        importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      },
    ],
  };
