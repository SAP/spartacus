/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT,
  CONFIGURATOR_ATTRIBUTE_SINGLE_SELECTION_BASE_COMPONENT,
  ON_SELECT,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

//feature-libs/product-configurator/rulebased/components/attribute/types/drop-down/configurator-attribute-drop-down.component.ts
export const CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      deprecatedNode: ON_SELECT,
      comment: `// ${TODO_SPARTACUS} Method '${ON_SELECT}' was removed from '${CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT}'. Instead use new method '${ON_SELECT}' from '${CONFIGURATOR_ATTRIBUTE_SINGLE_SELECTION_BASE_COMPONENT}'.`,
    },
  ];
