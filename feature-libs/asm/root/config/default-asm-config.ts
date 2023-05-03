/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
          headerLocalizationKey: 'asm.customerList.tableHeader.cart',
          icon: {
            symbol: ICON_TYPE.CART,
            captionLocalizationKey: 'asm.customerList.tableHeader.cart',
          },
          actionType: CustomerListColumnActionType.ACTIVE_CART,
        },
        {
          headerLocalizationKey: 'asm.customerList.tableHeader.order',
          icon: {
            symbol: ICON_TYPE.ORDER,
            captionLocalizationKey: 'asm.customerList.tableHeader.order',
          },
          actionType: CustomerListColumnActionType.ORDER_HISTORY,
        },
      ],
    },
  },
};
