/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ANGULAR_CORE,
  CHANGE_DETECTOR_REF,
  FORM_ERRORS_COMPONENT,
  KEY_VALUE_DIFFERS,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const FORM_ERRORS_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // /projects/storefrontlib/shared/components/form/form-errors/form-errors.component.ts
  class: FORM_ERRORS_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [],
  addParams: [
    { className: CHANGE_DETECTOR_REF, importPath: ANGULAR_CORE },
    { className: KEY_VALUE_DIFFERS, importPath: ANGULAR_CORE },
  ],
};
