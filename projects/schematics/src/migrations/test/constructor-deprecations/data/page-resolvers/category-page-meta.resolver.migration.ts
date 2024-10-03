/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CATEGORY_PAGE_META_RESOLVER,
  CMS_SERVICE,
  PRODUCT_SEARCH_SERVICE,
  ROUTING_SERVICE,
  TRANSLATION_SERVICE,
} from '../../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../../shared/utils/file-utils';

export const CATEGORY_PAGE_META_RESOLVER_MIGRATION: ConstructorDeprecation = {
  class: CATEGORY_PAGE_META_RESOLVER,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    { className: ROUTING_SERVICE, importPath: SPARTACUS_CORE },
    { className: PRODUCT_SEARCH_SERVICE, importPath: SPARTACUS_CORE },
    { className: CMS_SERVICE, importPath: SPARTACUS_CORE },
    { className: TRANSLATION_SERVICE, importPath: SPARTACUS_CORE },
  ],
  removeParams: [
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
