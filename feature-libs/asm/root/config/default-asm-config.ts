/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ICON_TYPE } from '@spartacus/storefront';
import { CustomerListColumnActionType } from '../model/customer-list.model';
import { AsmConfig } from './asm-config';

export const defaultAsmConfig: AsmConfig = {
  asm: {
    agentSessionTimer: {
      startingDelayInSeconds: 600,
    },
    customerSearch: {
      maxResults: 20,
    },
    customerList: {
      pageSize: 5,
      showAvatar: true,
      columns: [
        {
          headerLocalizationKey: 'asm.customerList.tableHeader.customer',
          renderer: (customer) => {
            return customer?.name ?? '';
          },
          actionType: CustomerListColumnActionType.START_SESSION,
        },
        {
          headerLocalizationKey: 'asm.customerList.tableHeader.email',
          renderer: (customer) => {
            return customer?.uid ?? '';
          },
        },
        {
          headerLocalizationKey: 'asm.customerList.tableHeader.phone',
          renderer: (customer) => {
            return customer?.defaultAddress?.phone ?? '';
          },
        },
        {
          headerLocalizationKey: 'asm.customerList.tableHeader.account',
          renderer: (customer) => {
            return customer?.orgUnit?.name ?? '';
          },
        },
        {
          headerLocalizationKey: 'asm.customerList.tableHeader.activeCart',
          icon: {
            symbol: ICON_TYPE.CART,
            captionLocalizationKey:
              'asm.customerList.tableHeader.viewActiveCart',
          },
          actionType: CustomerListColumnActionType.ACTIVE_CART,
        },
        {
          headerLocalizationKey: 'asm.customerList.tableHeader.orders',
          icon: {
            symbol: ICON_TYPE.C360_INVOICE,
            captionLocalizationKey: 'asm.customerList.tableHeader.viewOrders',
          },
          actionType: CustomerListColumnActionType.ORDER_HISTORY,
        },
        {
          headerLocalizationKey: 'asm.customerList.tableHeader.customer360',
          icon: {
            symbol: ICON_TYPE.C360_CIRCLE_USER,
            captionLocalizationKey:
              'asm.customerList.tableHeader.viewCustomer360',
          },
          actionType: CustomerListColumnActionType.CUSTOMER_360,
        },
      ],
    },
    userIdHttpHeader: {
      enable: true,
    },
  },
};
