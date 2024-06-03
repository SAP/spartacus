/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CONFIGURATOR_CONVERT_ATTRIBUTE_TYPE,
  OCC_CONFIGURATOR_VARIANT_NORMALIZER,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// feature-libs/product-configurator/rulebased/occ/variant/converters/occ-configurator-variant-normalizer.ts
export const OCC_CONFIGURATOR_VARIANT_NORMALIZER_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: OCC_CONFIGURATOR_VARIANT_NORMALIZER,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      deprecatedNode: CONFIGURATOR_CONVERT_ATTRIBUTE_TYPE,
      comment: `// ${TODO_SPARTACUS} Method '${CONFIGURATOR_CONVERT_ATTRIBUTE_TYPE}' got new parameter 'sourceAttribute' instead of 'type'.`,
    },
  ];
