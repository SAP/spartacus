import {
  AccountSummaryDetails,
  AccountSummaryList,
  DocumentStatus
} from '@spartacus/organization/account-summary/root';

export const mockAccountSummaryList: AccountSummaryList = {
  orgDocumentTypes: [
    {
      code: 'Purchase Order',
      name: 'Purchase Order',
    },
    {
      code: 'Invoice',
      name: 'Invoice',
    },
    {
      code: 'Credit Note',
      name: 'Credit Note',
    },
    {
      code: 'Debit Note',
      name: 'Debit Note',
    },
    {
      code: 'Statement',
      name: 'Statement',
    },
  ],
  orgDocuments: [
    {
      amount: 8200511,
      createdAtDate: '2014-06-10',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      id: 'POCR-0000003',
      openAmount: 8200511,
      orgDocumentType: {
        code: 'Purchase Order',
        name: 'Purchase Order',
      },
      status: DocumentStatus.OPEN,
    },
    {
      amount: 796371,
      createdAtDate: '2014-06-10',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      dueAtDate: '2014-07-10',
      id: 'CRNCR-0000001',
      openAmount: 796371,
      orgDocumentType: {
        code: 'Invoice',
        name: 'Invoice',
      },
      status: DocumentStatus.OPEN,
    },
    {
      amount: 5094536,
      createdAtDate: '2014-06-10',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      id: 'POCR-0000002',
      openAmount: 5094536,
      attachments: {
        id: 'INPG-00100001',
      },
      orgDocumentType: {
        code: 'Purchase Order',
        name: 'Purchase Order',
      },
      status: DocumentStatus.OPEN,
    },
    {
      amount: 7851558,
      createdAtDate: '2014-06-10',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      id: 'POCR-0000001',
      openAmount: 7851558,
      attachments: {
        id: 'INPG-00100002',
      },
      orgDocumentType: {
        code: 'Purchase Order',
        name: 'Purchase Order',
      },
      status: DocumentStatus.OPEN,
    },
    {
      amount: 3175103,
      createdAtDate: '2014-06-10',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      id: 'POCR-0000004',
      openAmount: 3175103,
      orgDocumentType: {
        code: 'Purchase Order',
        name: 'Purchase Order',
      },
      status: DocumentStatus.OPEN,
    },
    {
      amount: 6929663,
      createdAtDate: '2014-06-12',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      id: 'POCR-0000006',
      openAmount: 6929663,
      orgDocumentType: {
        code: 'Purchase Order',
        name: 'Purchase Order',
      },
      status: DocumentStatus.CLOSED,
    },
    {
      amount: 7907774,
      createdAtDate: '2014-06-12',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      id: 'POCR-0000005',
      openAmount: 7907774,
      orgDocumentType: {
        code: 'Purchase Order',
        name: 'Purchase Order',
      },
      status: DocumentStatus.CLOSED,
    },
    {
      amount: 3754263,
      createdAtDate: '2014-06-18',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      id: 'POCR-0000009',
      openAmount: 3754263,
      orgDocumentType: {
        code: 'Purchase Order',
        name: 'Purchase Order',
      },
      status: DocumentStatus.OPEN,
    },
    {
      amount: 3893837,
      createdAtDate: '2014-06-18',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      id: 'POCR-0000010',
      openAmount: 3893837,
      orgDocumentType: {
        code: 'Purchase Order',
        name: 'Purchase Order',
      },
      status: DocumentStatus.OPEN,
    },
    {
      amount: 2537717,
      createdAtDate: '2014-06-18',
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      id: 'POCR-0000011',
      openAmount: 2537717,
      orgDocumentType: {
        code: 'Purchase Order',
        name: 'Purchase Order',
      },
      status: DocumentStatus.OPEN,
    },
  ],
  pagination: {
    currentPage: 0,
    pageSize: 10,
    sort: 'byCreatedAtDateAsc',
    totalPages: 6,
    totalResults: 55,
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
    email: 'carla.torres@rustic-hw.com',
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
        email: 'carla.torres@rustic-hw.com',
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
        uid: 'carla.torres@rustic-hw.com',
        active: true,
        approvers: [],
        currency: {
          active: true,
          isocode: 'USD',
          name: 'US Dollar',
          symbol: '$',
        },
        customerId: '1df2fe00-7e9c-4e7c-9598-1ae22d83979a',
        displayUid: 'carla.torres@rustic-hw.com',
        firstName: 'Carla',
        lastName: 'Torres',
        orgUnit: {
          active: true,
          costCenters: [
            {
              active: false,
              code: 'Custom_Retail',
              name: 'Custom Retail',
            },
          ],
          name: 'Custom Retail',
          uid: 'Custom Retail',
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
        name: 'Custom Retail',
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
              name: 'Custom Retail',
            },
          ],
          name: 'Custom Retail',
          uid: 'Custom Retail',
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
              name: 'Custom Retail',
            },
          ],
          name: 'Custom Retail',
          uid: 'Custom Retail',
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
              name: 'Custom Retail',
            },
          ],
          name: 'Custom Retail',
          uid: 'Custom Retail',
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
              name: 'Custom Retail',
            },
          ],
          name: 'Custom Retail',
          uid: 'Custom Retail',
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
              name: 'Custom Retail',
            },
          ],
          name: 'Custom Retail',
          uid: 'Custom Retail',
        },
        roles: ['b2bcustomergroup'],
        selected: false,
        title: 'Mr.',
        titleCode: 'mr',
      },
    ],
    name: 'Custom Retail',
    parentOrgUnit: {
      active: true,
      name: 'Rustic Retail',
      uid: 'Rustic Retail',
    },
    uid: 'Custom Retail',
  },
};
