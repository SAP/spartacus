/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CDC_JS_SERVICE,
  GLOBAL_MESSAGE_SERVICE,
} from '../../../../shared/constants';
import {
  SPARTACUS_CDC,
  SPARTACUS_CORE,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CDC_JS_SERVICE_CONSTRUCTOR_MIGRATION: ConstructorDeprecation = {
  // integration-libs/cdc/root/service/cdc-js.service.ts
  class: CDC_JS_SERVICE,
  importPath: SPARTACUS_CDC,
  addParams: [
    { className: GLOBAL_MESSAGE_SERVICE, importPath: SPARTACUS_CORE },
  ],
  deprecatedParams: [],
};
