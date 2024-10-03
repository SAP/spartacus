/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DYNAMIC_ATTRIBUTE_SERVICE,
  SMART_EDIT_SERVICE,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const DYNAMIC_ATTRIBUTE_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/cms/services/dynamic-attribute.service.ts
  class: DYNAMIC_ATTRIBUTE_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [],
  addParams: [
    {
      className: SMART_EDIT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
