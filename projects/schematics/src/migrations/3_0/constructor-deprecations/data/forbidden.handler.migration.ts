/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AUTH_SERVICE,
  FORBIDDEN_HANDLER,
  GLOBAL_MESSAGE_SERVICE,
  OCC_ENDPOINTS_SERVICE,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const FORBIDDEN_HANDLER_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/global-message/http-interceptors/handlers/forbidden/forbidden.handler.ts
  class: FORBIDDEN_HANDLER,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [],
  addParams: [
    {
      className: GLOBAL_MESSAGE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: AUTH_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: OCC_ENDPOINTS_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
