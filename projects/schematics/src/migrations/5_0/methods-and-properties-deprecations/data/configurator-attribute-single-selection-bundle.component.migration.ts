/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CONFIGURATOR_ATTRIBUTE_SINGLE_SELECTION_BUNDLE_COMPONENT,
  EXTRACT_PRODUCT_CARD_PARAMETERS,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// feature-libs/product-configurator/rulebased/components/attribute/types/single-selection-bundle/configurator-attribute-single-selection-bundle.component.ts
export const CONFIGURATOR_ATTRIBUTE_SINGLE_SELECTION_BUNDLE_COMPONENT_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: CONFIGURATOR_ATTRIBUTE_SINGLE_SELECTION_BUNDLE_COMPONENT,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      deprecatedNode: EXTRACT_PRODUCT_CARD_PARAMETERS,
      comment: `// ${TODO_SPARTACUS} Method '${EXTRACT_PRODUCT_CARD_PARAMETERS}' obtained additional parameter 'index' of current value in list of values.`,
    },
  ];
