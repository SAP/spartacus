/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CONFIGURATOR_API_GET_CONFLICT_MESSAGE_KEY,
  CONFIGURATOR_API_IS_ATTRIBUTE_GROUP,
  CONFIGURATOR_ATTRIBUTE_HEADER_COMPONENT,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// feature-libs/product-configurator/rulebased/components/attribute/header/configurator-attribute-header.component.ts
export const CONFIGURATOR_ATTRIBUTE_HEADER_COMPONENT_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: CONFIGURATOR_ATTRIBUTE_HEADER_COMPONENT,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      deprecatedNode: CONFIGURATOR_API_GET_CONFLICT_MESSAGE_KEY,
      comment: `// ${TODO_SPARTACUS} Method '${CONFIGURATOR_API_GET_CONFLICT_MESSAGE_KEY}' got parameter 'groupType' removed.`,
    },
    {
      class: CONFIGURATOR_ATTRIBUTE_HEADER_COMPONENT,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      deprecatedNode: CONFIGURATOR_API_IS_ATTRIBUTE_GROUP,
      comment: `// ${TODO_SPARTACUS} Method '${CONFIGURATOR_API_IS_ATTRIBUTE_GROUP}' got parameter 'groupType' removed.`,
    },
  ];
