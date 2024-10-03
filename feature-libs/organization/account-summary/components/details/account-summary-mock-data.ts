/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AccountSummaryDetails,
  AccountSummaryList,
  DocumentStatus,
} from '@spartacus/organization/account-summary/root';

const PURCHASE_ORDER = 'Purchase Order';
const EMAIL = 'carla.torres@rustic-hw.com';
const CUSTOM_RETAIL_NAME = 'Custom Retail';
const DATES = {
  JAN_24: '2022-01-24',
  JAN_26: '2022-01-26',
  FEB_25: '2022-02-25',
};

export const mockAccountSummaryList: AccountSummaryList = {
  orgDocumentTypes: [
    {
      code: 'PURCHASE_ORDER',
      name: PURCHASE_ORDER,
    },
    {
      code: 'INVOICE',
      name: 'Invoice',
    },
    {
      code: 'CREDIT_NOTE',
      name: 'Credit Note',
    },
    {
      code: 'DEBIT_NOTE',
      name: 'Debit Note',
    },
    {
      code: 'STATEMENT',
      name: 'Statement',
    },
  ],
  orgDocuments: [
    {
      amount: 849887,
      attachments: [],
      createdAtDate: '2021-12-10',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      dueAtDate: '2022-01-09',
      formattedAmount: '$849,887.00',
      formattedOpenAmount: '$849,887.00',
      id: 'CRNPG-0000001',
      openAmount: 849887,
      orgDocumentType: {
        code: 'INVOICE',
        name: 'Invoice',
      },
      status: DocumentStatus.OPEN,
    },
    {
      amount: 656105,
      attachments: [],
      createdAtDate: '2021-12-25',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      dueAtDate: DATES.JAN_24,
      formattedAmount: '$656,105.00',
      formattedOpenAmount: '$656,105.00',
      id: 'CRNPG-0000002',
      openAmount: 656105,
      orgDocumentType: {
        code: 'INVOICE',
        name: 'Invoice',
      },
      status: DocumentStatus.OPEN,
    },
    {
      amount: 473456,
      attachments: [],
      createdAtDate: '2022-01-18',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      dueAtDate: '2022-02-17',
      formattedAmount: '$473,456.00',
      formattedOpenAmount: '$473,456.00',
      id: 'CRNPG-0000003',
      openAmount: 473456,
      orgDocumentType: {
        code: 'INVOICE',
        name: 'Invoice',
      },
      status: DocumentStatus.OPEN,
    },
    {
      amount: 30599,
      attachments: [
        {
          id: 'POPG-00100006',
        },
      ],
      createdAtDate: DATES.JAN_24,
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      formattedAmount: '$30,599.00',
      formattedOpenAmount: '$30,599.00',
      id: 'POPG-00100006',
      openAmount: 30599,
      orgDocumentType: {
        code: 'PURCHASE_ORDER',
        name: PURCHASE_ORDER,
      },
      status: DocumentStatus.OPEN,
    },
    {
      amount: 17199,
      attachments: [
        {
          id: 'POPG-00006009',
        },
      ],
      createdAtDate: DATES.JAN_24,
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      formattedAmount: '$17,199.00',
      formattedOpenAmount: '$17,199.00',
      id: 'POPG-00006009',
      openAmount: 17199,
      orgDocumentType: {
        code: 'PURCHASE_ORDER',
        name: PURCHASE_ORDER,
      },
      status: DocumentStatus.OPEN,
    },
    {
      amount: 401614,
      attachments: [],
      createdAtDate: '2022-01-25',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      dueAtDate: '2022-02-24',
      formattedAmount: '$401,614.00',
      formattedOpenAmount: '$401,614.00',
      id: 'CRNPG-0000004',
      openAmount: 401614,
      orgDocumentType: {
        code: 'INVOICE',
        name: 'Invoice',
      },
      status: DocumentStatus.OPEN,
    },
    {
      amount: 35189,
      attachments: [
        {
          id: 'INPG-00100001',
        },
      ],
      createdAtDate: DATES.JAN_26,
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      dueAtDate: DATES.FEB_25,
      formattedAmount: '$35,189.00',
      formattedOpenAmount: '$35,189.00',
      id: 'INPG-00100001',
      openAmount: 35189,
      orgDocumentType: {
        code: 'INVOICE',
        name: 'Invoice',
      },
      status: DocumentStatus.OPEN,
    },
    {
      amount: 19779,
      attachments: [
        {
          id: 'INPG-00100002',
        },
      ],
      createdAtDate: DATES.JAN_26,
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      dueAtDate: DATES.FEB_25,
      formattedAmount: '$19,779.00',
      formattedOpenAmount: '$19,779.00',
      id: 'INPG-00100002',
      openAmount: 19779,
      orgDocumentType: {
        code: 'INVOICE',
        name: 'Invoice',
      },
      status: DocumentStatus.OPEN,
    },
    {
      amount: 21799,
      attachments: [
        {
          id: 'POPG-00006012',
        },
      ],
      createdAtDate: DATES.JAN_26,
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      formattedAmount: '$21,799.00',
      formattedOpenAmount: '$21,799.00',
      id: 'POPG-00006012',
      openAmount: 21799,
      orgDocumentType: {
        code: 'PURCHASE_ORDER',
        name: PURCHASE_ORDER,
      },
      status: DocumentStatus.OPEN,
    },
    {
      amount: 25069,
      attachments: [
        {
          id: 'INPG-00100003',
        },
      ],
      createdAtDate: DATES.JAN_26,
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      dueAtDate: DATES.FEB_25,
      formattedAmount: '$25,069.00',
      formattedOpenAmount: '$25,069.00',
      id: 'INPG-00100003',
      openAmount: 25069,
      orgDocumentType: {
        code: 'INVOICE',
        name: 'Invoice',
      },
      status: DocumentStatus.OPEN,
    },
  ],
  pagination: {
    currentPage: 0,
    pageSize: 10,
    sort: 'byCreatedAtDateAsc',
    totalPages: 6,
    totalResults: 60,
  },
  sorts: [
    {
      code: 'byCreatedAtDateAsc',
      selected: true,
    },
    {
      code: 'byCreatedAtDateDesc',
      selected: false,
    },
    {
      code: 'byDueAtDateAsc',
      selected: false,
    },
    {
      code: 'byDueAtDateDesc',
      selected: false,
    },
    {
      code: 'byOriginalAmountAsc',
      selected: false,
    },
    {
      code: 'byOriginalAmountDesc',
      selected: false,
    },
    {
      code: 'byOpenAmountAsc',
      selected: false,
    },
    {
      code: 'byOpenAmountDesc',
      selected: false,
    },
    {
      code: 'byOrgDocumentTypeAsc',
      selected: false,
    },
    {
      code: 'byOrgDocumentTypeDesc',
      selected: false,
    },
    {
      code: 'byStatusAsc',
      selected: false,
    },
    {
      code: 'byStatusDesc',
      selected: false,
    },
    {
      code: 'byOrgDocumentIdAsc',
      selected: false,
    },
    {
      code: 'byOrgDocumentIdDesc',
      selected: false,
    },
  ],
};

export const mockAccountSummaryDetails: AccountSummaryDetails = {
  accountManagerEmail: '',
  accountManagerName: 'Brandon Leclair',
  amountBalance: {
    currentBalance: '$102,145,214.00',
    dueBalances: [
      {
        amount: '$0.00',
        dayRange: {
          maxBoundary: 30,
          minBoundary: 1,
        },
      },
      {
        amount: '$212,947.00',
        dayRange: {
          maxBoundary: 60,
          minBoundary: 31,
        },
      },
      {
        amount: '$0.00',
        dayRange: {
          maxBoundary: 90,
          minBoundary: 61,
        },
      },
      {
        amount: '$33,379,071.00',
        dayRange: {
          minBoundary: 91,
        },
      },
    ],
    openBalance: '$135,737,232.00',
    pastDueBalance: '$33,592,018.00',
  },
  billingAddress: {
    country: {
      isocode: 'US',
      name: 'United States',
    },
    defaultAddress: false,
    email: EMAIL,
    firstName: 'Carla',
    formattedAddress: '1000 Bagby Street, Houston, Texas',
    id: '8796098986007',
    lastName: 'Torres',
    line1: '1000 Bagby Street',
    postalCode: 'Texas',
    shippingAddress: true,
    title: 'Ms.',
    titleCode: 'ms',
    town: 'Houston',
    visibleInAddressBook: true,
  },
  creditLimit: '$15,000.00',
  orgUnit: {
    active: true,
    addresses: [
      {
        country: {
          isocode: 'US',
          name: 'United States',
        },
        defaultAddress: false,
        email: EMAIL,
        firstName: 'Carla',
        formattedAddress: '1000 Bagby Street, Houston, Texas',
        id: '8796098986007',
        lastName: 'Torres',
        line1: '1000 Bagby Street',
        postalCode: 'Texas',
        shippingAddress: true,
        title: 'Ms.',
        titleCode: 'ms',
        town: 'Houston',
        visibleInAddressBook: true,
      },
    ],
    approvers: [
      {
        name: 'Carla Torres',
        uid: EMAIL,
        active: true,
        approvers: [],
        currency: {
          active: true,
          isocode: 'USD',
          name: 'US Dollar',
          symbol: '$',
        },
        customerId: '1df2fe00-7e9c-4e7c-9598-1ae22d83979a',
        displayUid: EMAIL,
        firstName: 'Carla',
        lastName: 'Torres',
        orgUnit: {
          active: true,
          costCenters: [
            {
              active: false,
              code: 'Custom_Retail',
              name: CUSTOM_RETAIL_NAME,
            },
          ],
          name: CUSTOM_RETAIL_NAME,
          uid: CUSTOM_RETAIL_NAME,
        },
        roles: ['b2bapprovergroup'],
        selected: false,
        title: 'Ms.',
        titleCode: 'ms',
      },
    ],
    costCenters: [
      {
        active: true,
        code: 'Custom_Retail',
        currency: {
          active: true,
          isocode: 'USD',
          name: 'US Dollar',
          symbol: '$',
        },
        name: CUSTOM_RETAIL_NAME,
      },
    ],
    customers: [
      {
        name: 'Anthony Lombardi',
        uid: 'anthony.lombardi@rustic-hw.com',
        active: true,
        approvers: [],
        currency: {
          active: true,
          isocode: 'USD',
          name: 'US Dollar',
          symbol: '$',
        },
        customerId: 'f455605a-0a14-48aa-a48d-a7842337aba9',
        displayUid: 'anthony.lombardi@rustic-hw.com',
        firstName: 'Anthony',
        lastName: 'Lombardi',
        orgUnit: {
          active: true,
          costCenters: [
            {
              active: false,
              code: 'Custom_Retail',
              name: CUSTOM_RETAIL_NAME,
            },
          ],
          name: CUSTOM_RETAIL_NAME,
          uid: CUSTOM_RETAIL_NAME,
        },
        roles: ['b2bcustomergroup'],
        selected: false,
        title: 'Mr.',
        titleCode: 'mr',
      },
      {
        name: 'Mark Rivers',
        uid: 'mark.rivers@rustic-hw.com',
        active: true,
        approvers: [],
        currency: {
          active: true,
          isocode: 'USD',
          name: 'US Dollar',
          symbol: '$',
        },
        customerId: '0d18b584-c604-477a-8f75-6c211aeeaeb5',
        displayUid: 'mark.rivers@rustic-hw.com',
        firstName: 'Mark',
        lastName: 'Rivers',
        orgUnit: {
          active: true,
          costCenters: [
            {
              active: false,
              code: 'Custom_Retail',
              name: CUSTOM_RETAIL_NAME,
            },
          ],
          name: CUSTOM_RETAIL_NAME,
          uid: CUSTOM_RETAIL_NAME,
        },
        roles: ['b2bcustomergroup'],
        selected: false,
        title: 'Mr.',
        titleCode: 'mr',
      },
      {
        name: 'William Hunter',
        uid: 'william.hunter@rustic-hw.com',
        active: true,
        approvers: [],
        currency: {
          active: true,
          isocode: 'USD',
          name: 'US Dollar',
          symbol: '$',
        },
        customerId: '2b1d2812-e5e5-47f4-accf-96e67b76d4e7',
        displayUid: 'william.hunter@rustic-hw.com',
        firstName: 'William',
        lastName: 'Hunter',
        orgUnit: {
          active: true,
          costCenters: [
            {
              active: false,
              code: 'Custom_Retail',
              name: CUSTOM_RETAIL_NAME,
            },
          ],
          name: CUSTOM_RETAIL_NAME,
          uid: CUSTOM_RETAIL_NAME,
        },
        roles: ['b2bcustomergroup'],
        selected: false,
        title: 'Mr.',
        titleCode: 'mr',
      },
      {
        name: 'Marie Dubois',
        uid: 'marie.dubois@rustic-hw.com',
        active: true,
        approvers: [],
        currency: {
          active: true,
          isocode: 'USD',
          name: 'US Dollar',
          symbol: '$',
        },
        customerId: '6cc8aa65-11cb-430c-ac3e-261c3c660ab3',
        displayUid: 'marie.dubois@rustic-hw.com',
        firstName: 'Marie',
        lastName: 'Dubois',
        orgUnit: {
          active: true,
          costCenters: [
            {
              active: false,
              code: 'Custom_Retail',
              name: CUSTOM_RETAIL_NAME,
            },
          ],
          name: CUSTOM_RETAIL_NAME,
          uid: CUSTOM_RETAIL_NAME,
        },
        roles: ['b2bcustomergroup'],
        selected: false,
        title: 'Ms.',
        titleCode: 'ms',
      },
      {
        name: 'Axel Krause',
        uid: 'axel.krause@rustic-hw.com',
        active: true,
        approvers: [],
        currency: {
          active: true,
          isocode: 'USD',
          name: 'US Dollar',
          symbol: '$',
        },
        customerId: '40bb80e4-9d88-4553-a036-a5ee65de3d09',
        displayUid: 'axel.krause@rustic-hw.com',
        firstName: 'Axel',
        lastName: 'Krause',
        orgUnit: {
          active: true,
          costCenters: [
            {
              active: false,
              code: 'Custom_Retail',
              name: CUSTOM_RETAIL_NAME,
            },
          ],
          name: CUSTOM_RETAIL_NAME,
          uid: CUSTOM_RETAIL_NAME,
        },
        roles: ['b2bcustomergroup'],
        selected: false,
        title: 'Mr.',
        titleCode: 'mr',
      },
    ],
    name: CUSTOM_RETAIL_NAME,
    parentOrgUnit: {
      active: true,
      name: 'Rustic Retail',
      uid: 'Rustic Retail',
    },
    uid: CUSTOM_RETAIL_NAME,
  },
};
