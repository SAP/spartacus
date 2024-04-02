/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BASE_PAGE_META_RESOLVER,
  CONTENT_PAGE_META_RESOLVER,
  ORGANIZATION_PAGE_META_RESOLVER,
  ROUTING_SERVICE,
  SEMANTIC_PATH_SERVICE,
  TRANSLATION_SERVICE,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ORGANIZATION_PAGE_META_RESOLVER_MIGRATION: ConstructorDeprecation =
  {
    class: ORGANIZATION_PAGE_META_RESOLVER,
    importPath: SPARTACUS_CORE,
    deprecatedParams: [
      { className: CONTENT_PAGE_META_RESOLVER, importPath: SPARTACUS_CORE },
      { className: TRANSLATION_SERVICE, importPath: SPARTACUS_CORE },
      { className: SEMANTIC_PATH_SERVICE, importPath: SPARTACUS_CORE },
      { className: ROUTING_SERVICE, importPath: SPARTACUS_CORE },
      { className: BASE_PAGE_META_RESOLVER, importPath: SPARTACUS_CORE },
    ],
    removeParams: [
      { className: BASE_PAGE_META_RESOLVER, importPath: SPARTACUS_CORE },
    ],
  };
