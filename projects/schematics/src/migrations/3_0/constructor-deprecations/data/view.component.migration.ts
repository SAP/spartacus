/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CHANGE_DETECTOR_REF,
  ELEMENT_REF,
  SPLIT_VIEW_SERVICE,
  VIEW_COMPONENT,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const VIEW_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/shared/components/split-view/view/view.component.ts
  class: VIEW_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: SPLIT_VIEW_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: ELEMENT_REF,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: CHANGE_DETECTOR_REF,
      importPath: SPARTACUS_CORE,
    },
  ],
};
