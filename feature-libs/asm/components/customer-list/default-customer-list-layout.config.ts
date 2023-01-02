/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { CustomerListComponent } from './customer-list.component';

export const defaultCustomerListLayoutConfig: LayoutConfig = {
  launch: {
    ASM_CUSTOMER_LIST: {
      inlineRoot: true,
      component: CustomerListComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
