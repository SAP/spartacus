/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CONFIGURATOR_CONFIGURATION_OBS,
  CONFIGURATOR_GROUP_TITLE_COMPONENT,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_GROUP_TITLE_COMPONENT_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: CONFIGURATOR_GROUP_TITLE_COMPONENT,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      deprecatedNode: CONFIGURATOR_CONFIGURATION_OBS,
      comment: `// ${TODO_SPARTACUS} Member '${CONFIGURATOR_GROUP_TITLE_COMPONENT}.${CONFIGURATOR_CONFIGURATION_OBS}' was removed. Consult the migration documentation on how to deal with that`,
    },
  ];
