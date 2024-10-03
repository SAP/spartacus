/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ACTIVE_CART_SERVICE,
  BASE_PAGE_META_RESOLVER,
  CHECKOUT_PAGE_META_RESOLVER,
  TRANSLATION_SERVICE,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CHECKOUT_PAGE_META_RESOLVER_MIGRATION: ConstructorDeprecation = {
  class: CHECKOUT_PAGE_META_RESOLVER,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    { className: TRANSLATION_SERVICE, importPath: SPARTACUS_CORE },
    { className: ACTIVE_CART_SERVICE, importPath: SPARTACUS_CORE },
  ],
  addParams: [
    { className: BASE_PAGE_META_RESOLVER, importPath: SPARTACUS_CORE },
  ],
};
