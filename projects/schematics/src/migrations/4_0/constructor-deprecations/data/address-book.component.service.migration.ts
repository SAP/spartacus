/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ADDRESS_BOOK_COMPONENT_SERVICE,
  CHECKOUT_DELIVERY_SERVICE,
  USER_ADDRESS_SERVICE,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ADDRESS_BOOK_COMPONENT_SERVICE_MIGRATION: ConstructorDeprecation =
  {
    // projects/storefrontlib/cms-components/myaccount/address-book/address-book.component.service.ts
    class: ADDRESS_BOOK_COMPONENT_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedParams: [
      { className: USER_ADDRESS_SERVICE, importPath: SPARTACUS_CORE },
      { className: CHECKOUT_DELIVERY_SERVICE, importPath: SPARTACUS_CORE },
    ],
    removeParams: [
      { className: CHECKOUT_DELIVERY_SERVICE, importPath: SPARTACUS_CORE },
    ],
  };
