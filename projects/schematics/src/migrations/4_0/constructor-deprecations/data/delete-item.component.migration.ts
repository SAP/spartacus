/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DELETE_ITEM_COMPONENT,
  FEATURE_CONFIG_SERVICE,
  ITEM_SERVICE,
  MESSAGE_SERVICE,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';
export const DELETE_ITEM_COMPONENT_MIGRATION: ConstructorDeprecation = {
  class: DELETE_ITEM_COMPONENT,
  importPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
  deprecatedParams: [
    {
      className: ITEM_SERVICE,
      importPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    },
    {
      className: MESSAGE_SERVICE,
      importPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    },
    {
      className: FEATURE_CONFIG_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: FEATURE_CONFIG_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
