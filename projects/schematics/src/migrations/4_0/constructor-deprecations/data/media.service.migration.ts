/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BREAKPOINT_SERVICE,
  CONFIG,
  MEDIA_SERVICE,
  STOREFRONT_CONFIG,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const MEDIA_SERVICE_MIGRATION: ConstructorDeprecation = {
  class: MEDIA_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    {
      className: STOREFRONT_CONFIG,
      literalInference: STOREFRONT_CONFIG,
      injectionToken: {
        token: CONFIG,
        importPath: SPARTACUS_CORE,
      },
    },
    {
      className: BREAKPOINT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  removeParams: [
    {
      className: STOREFRONT_CONFIG,
      literalInference: STOREFRONT_CONFIG,
      injectionToken: {
        token: CONFIG,
        importPath: SPARTACUS_CORE,
      },
    },
    {
      className: BREAKPOINT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    {
      className: CONFIG,
      importPath: SPARTACUS_CORE,
    },
  ],
};
