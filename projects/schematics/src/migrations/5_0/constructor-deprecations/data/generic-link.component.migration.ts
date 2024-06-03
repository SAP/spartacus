/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ANGULAR_ROUTER,
  GENERIC_LINK_COMPONENT,
  GENERIC_LINK_COMPONENT_SERVICE,
  ROUTER,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const GENERIC_LINK_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/shared/components/generic-link/generic-link.component.ts
  class: GENERIC_LINK_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [{ className: ROUTER, importPath: ANGULAR_ROUTER }],
  addParams: [
    {
      className: GENERIC_LINK_COMPONENT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
