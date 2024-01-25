/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ANGULAR_CORE,
  ANGULAR_PLATFORM_BROWSER,
  DOM_SANITIZER,
  JSON_LD_SCRIPT_FACTORY,
  RENDERER_2,
  WINDOW_REF,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const JSON_LD_DIRECTIVE_CONSTRUCTOR_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-structure/seo/structured-data/json-ld.directive.ts
  class: JSON_LD_SCRIPT_FACTORY,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: JSON_LD_SCRIPT_FACTORY,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: DOM_SANITIZER,
      importPath: ANGULAR_PLATFORM_BROWSER,
    },
  ],
  addParams: [
    {
      className: WINDOW_REF,
      importPath: SPARTACUS_CORE,
    },
    {
      className: RENDERER_2,
      importPath: ANGULAR_CORE,
    },
  ],
  removeParams: [
    {
      className: DOM_SANITIZER,
      importPath: ANGULAR_PLATFORM_BROWSER,
    },
  ],
};
