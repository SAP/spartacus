/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ANGULAR_CORE,
  CMS_COMPONENTS_SERVICE,
  CMS_COMPONENT_DATA_CLASS,
  CMS_INJECTOR_SERVICE,
  COMPONENT_HANDLER_SERVICE,
  DYNAMIC_ATTRIBUTE_SERVICE,
  EVENT_SERVICE,
  INJECTOR,
  INNER_COMPONENTS_HOST_DIRECTIVE,
  RENDERER_2,
  VIEW_CONTAINER_REF,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const INNER_COMPONENTS_HOST_DIRECTIVE_MIGRATION: ConstructorDeprecation =
  {
    // projects/storefrontlib/cms-structure/page/component/inner-components-host.directive.ts
    class: INNER_COMPONENTS_HOST_DIRECTIVE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: CMS_COMPONENT_DATA_CLASS,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: VIEW_CONTAINER_REF,
        importPath: ANGULAR_CORE,
      },
      {
        className: CMS_COMPONENTS_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: INJECTOR,
        importPath: ANGULAR_CORE,
      },
      {
        className: DYNAMIC_ATTRIBUTE_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: RENDERER_2,
        importPath: ANGULAR_CORE,
      },
      {
        className: COMPONENT_HANDLER_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: CMS_INJECTOR_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
    addParams: [
      {
        className: EVENT_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  };
