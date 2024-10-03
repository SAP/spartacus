/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ACTIVATED_ROUTE,
  ANGULAR_ROUTER,
  CHECKOUT_CONFIG_SERVICE,
  LOGIN_REGISTER_COMPONENT,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_USER,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const LOGIN_REGISTER_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // feature-libs/user/account/components/login-register/login-register.component.ts
  class: LOGIN_REGISTER_COMPONENT,
  importPath: SPARTACUS_USER,
  deprecatedParams: [
    { className: CHECKOUT_CONFIG_SERVICE, importPath: SPARTACUS_CORE },
    { className: ACTIVATED_ROUTE, importPath: ANGULAR_ROUTER },
  ],
  removeParams: [
    { className: CHECKOUT_CONFIG_SERVICE, importPath: SPARTACUS_CORE },
  ],
};
