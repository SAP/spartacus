/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ANGULAR_CORE,
  ELEMENT_REF,
  RENDERER_2,
  STAR_RATING_COMPONENT,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const STAR_RATING_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects\storefrontlib\src\shared\components\star-rating\star-rating.component.ts
  class: STAR_RATING_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: ELEMENT_REF,
      importPath: ANGULAR_CORE,
    },
    {
      className: RENDERER_2,
      importPath: ANGULAR_CORE,
    },
  ],
  removeParams: [
    {
      className: ELEMENT_REF,
      importPath: ANGULAR_CORE,
    },
    {
      className: RENDERER_2,
      importPath: ANGULAR_CORE,
    },
  ],
};
