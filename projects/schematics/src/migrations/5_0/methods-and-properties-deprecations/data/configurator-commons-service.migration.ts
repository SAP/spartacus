/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CONFIGURATOR_COMMONS_SERVICE,
  CONFIGURATOR_REMOVE_OBSOLETE_PRODUCT_BOUND_CONFIGURATION,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_COMMONS_SERVICE_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: CONFIGURATOR_COMMONS_SERVICE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      deprecatedNode: CONFIGURATOR_REMOVE_OBSOLETE_PRODUCT_BOUND_CONFIGURATION,
      comment: `// ${TODO_SPARTACUS} Method '${CONFIGURATOR_COMMONS_SERVICE}.${CONFIGURATOR_REMOVE_OBSOLETE_PRODUCT_BOUND_CONFIGURATION}' was removed. Consult the migration documentation on how to deal with that`,
    },
  ];
