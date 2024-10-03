/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ORDER_DETAILS_SERVICE,
  ORDER_DETAIL_ITEMS_COMPONENT,
  PROMOTION_SERVICE,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ORDER_DETAIL_ITEMS_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/myaccount/order/order-details/order-detail-items/order-detail-items.component.ts
  class: ORDER_DETAIL_ITEMS_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    { className: ORDER_DETAILS_SERVICE, importPath: SPARTACUS_STOREFRONTLIB },
    { className: PROMOTION_SERVICE, importPath: SPARTACUS_STOREFRONTLIB },
  ],
  removeParams: [
    { className: PROMOTION_SERVICE, importPath: SPARTACUS_STOREFRONTLIB },
  ],
};
