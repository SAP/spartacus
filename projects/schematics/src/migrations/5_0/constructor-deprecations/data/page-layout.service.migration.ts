/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BREAKPOINT_SERVICE,
  CMS_SERVICE,
  LAYOUT_CONFIG,
  PAGE_LAYOUT_HANDLER,
  PAGE_LAYOUT_SERVICE,
  UNIFIED_INJECTOR,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PAGE_LAYOUT_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-structure/page/page-layout/page-layout.service.ts
  class: PAGE_LAYOUT_SERVICE,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: CMS_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: LAYOUT_CONFIG,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: BREAKPOINT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: PAGE_LAYOUT_HANDLER,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  removeParams: [
    {
      className: PAGE_LAYOUT_HANDLER,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    {
      className: UNIFIED_INJECTOR,
      importPath: SPARTACUS_CORE,
    },
  ],
};
