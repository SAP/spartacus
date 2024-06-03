/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ANGULAR_COMMON,
  ANY_TYPE,
  DOCUMENT,
  DOCUMENT_STRING,
  STORE_DATA_SERVICE,
  STORE_FINDER_LIST_COMPONENT,
  STORE_FINDER_SERVICE,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFINDER } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const STORE_FINDER_LIST_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // feature-libs/storefinder/components/store-finder-search-result/store-finder-list/store-finder-list.component.ts
  class: STORE_FINDER_LIST_COMPONENT,
  importPath: SPARTACUS_STOREFINDER,
  deprecatedParams: [
    {
      className: STORE_DATA_SERVICE,
      importPath: SPARTACUS_STOREFINDER,
    },
    {
      className: DOCUMENT,
      literalInference: ANY_TYPE,
      injectionToken: {
        token: DOCUMENT_STRING,
        importPath: ANGULAR_COMMON,
      },
    },
  ],
  removeParams: [
    {
      className: STORE_DATA_SERVICE,
      importPath: SPARTACUS_STOREFINDER,
    },
    {
      className: DOCUMENT,
      literalInference: ANY_TYPE,
      injectionToken: {
        token: DOCUMENT_STRING,
        importPath: ANGULAR_COMMON,
      },
    },
  ],
  addParams: [
    {
      className: STORE_FINDER_SERVICE,
      importPath: SPARTACUS_STOREFINDER,
    },
    {
      className: DOCUMENT,
      literalInference: ANY_TYPE,
      injectionToken: {
        token: DOCUMENT_STRING,
        importPath: ANGULAR_COMMON,
      },
    },
  ],
};
