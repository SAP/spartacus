/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ANGULAR_CORE,
  CMS_SERVICE,
  PAGE_META_CONFIG,
  PAGE_META_SERVICE,
  PLATFORM_ID,
  UNIFIED_INJECTOR,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PAGE_META_SERVICE_MIGRATION: ConstructorDeprecation = {
  class: PAGE_META_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [{ className: CMS_SERVICE, importPath: SPARTACUS_CORE }],
  addParams: [
    { className: UNIFIED_INJECTOR, importPath: SPARTACUS_CORE },
    { className: PAGE_META_CONFIG, importPath: SPARTACUS_CORE },
    { className: PLATFORM_ID, importPath: ANGULAR_CORE },
  ],
};
