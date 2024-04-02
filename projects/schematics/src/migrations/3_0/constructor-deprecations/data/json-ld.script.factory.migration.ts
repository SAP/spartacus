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
  RENDERER_FACTORY_2,
  SEO_CONFIG,
  WINDOW_REF,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const JSON_LD_SCRIPT_FACTORY_CONSTRUCTOR_MIGRATION: ConstructorDeprecation =
  {
    // projects/storefrontlib/cms-structure/seo/structured-data/json-ld-script.factory.ts
    class: JSON_LD_SCRIPT_FACTORY,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: WINDOW_REF,
        importPath: SPARTACUS_CORE,
      },
      {
        className: RENDERER_FACTORY_2,
        importPath: ANGULAR_CORE,
      },
      {
        className: DOM_SANITIZER,
        importPath: ANGULAR_PLATFORM_BROWSER,
      },
    ],
    addParams: [
      {
        className: SEO_CONFIG,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
  };
