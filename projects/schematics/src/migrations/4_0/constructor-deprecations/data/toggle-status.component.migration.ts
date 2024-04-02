/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DISABLE_INFO_SERVICE,
  FEATURE_CONFIG_SERVICE,
  ITEM_SERVICE,
  MESSAGE_SERVICE,
  TOGGLE_STATUS_COMPONENT,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const TOGGLE_STATUS_COMPONENT_MIGRATION_V1: ConstructorDeprecation = {
  class: TOGGLE_STATUS_COMPONENT,
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
  ],
  addParams: [
    {
      className: DISABLE_INFO_SERVICE,
      importPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    },
  ],
};

export const TOGGLE_STATUS_COMPONENT_MIGRATION_V2: ConstructorDeprecation = {
  class: TOGGLE_STATUS_COMPONENT,
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
  addParams: [
    {
      className: DISABLE_INFO_SERVICE,
      importPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    },
  ],
};
