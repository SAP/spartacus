/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

let orderDetails = {
  type: 'orderWsDTO',
  appliedOrderPromotions: [],
  appliedProductPromotions: [],
  appliedVouchers: [],
  calculated: true,
  code: '0005004001',
  deliveryAddress: {
    country: {
      isocode: 'US',
      name: 'USA',
    },
    defaultAddress: false,
    district: 'Berlin',
    formattedAddress: 'Sunset, 87654, California, Beverly Hills, 90210',
    id: '8796256894999',
    line1: 'Sunset',
    line2: '87654',
    postalCode: '90210',
    region: {
      countryIso: 'US',
      isocode: 'US-CA',
      isocodeShort: 'CA',
      name: 'California',
    },
    shippingAddress: true,
    town: 'Beverly Hills',
    visibleInAddressBook: true,
  },
  deliveryCost: {
    currencyIso: 'USD',
    formattedValue: 'USD9.99',
    priceType: 'BUY',
    value: 9.99,
  },
  deliveryItemsQuantity: 2,
  deliveryMode: {
    code: 'standard-net',
    deliveryCost: {
      currencyIso: 'USD',
      formattedValue: 'USD9.99',
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
            formattedValue: 'USD35.00',
            priceType: 'BUY',
            value: 35.0,
          },
          cancellableQuantity: 0,
          configurationInfos: [],
          cpqDiscounts: [],
          entryNumber: 0,
          product: {
            baseOptions: [],
            categories: [],
            code: 'SRV_01',
            configurable: false,
            name: 'SRV_01',
            productTypes: 'SERVICE',
            purchasable: true,
            stock: {
              isValueRounded: false,
              stockLevelStatus: 'inStock',
            },
            url: '/c/SRV-01/p/SRV_01',
          },
          quantity: 1,
          returnableQuantity: 0,
          statusSummaryList: [],
          totalPrice: {
            currencyIso: 'USD',
            formattedValue: 'USD35.00',
            priceType: 'BUY',
            value: 35.0,
          },
          updateable: true,
        },
        {
          basePrice: {
            currencyIso: 'USD',
            formattedValue: 'USD137.00',
            priceType: 'BUY',
            value: 137.0,
          },
          cancellableQuantity: 1,
          configurationInfos: [],
          cpqDiscounts: [],
          entryNumber: 1,
          product: {
            baseOptions: [],
            categories: [
              {
                code: '1360',
                name: 'Power Drills',
                url: '/Open-Catalogue/Tools/Power-Drills/c/1360',
              },
              {
                code: 'brand_753',
                name: 'Bosch',
                url: '/Brands/Bosch/c/brand_753',
              },
            ],
            code: '3780171',
            configurable: false,
            images: [
              {
                altText: 'PSR 18-2',
                format: 'cartIcon',
                imageType: 'PRIMARY',
                url: '/medias/?context=bWFzdGVyfGltYWdlc3w4NTAxfGltYWdlL2pwZWd8YUdWbUwyaGxaaTg0TnprMk16VTRNakV6TmpZeXw1MTAwZjUwMTZkZDBjMWJlMTYzNDU4MTA2Yjg5NTM0OWFhZDc1N2U0YjIzOWI2N2M1ZjYzOGFkOGQ0MDhmMWU1',
              },
              {
                altText: 'PSR 18-2',
                format: 'zoom',
                imageType: 'PRIMARY',
                url: '/medias/?context=bWFzdGVyfGltYWdlc3w0NTgyNXxpbWFnZS9qcGVnfGFEbGhMMmc1WVM4NE56azJNamMyTkRVM05UQXl8MThjYzMwYjM4YzcwYjY5MTEzNjc1NWY5ZjA0M2VlNTVmNDRhNDNiMzM3N2MxMzk3N2M2MWI0YmZmYjM4NmM4ZQ',
              },
              {
                altText: 'PSR 18-2',
                format: 'product',
                imageType: 'PRIMARY',
                url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMTQ1NHxpbWFnZS9qcGVnfGFHRTJMMmhsTVM4NE56azJNekF6TnpVek1qUTJ8OTgwMWNmYWJjOTA5M2JmNTc2NjAwZDA2NGNmNzEwMTk2ZDc3Njc0YzUwMDMwNjBiZjUxZjE4OWVjN2VhNGNjZA',
              },
              {
                altText: 'PSR 18-2',
                format: 'thumbnail',
                imageType: 'PRIMARY',
                url: '/medias/?context=bWFzdGVyfGltYWdlc3w5NzAwfGltYWdlL2pwZWd8YUdJd0wyZ3hZUzg0TnprMk16TXdPVGd6TkRVMHwzMGE5MTRhOTYwYjc5MjJmMDE3OTA3MDQ0ZmMxYmRmM2NiOTY0MjZhZTAzZmY2Yzg4NTIwMzBhMGFhMTlhNzll',
              },
            ],
            manufacturer: 'Bosch',
            name: 'PSR 18-2',
            productTypes: 'PHYSICAL',
            purchasable: true,
            stock: {
              isValueRounded: false,
              stockLevel: 51,
              stockLevelStatus: 'inStock',
            },
            url: '/Open-Catalogue/Tools/Power-Drills/PSR-18-2/p/3780171',
          },
          quantity: 1,
          returnableQuantity: 0,
          statusSummaryList: [],
          totalPrice: {
            currencyIso: 'USD',
            formattedValue: 'USD137.00',
            priceType: 'BUY',
            value: 137.0,
          },
          updateable: true,
        },
      ],
      totalPriceWithTax: {
        currencyIso: 'USD',
        formattedValue: 'USD176.00',
        priceType: 'BUY',
        value: 176.0,
      },
    },
  ],
  entries: [
    {
      basePrice: {
        currencyIso: 'USD',
        formattedValue: 'USD35.00',
        priceType: 'BUY',
        value: 35.0,
      },
      cancellableQuantity: 0,
      configurationInfos: [],
      cpqDiscounts: [],
      entryNumber: 0,
      product: {
        baseOptions: [],
        categories: [],
        code: 'SRV_01',
        configurable: false,
        name: 'SRV_01',
        productTypes: 'SERVICE',
        purchasable: true,
        stock: {
          isValueRounded: false,
          stockLevelStatus: 'inStock',
        },
        url: '/c/SRV-01/p/SRV_01',
      },
      quantity: 1,
      returnableQuantity: 0,
      statusSummaryList: [],
      totalPrice: {
        currencyIso: 'USD',
        formattedValue: 'USD35.00',
        priceType: 'BUY',
        value: 35.0,
      },
      updateable: true,
    },
    {
      basePrice: {
        currencyIso: 'USD',
        formattedValue: 'USD137.00',
        priceType: 'BUY',
        value: 137.0,
      },
      cancellableQuantity: 1,
      configurationInfos: [],
      cpqDiscounts: [],
      entryNumber: 1,
      product: {
        baseOptions: [],
        categories: [
          {
            code: '1360',
            name: 'Power Drills',
            url: '/Open-Catalogue/Tools/Power-Drills/c/1360',
          },
          {
            code: 'brand_753',
            name: 'Bosch',
            url: '/Brands/Bosch/c/brand_753',
          },
        ],
        code: '3780171',
        configurable: false,
        images: [
          {
            altText: 'PSR 18-2',
            format: 'cartIcon',
            imageType: 'PRIMARY',
            url: '/medias/?context=bWFzdGVyfGltYWdlc3w4NTAxfGltYWdlL2pwZWd8YUdWbUwyaGxaaTg0TnprMk16VTRNakV6TmpZeXw1MTAwZjUwMTZkZDBjMWJlMTYzNDU4MTA2Yjg5NTM0OWFhZDc1N2U0YjIzOWI2N2M1ZjYzOGFkOGQ0MDhmMWU1',
          },
          {
            altText: 'PSR 18-2',
            format: 'zoom',
            imageType: 'PRIMARY',
            url: '/medias/?context=bWFzdGVyfGltYWdlc3w0NTgyNXxpbWFnZS9qcGVnfGFEbGhMMmc1WVM4NE56azJNamMyTkRVM05UQXl8MThjYzMwYjM4YzcwYjY5MTEzNjc1NWY5ZjA0M2VlNTVmNDRhNDNiMzM3N2MxMzk3N2M2MWI0YmZmYjM4NmM4ZQ',
          },
          {
            altText: 'PSR 18-2',
            format: 'product',
            imageType: 'PRIMARY',
            url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMTQ1NHxpbWFnZS9qcGVnfGFHRTJMMmhsTVM4NE56azJNekF6TnpVek1qUTJ8OTgwMWNmYWJjOTA5M2JmNTc2NjAwZDA2NGNmNzEwMTk2ZDc3Njc0YzUwMDMwNjBiZjUxZjE4OWVjN2VhNGNjZA',
          },
          {
            altText: 'PSR 18-2',
            format: 'thumbnail',
            imageType: 'PRIMARY',
            url: '/medias/?context=bWFzdGVyfGltYWdlc3w5NzAwfGltYWdlL2pwZWd8YUdJd0wyZ3hZUzg0TnprMk16TXdPVGd6TkRVMHwzMGE5MTRhOTYwYjc5MjJmMDE3OTA3MDQ0ZmMxYmRmM2NiOTY0MjZhZTAzZmY2Yzg4NTIwMzBhMGFhMTlhNzll',
          },
        ],
        manufacturer: 'Bosch',
        name: 'PSR 18-2',
        productTypes: 'PHYSICAL',
        purchasable: true,
        stock: {
          isValueRounded: false,
          stockLevel: 51,
          stockLevelStatus: 'inStock',
        },
        url: '/Open-Catalogue/Tools/Power-Drills/PSR-18-2/p/3780171',
      },
      quantity: 1,
      returnableQuantity: 0,
      statusSummaryList: [],
      totalPrice: {
        currencyIso: 'USD',
        formattedValue: 'USD137.00',
        priceType: 'BUY',
        value: 137.0,
      },
      updateable: true,
    },
  ],
  guid: '6316b8e8-0205-4936-941b-a97897eaaee8',
  net: true,
  orderDiscounts: {
    currencyIso: 'USD',
    formattedValue: 'USD0.00',
    priceType: 'BUY',
    value: 0.0,
  },
  pickupItemsQuantity: 0,
  pickupOrderGroups: [],
  productDiscounts: {
    currencyIso: 'USD',
    formattedValue: 'USD0.00',
    priceType: 'BUY',
    value: 0.0,
  },
  servicedAt: '',
  site: 'powertools',
  store: 'powertools',
  subTotal: {
    currencyIso: 'USD',
    formattedValue: 'USD172.00',
    priceType: 'BUY',
    value: 172.0,
  },
  totalDiscounts: {
    currencyIso: 'USD',
    formattedValue: 'USD0.00',
    priceType: 'BUY',
    value: 0.0,
  },
  totalItems: 2,
  totalPrice: {
    currencyIso: 'USD',
    formattedValue: 'USD181.99',
    priceType: 'BUY',
    value: 181.99,
  },
  totalPriceWithTax: {
    currencyIso: 'USD',
    formattedValue: 'USD185.99',
    priceType: 'BUY',
    value: 185.99,
  },
  totalTax: {
    currencyIso: 'USD',
    formattedValue: 'USD4.00',
    priceType: 'BUY',
    value: 4.0,
  },
  user: {
    name: 'James Weber',
    uid: 'james.weber@harvestlive.inc',
  },
  billingDocuments: [],
  cancellable: true,
  consignments: [
    {
      code: 'cons0005004001_0',
      entries: [
        {
          orderEntry: {
            basePrice: {
              currencyIso: 'USD',
              formattedValue: 'USD35.00',
              priceType: 'BUY',
              value: 35.0,
            },
            cancellableQuantity: 0,
            configurationInfos: [],
            cpqDiscounts: [],
            entryNumber: 0,
            product: {
              baseOptions: [],
              categories: [],
              code: 'SRV_01',
              configurable: false,
              name: 'SRV_01',
              productTypes: 'SERVICE',
              purchasable: true,
              stock: {
                isValueRounded: false,
                stockLevelStatus: 'inStock',
              },
              url: '/c/SRV-01/p/SRV_01',
            },
            quantity: 1,
            returnableQuantity: 0,
            statusSummaryList: [],
            totalPrice: {
              currencyIso: 'USD',
              formattedValue: 'USD35.00',
              priceType: 'BUY',
              value: 35.0,
            },
            updateable: true,
          },
          quantity: 1,
        },
      ],
      shippingAddress: {
        country: {
          isocode: 'US',
          name: 'USA',
        },
        defaultAddress: false,
        district: 'Berlin',
        formattedAddress: 'Sunset, 87654, California, Beverly Hills, 90210',
        id: '8796256894999',
        line1: 'Sunset',
        line2: '87654',
        postalCode: '90210',
        region: {
          countryIso: 'US',
          isocode: 'US-CA',
          isocodeShort: 'CA',
          name: 'California',
        },
        shippingAddress: true,
        town: 'Beverly Hills',
        visibleInAddressBook: true,
      },
      status: 'READY',
      statusDate: '2024-08-06T13:00:00+0000',
      statusDisplay: 'processing',
    },
    {
      code: 'cons0005004001_1',
      entries: [
        {
          orderEntry: {
            basePrice: {
              currencyIso: 'USD',
              formattedValue: 'USD137.00',
              priceType: 'BUY',
              value: 137.0,
            },
            cancellableQuantity: 0,
            configurationInfos: [],
            cpqDiscounts: [],
            entryNumber: 1,
            product: {
              baseOptions: [],
              categories: [
                {
                  code: '1360',
                  name: 'Power Drills',
                  url: '/Open-Catalogue/Tools/Power-Drills/c/1360',
                },
                {
                  code: 'brand_753',
                  name: 'Bosch',
                  url: '/Brands/Bosch/c/brand_753',
                },
              ],
              code: '3780171',
              configurable: false,
              images: [
                {
                  altText: 'PSR 18-2',
                  format: 'cartIcon',
                  imageType: 'PRIMARY',
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3w4NTAxfGltYWdlL2pwZWd8YUdWbUwyaGxaaTg0TnprMk16VTRNakV6TmpZeXw1MTAwZjUwMTZkZDBjMWJlMTYzNDU4MTA2Yjg5NTM0OWFhZDc1N2U0YjIzOWI2N2M1ZjYzOGFkOGQ0MDhmMWU1',
                },
                {
                  altText: 'PSR 18-2',
                  format: 'zoom',
                  imageType: 'PRIMARY',
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3w0NTgyNXxpbWFnZS9qcGVnfGFEbGhMMmc1WVM4NE56azJNamMyTkRVM05UQXl8MThjYzMwYjM4YzcwYjY5MTEzNjc1NWY5ZjA0M2VlNTVmNDRhNDNiMzM3N2MxMzk3N2M2MWI0YmZmYjM4NmM4ZQ',
                },
                {
                  altText: 'PSR 18-2',
                  format: 'product',
                  imageType: 'PRIMARY',
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMTQ1NHxpbWFnZS9qcGVnfGFHRTJMMmhsTVM4NE56azJNekF6TnpVek1qUTJ8OTgwMWNmYWJjOTA5M2JmNTc2NjAwZDA2NGNmNzEwMTk2ZDc3Njc0YzUwMDMwNjBiZjUxZjE4OWVjN2VhNGNjZA',
                },
                {
                  altText: 'PSR 18-2',
                  format: 'thumbnail',
                  imageType: 'PRIMARY',
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3w5NzAwfGltYWdlL2pwZWd8YUdJd0wyZ3hZUzg0TnprMk16TXdPVGd6TkRVMHwzMGE5MTRhOTYwYjc5MjJmMDE3OTA3MDQ0ZmMxYmRmM2NiOTY0MjZhZTAzZmY2Yzg4NTIwMzBhMGFhMTlhNzll',
                },
              ],
              manufacturer: 'Bosch',
              name: 'PSR 18-2',
              productTypes: 'PHYSICAL',
              purchasable: true,
              stock: {
                isValueRounded: false,
                stockLevel: 51,
                stockLevelStatus: 'inStock',
              },
              url: '/Open-Catalogue/Tools/Power-Drills/PSR-18-2/p/3780171',
            },
            quantity: 1,
            returnableQuantity: 0,
            statusSummaryList: [],
            totalPrice: {
              currencyIso: 'USD',
              formattedValue: 'USD137.00',
              priceType: 'BUY',
              value: 137.0,
            },
            updateable: true,
          },
          quantity: 1,
        },
      ],
      shippingAddress: {
        country: {
          isocode: 'US',
          name: 'USA',
        },
        defaultAddress: false,
        district: 'Berlin',
        formattedAddress: 'Sunset, 87654, California, Beverly Hills, 90210',
        id: '8796256894999',
        line1: 'Sunset',
        line2: '87654',
        postalCode: '90210',
        region: {
          countryIso: 'US',
          isocode: 'US-CA',
          isocodeShort: 'CA',
          name: 'California',
        },
        shippingAddress: true,
        town: 'Beverly Hills',
        visibleInAddressBook: true,
      },
      status: 'READY',
      statusDate: '2024-07-31T14:56:40+0000',
      statusDisplay: 'processing',
    },
  ],
  costCenter: {
    active: 'true',
    code: '17100003_CC',
    currency: {
      isocode: 'USD',
    },
    name: '17100003_CC',
    assignedBudgets: [
      {
        active: true,
        budget: 150000.0,
        code: '17100003_Budget',
        currency: {
          active: false,
          isocode: 'USD',
          name: 'TADC ---TCURT*+',
          symbol: 'USD',
        },
        endDate: '2032-12-31T15:00:00+0000',
        name: '17100003_Budget',
        selected: false,
        startDate: '2010-01-01T15:00:00+0000',
      },
    ],
    unit: {
      active: true,
      addresses: [
        {
          country: {
            isocode: 'US',
          },
          defaultAddress: false,
          district: 'Berlin',
          formattedAddress: 'Sunset, 87654, California, Beverly Hills, 90210',
          id: '8796101869591',
          line1: 'Sunset',
          line2: '87654',
          postalCode: '90210',
          region: {
            isocode: 'US-CA',
          },
          town: 'Beverly Hills',
        },
      ],
      name: 'Dell Bont Industries',
      uid: '17100003',
    },
  },
  created: '2024-07-30T14:56:18+0000',
  guestCustomer: false,
  orgCustomer: {
    name: 'James Weber',
    uid: 'james.weber@harvestlive.inc',
    active: true,
    approvers: [],
    currency: {
      active: false,
      isocode: 'USD',
      name: 'TADC ---TCURT*+',
      symbol: 'USD',
    },
    customerId: '19',
    displayUid: 'james.weber@harvestlive.inc',
    email: 'james.weber@harvestlive.inc',
    firstName: 'James',
    language: {
      active: false,
      isocode: 'en',
      name: 'English',
      nativeName: 'English',
    },
    lastName: 'Weber',
    orgUnit: {
      active: true,
      name: 'Dell Bont Industries',
      uid: '17100003',
    },
    roles: ['b2badmingroup', 'b2bcustomergroup'],
    selected: false,
    title: 'Mr.',
    titleCode: '0002',
  },
  orgUnit: {
    active: true,
    name: 'Dell Bont Industries',
    uid: '17100003',
  },
  permissionResults: [],
  purchaseOrderNumber: '12345',
  returnable: false,
  serviceCancellable: true,
  serviceReschedulable: true,
  status: 'READY',
  statusDisplay: 'processing',
  totalUnitCount: 2,
  unconsignedEntries: [],
};

let orderList = {
  orders: [
    {
      code: '0005004001',
      costCenter: {
        active: 'true',
        code: '17100003_CC',
        currency: {
          isocode: 'USD',
        },
        name: '17100003_CC',
        unit: {
          active: true,
          addresses: [
            {
              country: {
                isocode: 'US',
              },
              defaultAddress: false,
              district: 'Berlin',
              formattedAddress:
                'Sunset, 87654, California, Beverly Hills, 90210',
              id: '8796101869591',
              line1: 'Sunset',
              line2: '87654',
              postalCode: '90210',
              region: {
                isocode: 'US-CA',
              },
              town: 'Beverly Hills',
            },
          ],
          name: 'Dell Bont Industries',
          uid: '17100003',
        },
      },
      guid: '6316b8e8-0205-4936-941b-a97897eaaee8',
      orgCustomer: {
        name: 'James Weber',
        uid: 'james.weber@harvestlive.inc',
        active: true,
        approvers: [],
        currency: {
          active: false,
          isocode: 'USD',
          name: 'TADC ---TCURT*+',
          symbol: 'USD',
        },
        customerId: '19',
        displayUid: 'james.weber@harvestlive.inc',
        email: 'james.weber@harvestlive.inc',
        firstName: 'James',
        language: {
          active: false,
          isocode: 'en',
          name: 'English',
          nativeName: 'English',
        },
        lastName: 'Weber',
        orgUnit: {
          active: true,
          name: 'Dell Bont Industries',
          uid: '17100003',
        },
        roles: [
          'b2badmingroup',
          'b2bapprovergroup',
          'b2bmanagergroup',
          'b2bcustomergroup',
        ],
        selected: false,
        title: 'Mr.',
        titleCode: '0002',
      },
      orgUnit: {
        active: true,
        name: 'Dell Bont Industries',
        uid: '17100003',
      },
      placed: '2024-07-24T11:17:16+0000',
      purchaseOrderNumber: '',
      status: 'READY',
      statusDisplay: 'processing',
      total: {
        currencyIso: 'USD',
        formattedValue: 'USD35.00',
        priceType: 'BUY',
        value: 35.0,
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
    {
      code: 'byDate',
      selected: true,
    },
    {
      code: 'byOrderNumber',
      selected: false,
    },
  ],
};

export const ORDER_CODE = '0005004001';
export const RESCHEDULED_DATE = generateRescheduledDate();
export const SERVICABLE_ORDER_LIST = generateServicableOrderList();
export const SERVICABLE_ORDER_DETAILS = generateServicableOrder();
export const SERVICABLE_ORDER_IN_24HRS_DETAILS =
  generateServicableOrderWithin24Hours();
export const CANCELLED_ORDER_LIST = generateCancelledOrderList();
export const CANCELLED_ORDER_DETAILS = generateCancelledOrder();

function generateServicedAt(offsetDays, time?): string {
  const now = new Date();
  now.setDate(now.getDate() + offsetDays);

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const timezoneOffset = -now.getTimezoneOffset();
  const sign = timezoneOffset >= 0 ? '+' : '-';
  const offsetHours = String(
    Math.floor(Math.abs(timezoneOffset) / 60)
  ).padStart(2, '0');
  const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');
  const timePart = time || '09:00:00';

  return `${year}-${month}-${day}T${timePart}${sign}${offsetHours}${offsetMinutes}`;
}

function generateRescheduledDate() {
  const servicedAt = generateServicedAt(6);
  const rescheduledDate = new Date(servicedAt);
  const day = String(rescheduledDate.getDate()).padStart(2, '0');
  const month = String(rescheduledDate.getMonth() + 1).padStart(2, '0');
  const year = rescheduledDate.getFullYear();
  return `${year}-${month}-${day}`;
}

function generateServicableOrderList() {
  const orderListDetails = { ...orderList };
  orderListDetails.orders[0].placed = generateServicedAt(0);
  return orderListDetails;
}

function generateServicableOrder() {
  const order = { ...orderDetails };
  order.servicedAt = generateServicedAt(5);
  return order;
}

function generateServicableOrderWithin24Hours() {
  const order = { ...orderDetails };
  const now = new Date();
  const hour = String(now.getHours()).padStart(2, '0');
  const time = `${hour}:00:00`;
  order.servicedAt = generateServicedAt(1, time);
  order.serviceReschedulable = false;
  order.serviceCancellable = false;
  return order;
}

function generateCancelledOrderList() {
  const orderListDetails = { ...orderList };
  orderListDetails.orders[0].placed = generateServicedAt(0);
  orderListDetails.orders[0].status = 'CANCELLED';
  orderListDetails.orders[0].statusDisplay = 'cancelled';
  return orderListDetails;
}

function generateCancelledOrder() {
  const order = { ...orderDetails };
  order.status = 'CANCELLED';
  return order;
}
