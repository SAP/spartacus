/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CMS_SERVICE,
  FEATURE_CONFIG_SERVICE,
  PAGE_META_RESOLVER,
  PAGE_META_SERVICE,
} from '../../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../../shared/utils/file-utils';

export const PAGE_META_SERVICE_MIGRATION: ConstructorDeprecation = {
  class: PAGE_META_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    { className: PAGE_META_RESOLVER, importPath: SPARTACUS_CORE },
    { className: CMS_SERVICE, importPath: SPARTACUS_CORE },
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
