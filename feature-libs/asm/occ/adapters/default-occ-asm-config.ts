/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccAsmConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        asmCustomerSearch: '/assistedservicewebservices/customers/search',
        asmCustomerLists: '/assistedservicewebservices/customerlists',
        asmBindCart: '/assistedservicewebservices/bind-cart',
        asmCreateCustomer: '/assistedservicewebservices/customers',
      },
    },
  },
};
