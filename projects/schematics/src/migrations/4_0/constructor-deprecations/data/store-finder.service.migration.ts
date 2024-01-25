/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ANGULAR_CORE,
  ANY_TYPE,
  GLOBAL_MESSAGE_SERVICE,
  NGRX_STORE,
  PLATFORM,
  PLATFORM_ID_STRING,
  ROUTING_SERVICE,
  STORE,
  STORE_FINDER_SERVICE,
  WINDOW_REF,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_STOREFINDER,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const STORE_FINDER_SERVICE_MIGRATION: ConstructorDeprecation = {
  // feature-libs/storefinder/core/facade/store-finder.service.ts
  class: STORE_FINDER_SERVICE,
  importPath: SPARTACUS_STOREFINDER,
  deprecatedParams: [
    {
      className: STORE,
      importPath: NGRX_STORE,
    },
    {
      className: WINDOW_REF,
      importPath: SPARTACUS_CORE,
    },
    {
      className: GLOBAL_MESSAGE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: PLATFORM,
      literalInference: ANY_TYPE,
      injectionToken: {
        token: PLATFORM_ID_STRING,
        importPath: ANGULAR_CORE,
      },
    },
  ],
};
