/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  UNIT_ADDRESS_FORM_SERVICE,
  USER_ADDRESS_SERVICE,
  USER_PROFILE_FACADE,
  USER_SERVICE,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
  SPARTACUS_USER_PROFILE_ROOT,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const UNIT_ADDRESS_FORM_SERVICE_MIGRATION: ConstructorDeprecation = {
  // feature-libs/organization/administration/components/unit/links/addresses/form/unit-address-form.service.ts
  class: UNIT_ADDRESS_FORM_SERVICE,
  importPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
  deprecatedParams: [
    { className: USER_ADDRESS_SERVICE, importPath: SPARTACUS_CORE },
    { className: USER_SERVICE, importPath: SPARTACUS_CORE },
  ],
  removeParams: [{ className: USER_SERVICE, importPath: SPARTACUS_CORE }],
  addParams: [
    { className: USER_PROFILE_FACADE, importPath: SPARTACUS_USER_PROFILE_ROOT },
  ],
};
