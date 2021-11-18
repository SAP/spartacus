import { AccountData } from '../support/require-logged-in.commands';

export const ORDER_CODE = '00000001';

export const b2bApprover = {
  name: 'Hanna Schmidt',
  uid: 'hanna.schmidt@rustic-hw.com',
};
export const b2bUser = {
  name: 'William Hunter',
  uid: 'william.hunter@rustic-hw.com',
};

export const b2bUserAccount: AccountData = {
  user: '',
  registrationData: {
    firstName: '',
    lastName: '',
    password: 'pw4all',
    titleCode: 'mr',
    email: b2bUser.uid,
  },
};

export const b2bApproverAccount: AccountData = {
  user: '',
  registrationData: {
    firstName: '',
    lastName: '',
    password: 'pw4all',
    titleCode: 'mr',
    email: b2bApprover.uid,
  },
};

export const statusPendingApproval = 'Pending Approval';
export const orderPlacedDate = 'October 7, 2020';
export const none = 'None';

export const pendingOrderPermissionResults = [
  {
    approverName: b2bApprover.name,
    permissionType: {
      code: 'B2BBudgetExceededPermission',
      name: 'Budget Exceeded Permission',
    },
    statusDisplay: 'pending.approval',
  },
  {
    approverName: b2bApprover.name,
    permissionType: {
      code: 'B2BOrderThresholdPermission',
      name: 'Allowed Order Threshold (per order)',
    },
    statusDisplay: 'pending.approval',
  },
];

export const rejectedOrderPermissionResults = [
  {
    approverName: b2bApprover.name,
    approverNotes: 'test rejection',
    permissionType: {
      code: 'B2BOrderThresholdPermission',
      name: 'Allowed Order Threshold (per order)',
    },
    statusDisplay: 'Rejected',
  },
  {
    approverName: b2bApprover.name,
    approverNotes: 'test rejection',
    permissionType: {
      code: 'B2BBudgetExceededPermission',
      name: 'Budget Exceeded Permission',
    },
    statusDisplay: 'Rejected',
  },
];

export const approvedOrderPermissionResults = [
  {
    approverName: b2bApprover.name,
    approverNotes: 'test approval',
    permissionType: {
      code: 'B2BBudgetExceededPermission',
      name: 'Budget Exceeded Permission',
    },
    statusDisplay: 'Approved',
  },
  {
    approverName: b2bApprover.name,
    approverNotes: 'test approval',
    permissionType: {
      code: 'B2BOrderThresholdPermission',
      name: 'Allowed Order Threshold (per order)',
    },
    statusDisplay: 'Approved',
  },
];

const pendingOrder_raw = JSON.parse(`
{
  "type" : "orderWsDTO",
  "appliedOrderPromotions" : [ ],
  "appliedProductPromotions" : [ ],
  "appliedVouchers" : [ ],
  "calculated" : true,
  "code" : "00002437",
  "deliveryAddress" : {
     "country" : {
        "isocode" : "US",
        "name" : "United States"
     },
     "defaultAddress" : false,
     "email" : "carla.torres@rustic-hw.com",
     "firstName" : "Carla",
     "formattedAddress" : "1000 Bagby Street, Houston, Texas",
     "id" : "8796300410903",
     "lastName" : "Torres",
     "line1" : "1000 Bagby Street",
     "postalCode" : "Texas",
     "shippingAddress" : true,
     "title" : "Ms.",
     "titleCode" : "ms",
     "town" : "Houston",
     "visibleInAddressBook" : true
  },
  "deliveryCost" : {
     "currencyIso" : "USD",
     "formattedValue" : "$9.99",
     "priceType" : "BUY",
     "value" : 9.99
  },
  "deliveryItemsQuantity" : 100,
  "deliveryMode" : {
     "code" : "standard-net",
     "deliveryCost" : {
        "currencyIso" : "USD",
        "formattedValue" : "$9.99",
        "priceType" : "BUY",
        "value" : 9.99
     },
     "description" : "3-5 business days",
     "name" : "Standard Delivery"
  },
  "entries" : [ {
     "basePrice" : {
        "currencyIso" : "USD",
        "formattedValue" : "$55.00",
        "priceType" : "BUY",
        "value" : 55.0
     },
     "cancellableQuantity" : 100,
     "configurationInfos" : [ ],
     "entryNumber" : 0,
     "product" : {
        "availableForPickup" : false,
        "baseOptions" : [ ],
        "categories" : [ {
           "code" : "1595",
           "name" : "Angle Grinders",
           "url" : "/Open-Catalogue/Tools/Angle-Grinders/c/1595"
        }, {
           "code" : "brand_4439",
           "name" : "Einhell",
           "url" : "/Brands/Einhell/c/brand_4439"
        } ],
        "code" : "3881018",
        "configurable" : false,
        "manufacturer" : "Einhell",
        "name" : "Angle Grinder RT-AG 115",
        "purchasable" : true,
        "stock" : {
           "isValueRounded" : false,
           "stockLevel" : 193,
           "stockLevelStatus" : "inStock"
        },
        "url" : "/Open-Catalogue/Tools/Angle-Grinders/Angle-Grinder-RT-AG-115/p/3881018"
     },
     "quantity" : 100,
     "returnableQuantity" : 0,
     "statusSummaryList" : [ ],
     "totalPrice" : {
        "currencyIso" : "USD",
        "formattedValue" : "$5,500.00",
        "priceType" : "BUY",
        "value" : 5500.0
     },
     "updateable" : true
  } ],
  "guid" : "b3fbefd0-8218-4113-8cfb-32337dfc6de4",
  "net" : true,
  "orderDiscounts" : {
     "currencyIso" : "USD",
     "formattedValue" : "$0.00",
     "priceType" : "BUY",
     "value" : 0.0
  },
  "pickupItemsQuantity" : 0,
  "pickupOrderGroups" : [ ],
  "productDiscounts" : {
     "currencyIso" : "USD",
     "formattedValue" : "$0.00",
     "priceType" : "BUY",
     "value" : 0.0
  },
  "site" : "powertools-spa",
  "store" : "powertools",
  "subTotal" : {
     "currencyIso" : "USD",
     "formattedValue" : "$5,500.00",
     "priceType" : "BUY",
     "value" : 5500.0
  },
  "totalDiscounts" : {
     "currencyIso" : "USD",
     "formattedValue" : "$0.00",
     "priceType" : "BUY",
     "value" : 0.0
  },
  "totalItems" : 1,
  "totalPrice" : {
     "currencyIso" : "USD",
     "formattedValue" : "$5,509.99",
     "priceType" : "BUY",
     "value" : 5509.99
  },
  "totalPriceWithTax" : {
     "currencyIso" : "USD",
     "formattedValue" : "$5,509.99",
     "priceType" : "BUY",
     "value" : 5509.99
  },
  "totalTax" : {
     "currencyIso" : "USD",
     "formattedValue" : "$0.00",
     "priceType" : "BUY",
     "value" : 0.0
  },
  "cancellable" : true,
  "consignments" : [ ],
  "created" : "2021-02-23T21:08:21+0000",
  "guestCustomer" : false,
  "permissionResults" : [ {
     "approverName" : "Hanna Schmidt",
     "permissionType" : {
        "code" : "B2BBudgetExceededPermission",
        "name" : "Budget Exceeded Permission"
     },
     "statusDisplay" : "Pending Approval"
  }, {
     "approverName" : "Hanna Schmidt",
     "permissionType" : {
        "code" : "B2BOrderThresholdPermission",
        "name" : "Allowed Order Threshold (per order)"
     },
     "statusDisplay" : "Pending Approval"
  } ],
  "purchaseOrderNumber" : "123",
  "returnable" : false,
  "status" : "PENDING_APPROVAL",
  "statusDisplay" : "pending.approval",
  "totalUnitCount" : 100
}
`);

export const pendingOrder = {
  ...pendingOrder_raw,
  code: ORDER_CODE,
  permissionResults: pendingOrderPermissionResults,
};

export const approvalOrderList = {
  orderApprovals: [
    {
      approvalDecisionRequired: false,
      code: 'testCode',
      order: {
        totalPrice: {
          formattedValue: '$5,509.99',
        },
        code: ORDER_CODE,
        created: '2020-10-07T21:15:27+0000',
        statusDisplay: 'pending.approval',
        orgCustomer: {
          uid: b2bUser.uid,
          name: b2bUser.name,
        },
      },
    },
  ],
  pagination: {
    currentPage: 0,
    pageSize: 5,
    sort: 'byDate',
    totalPages: 1,
    totalResults: 1,
  },
  sorts: [
    { code: 'byDate', selected: true },
    { code: 'byOrderNumber', selected: false },
  ],
};

export const approvalOrderDetail = {
  approvalDecisionRequired: true,
  code: 'testCode',
  customerOrderApprovalRecords: [
    {
      approver: {
        name: 'Administrator',
        uid: 'admin',
      },
      comments:
        'Submitted for approval, the order exceeds customer permission(s): B2B Budget Exceeded Permission,Allowed Order Threshold (per order)',
      permissionTypes: [
        {
          code: 'B2BBudgetExceededPermission',
          name: 'Budget Exceeded Permission',
        },
        {
          code: 'B2BOrderThresholdPermission',
          name: 'Allowed Order Threshold (per order)',
        },
      ],
      statusDisplay: 'pending.approval',
    },
  ],
  order: {
    appliedOrderPromotions: [],
    appliedProductPromotions: [],
    appliedVouchers: [],
    calculated: true,
    code: '00000171',
    deliveryAddress: {
      country: {
        isocode: 'US',
        name: 'United States',
      },
      defaultAddress: false,
      email: 'carla.torres@rustic-hw.com',
      firstName: 'Carla',
      formattedAddress: '1000 Bagby Street, Houston, Texas',
      id: '8796102230039',
      lastName: 'Torres',
      line1: '1000 Bagby Street',
      postalCode: 'Texas',
      shippingAddress: true,
      title: 'Ms.',
      titleCode: 'ms',
      town: 'Houston',
      visibleInAddressBook: true,
    },
    deliveryCost: {
      currencyIso: 'USD',
      formattedValue: '$9.99',
      priceType: 'BUY',
      value: 9.99,
    },
    deliveryItemsQuantity: 100,
    deliveryMode: {
      code: 'standard-net',
      deliveryCost: {
        currencyIso: 'USD',
        formattedValue: '$9.99',
        priceType: 'BUY',
        value: 9.99,
      },
      description: '3-5 business days',
      name: 'Standard Delivery',
    },
    deliveryOrderGroups: [
      {
        entries: [
          {
            basePrice: {
              currencyIso: 'USD',
              formattedValue: '$55.00',
              priceType: 'BUY',
              value: 55.0,
            },
            cancellableQuantity: 100,
            configurationInfos: [],
            entryNumber: 0,
            product: {
              availableForPickup: false,
              baseOptions: [],
              categories: [
                {
                  code: '1595',
                  name: 'Angle Grinders',
                  url: '/Open-Catalogue/Tools/Angle-Grinders/c/1595',
                },
                {
                  code: 'brand_4439',
                  name: 'Einhell',
                  url: '/Brands/Einhell/c/brand_4439',
                },
              ],
              code: '3881018',
              configurable: false,
              images: [
                {
                  altText: 'Angle Grinder RT-AG 115',
                  format: 'zoom',
                  imageType: 'PRIMARY',
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3wyNDk4OHxpbWFnZS9qcGVnfGltYWdlcy9oMDcvaGIwLzg3OTYyMzQyMTk1NTAuanBnfDQ1ZGQzMmNmOGEzMTczMjQ5ZjUzOWM5MTc2MmIyZDkyNTUyNmFiMmIzYzA0Y2NjYjY1OTEwYTEyMjJmY2UyNDg',
                },
                {
                  altText: 'Angle Grinder RT-AG 115',
                  format: 'product',
                  imageType: 'PRIMARY',
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMTY4NXxpbWFnZS9qcGVnfGltYWdlcy9oYzUvaDM1Lzg3OTYyNjE0ODI1MjYuanBnfGFiMzM3ZDI1MWQ5YWRjNTg3NWUxNjNhY2U4NTNhYTdhYzJiOTBiYzE2YTg4NjQ4ZDQxMjkzNWMyNDM1NDE3MTc',
                },
                {
                  altText: 'Angle Grinder RT-AG 115',
                  format: 'thumbnail',
                  imageType: 'PRIMARY',
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3wyNDEzfGltYWdlL2pwZWd8aW1hZ2VzL2g1OS9oMDcvODc5NjI4ODc0NTUwMi5qcGd8YjA2ZTk2ZWY1OWQ4NWY4ZTQyMThjMGZkZDgwNjZmOTVkOTZmN2U3YTA1NzIxNDlhY2EyZjQ2NDM3ZmUwMTUzNw',
                },
                {
                  altText: 'Angle Grinder RT-AG 115',
                  format: 'cartIcon',
                  imageType: 'PRIMARY',
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3wxNDU1fGltYWdlL2pwZWd8aW1hZ2VzL2hiZC9oYzkvODc5NjMxNjAwODQ3OC5qcGd8ZjFmNzU4OTA0NTg2ZGI2NGIxZjdjNzU4MDVkNmNlNTg3NDc5ODUwZDk1NzIwZWM0M2NkZWZjOGIxMDViMTU3Yw',
                },
              ],
              manufacturer: 'Einhell',
              name: 'Angle Grinder RT-AG 115',
              purchasable: true,
              stock: {
                isValueRounded: false,
                stockLevel: 193,
                stockLevelStatus: 'inStock',
              },
              url: '/Open-Catalogue/Tools/Angle-Grinders/Angle-Grinder-RT-AG-115/p/3881018',
            },
            quantity: 100,
            returnableQuantity: 0,
            statusSummaryList: [],
            totalPrice: {
              currencyIso: 'USD',
              formattedValue: '$5,500.00',
              priceType: 'BUY',
              value: 5500.0,
            },
            updateable: true,
          },
        ],
        totalPriceWithTax: {
          currencyIso: 'USD',
          formattedValue: '$5,500.00',
          priceType: 'BUY',
          value: 5500.0,
        },
      },
    ],
    entries: [
      {
        basePrice: {
          currencyIso: 'USD',
          formattedValue: '$55.00',
          priceType: 'BUY',
          value: 55.0,
        },
        cancellableQuantity: 100,
        configurationInfos: [],
        entryNumber: 0,
        product: {
          availableForPickup: false,
          baseOptions: [],
          categories: [
            {
              code: '1595',
              name: 'Angle Grinders',
              url: '/Open-Catalogue/Tools/Angle-Grinders/c/1595',
            },
            {
              code: 'brand_4439',
              name: 'Einhell',
              url: '/Brands/Einhell/c/brand_4439',
            },
          ],
          code: '3881018',
          configurable: false,
          images: [
            {
              altText: 'Angle Grinder RT-AG 115',
              format: 'zoom',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyNDk4OHxpbWFnZS9qcGVnfGltYWdlcy9oMDcvaGIwLzg3OTYyMzQyMTk1NTAuanBnfDQ1ZGQzMmNmOGEzMTczMjQ5ZjUzOWM5MTc2MmIyZDkyNTUyNmFiMmIzYzA0Y2NjYjY1OTEwYTEyMjJmY2UyNDg',
            },
            {
              altText: 'Angle Grinder RT-AG 115',
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMTY4NXxpbWFnZS9qcGVnfGltYWdlcy9oYzUvaDM1Lzg3OTYyNjE0ODI1MjYuanBnfGFiMzM3ZDI1MWQ5YWRjNTg3NWUxNjNhY2U4NTNhYTdhYzJiOTBiYzE2YTg4NjQ4ZDQxMjkzNWMyNDM1NDE3MTc',
            },
            {
              altText: 'Angle Grinder RT-AG 115',
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyNDEzfGltYWdlL2pwZWd8aW1hZ2VzL2g1OS9oMDcvODc5NjI4ODc0NTUwMi5qcGd8YjA2ZTk2ZWY1OWQ4NWY4ZTQyMThjMGZkZDgwNjZmOTVkOTZmN2U3YTA1NzIxNDlhY2EyZjQ2NDM3ZmUwMTUzNw',
            },
            {
              altText: 'Angle Grinder RT-AG 115',
              format: 'cartIcon',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxNDU1fGltYWdlL2pwZWd8aW1hZ2VzL2hiZC9oYzkvODc5NjMxNjAwODQ3OC5qcGd8ZjFmNzU4OTA0NTg2ZGI2NGIxZjdjNzU4MDVkNmNlNTg3NDc5ODUwZDk1NzIwZWM0M2NkZWZjOGIxMDViMTU3Yw',
            },
          ],
          manufacturer: 'Einhell',
          name: 'Angle Grinder RT-AG 115',
          purchasable: true,
          stock: {
            isValueRounded: false,
            stockLevel: 193,
            stockLevelStatus: 'inStock',
          },
          url: '/Open-Catalogue/Tools/Angle-Grinders/Angle-Grinder-RT-AG-115/p/3881018',
        },
        quantity: 100,
        returnableQuantity: 0,
        statusSummaryList: [],
        totalPrice: {
          currencyIso: 'USD',
          formattedValue: '$5,500.00',
          priceType: 'BUY',
          value: 5500.0,
        },
        updateable: true,
      },
    ],
    guid: 'f67b2f0e-f22e-480e-a58b-d13ed8bcf7a5',
    net: true,
    orderDiscounts: {
      currencyIso: 'USD',
      formattedValue: '$0.00',
      priceType: 'BUY',
      value: 0.0,
    },
    pickupItemsQuantity: 0,
    pickupOrderGroups: [],
    productDiscounts: {
      currencyIso: 'USD',
      formattedValue: '$0.00',
      priceType: 'BUY',
      value: 0.0,
    },
    site: 'powertools-spa',
    store: 'powertools',
    subTotal: {
      currencyIso: 'USD',
      formattedValue: '$5,500.00',
      priceType: 'BUY',
      value: 5500.0,
    },
    totalDiscounts: {
      currencyIso: 'USD',
      formattedValue: '$0.00',
      priceType: 'BUY',
      value: 0.0,
    },
    totalItems: 1,
    totalPrice: {
      currencyIso: 'USD',
      formattedValue: '$5,509.99',
      priceType: 'BUY',
      value: 5509.99,
    },
    totalPriceWithTax: {
      currencyIso: 'USD',
      formattedValue: '$5,509.99',
      priceType: 'BUY',
      value: 5509.99,
    },
    totalTax: {
      currencyIso: 'USD',
      formattedValue: '$0.00',
      priceType: 'BUY',
      value: 0.0,
    },
    user: {
      name: 'William Hunter',
      uid: 'william.hunter@rustic-hw.com',
    },
    cancellable: true,
    consignments: [],
    costCenter: {
      active: 'true',
      code: 'Custom_Retail',
      currency: {
        isocode: 'USD',
      },
      name: 'Custom Retail',
      assignedBudgets: [
        {
          active: true,
          budget: 4000.0,
          code: 'Monthly_4K_USD',
          currency: {
            active: true,
            isocode: 'USD',
            name: 'US Dollar',
            symbol: '$',
          },
          endDate: '2034-07-12T04:59:59+0000',
          name: 'Monthly 4K USD',
          selected: false,
          startDate: '2010-01-01T05:00:00+0000',
        },
      ],
      unit: {
        active: true,
        name: 'Custom Retail',
        uid: 'Custom Retail',
      },
    },
    created: '2020-10-07T21:15:27+0000',
    guestCustomer: false,
    orgCustomer: {
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
        name: 'Custom Retail',
        uid: 'Custom Retail',
      },
      roles: ['b2bcustomergroup'],
      selected: false,
      title: 'Mr.',
      titleCode: 'mr',
    },
    permissionResults: pendingOrderPermissionResults,
    returnable: false,
    status: 'PENDING_APPROVAL',
    statusDisplay: 'pending.approval',
    totalUnitCount: 100,
    unconsignedEntries: [
      {
        basePrice: {
          currencyIso: 'USD',
          formattedValue: '$55.00',
          priceType: 'BUY',
          value: 55.0,
        },
        cancellableQuantity: 0,
        configurationInfos: [],
        entryNumber: 0,
        product: {
          availableForPickup: false,
          baseOptions: [],
          categories: [
            {
              code: '1595',
              name: 'Angle Grinders',
              url: '/Open-Catalogue/Tools/Angle-Grinders/c/1595',
            },
            {
              code: 'brand_4439',
              name: 'Einhell',
              url: '/Brands/Einhell/c/brand_4439',
            },
          ],
          code: '3881018',
          configurable: false,
          images: [
            {
              altText: 'Angle Grinder RT-AG 115',
              format: 'zoom',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyNDk4OHxpbWFnZS9qcGVnfGltYWdlcy9oMDcvaGIwLzg3OTYyMzQyMTk1NTAuanBnfDQ1ZGQzMmNmOGEzMTczMjQ5ZjUzOWM5MTc2MmIyZDkyNTUyNmFiMmIzYzA0Y2NjYjY1OTEwYTEyMjJmY2UyNDg',
            },
            {
              altText: 'Angle Grinder RT-AG 115',
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMTY4NXxpbWFnZS9qcGVnfGltYWdlcy9oYzUvaDM1Lzg3OTYyNjE0ODI1MjYuanBnfGFiMzM3ZDI1MWQ5YWRjNTg3NWUxNjNhY2U4NTNhYTdhYzJiOTBiYzE2YTg4NjQ4ZDQxMjkzNWMyNDM1NDE3MTc',
            },
            {
              altText: 'Angle Grinder RT-AG 115',
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyNDEzfGltYWdlL2pwZWd8aW1hZ2VzL2g1OS9oMDcvODc5NjI4ODc0NTUwMi5qcGd8YjA2ZTk2ZWY1OWQ4NWY4ZTQyMThjMGZkZDgwNjZmOTVkOTZmN2U3YTA1NzIxNDlhY2EyZjQ2NDM3ZmUwMTUzNw',
            },
            {
              altText: 'Angle Grinder RT-AG 115',
              format: 'cartIcon',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxNDU1fGltYWdlL2pwZWd8aW1hZ2VzL2hiZC9oYzkvODc5NjMxNjAwODQ3OC5qcGd8ZjFmNzU4OTA0NTg2ZGI2NGIxZjdjNzU4MDVkNmNlNTg3NDc5ODUwZDk1NzIwZWM0M2NkZWZjOGIxMDViMTU3Yw',
            },
          ],
          manufacturer: 'Einhell',
          name: 'Angle Grinder RT-AG 115',
          purchasable: true,
          stock: {
            isValueRounded: false,
            stockLevel: 193,
            stockLevelStatus: 'inStock',
          },
          url: '/Open-Catalogue/Tools/Angle-Grinders/Angle-Grinder-RT-AG-115/p/3881018',
        },
        quantity: 100,
        returnableQuantity: 0,
        statusSummaryList: [],
        totalPrice: {
          currencyIso: 'USD',
          formattedValue: '$5,500.00',
          priceType: 'BUY',
          value: 5500.0,
        },
        updateable: true,
      },
    ],
  },
};

export const rejectedOrderDetails = JSON.parse(
  JSON.stringify(approvalOrderDetail)
);
rejectedOrderDetails.approvalDecisionRequired = false;
rejectedOrderDetails.order.permissionResults = rejectedOrderPermissionResults;
rejectedOrderDetails.order.status = 'REJECTED';
rejectedOrderDetails.order.statusDisplay = 'rejected';

export const approvedOrderDetails = JSON.parse(
  JSON.stringify(approvalOrderDetail)
);
approvedOrderDetails.approvalDecisionRequired = false;
approvedOrderDetails.order.permissionResults = approvedOrderPermissionResults;
approvedOrderDetails.order.status = 'APPROVED';
approvedOrderDetails.order.statusDisplay = 'approved';
