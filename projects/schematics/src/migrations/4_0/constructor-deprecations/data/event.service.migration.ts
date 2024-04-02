/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EVENT_SERVICE,
  FEATURE_CONFIG_SERVICE,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const EVENT_SERVICE_CONSTRUCTOR_DEPRECATION: ConstructorDeprecation = {
  // projects/core/src/event/event.service.ts
  class: EVENT_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    { className: FEATURE_CONFIG_SERVICE, importPath: SPARTACUS_CORE },
  ],
  removeParams: [
    { className: FEATURE_CONFIG_SERVICE, importPath: SPARTACUS_CORE },
  ],
};
