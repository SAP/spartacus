/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ORDER_HISTORY_COMPONENT,
  ROUTING_SERVICE,
  TRANSLATION_SERVICE,
  USER_ORDER_SERVICE,
  USER_REPLENISHMENT_ORDER_SERVICE,
} from '../../../../shared/constants';
import {
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ORDER_HISTORY_COMPONENT_MIGRATION: ConstructorDeprecation = {
  //projects/storefrontlib/cms-components/myaccount/order/order-history/order-history.component.ts
  class: ORDER_HISTORY_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: USER_ORDER_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: TRANSLATION_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: USER_REPLENISHMENT_ORDER_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
