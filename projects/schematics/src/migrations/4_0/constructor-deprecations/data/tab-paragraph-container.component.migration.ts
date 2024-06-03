/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BREAKPOINT_SERVICE,
  CMS_COMPONENT_DATA_CLASS,
  CMS_SERVICE,
  TAB_PARAGRAPH_CONTAINER_COMPONENT,
  WINDOW_REF,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const TAB_PARAGRAPH_CONTAINER_COMPONENT_CONSTRUCTOR_DEPRECATION: ConstructorDeprecation =
  {
    // projects/storefrontlib/cms-components/content/tab-paragraph-container/tab-paragraph-container.component.ts
    class: TAB_PARAGRAPH_CONTAINER_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CMS_COMPONENT_DATA_CLASS,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      { className: CMS_SERVICE, importPath: SPARTACUS_CORE },
      {
        className: WINDOW_REF,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: BREAKPOINT_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
  };

export const TAB_PARAGRAPH_CONTAINER_COMPONENT_CONSTRUCTOR_DEPRECATION_2: ConstructorDeprecation =
  {
    // projects/storefrontlib/cms-components/content/tab-paragraph-container/tab-paragraph-container.component.ts
    class: TAB_PARAGRAPH_CONTAINER_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CMS_COMPONENT_DATA_CLASS,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      { className: CMS_SERVICE, importPath: SPARTACUS_CORE },
    ],
    addParams: [
      {
        className: WINDOW_REF,
        importPath: SPARTACUS_CORE,
      },
      {
        className: BREAKPOINT_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
  };
