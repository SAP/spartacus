/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

//TODO will remove this file when the backend is ready!!
import {
  Customer360ActiveCart,
  Customer360ActivityList,
  Customer360CustomerProfile,
  Customer360Overview,
  Customer360ProductInterestList,
  Customer360Response,
  Customer360ReviewList,
  Customer360SavedCart,
  Customer360StoreLocation,
  Customer360SupportTicketList,
  Customer360Type,
} from '@spartacus/asm/customer-360/root';

export const mockSupportTicketList: Customer360SupportTicketList = {
  type: Customer360Type.SUPPORT_TICKET_LIST,
  tickets: [
    {
      id: '00000001',
      subject: 'Ticket Subject 00000001',
      category: {
        code: 'Enquiry',
        name: 'Enquiry',
      },
      status: {
        code: 'Open',
        name: 'Open',
      },
      createdAt: '2023-03-02T10:02:39+08:00',
      updatedAt: '2023-03-02T10:02:39+08:00',
    },
    {
      id: '00000002',
      subject: 'Ticket Subject 00000002',
      category: {
        code: 'Complaint',
        name: 'Complaint',
      },
      status: {
        code: 'Closed',
        name: 'Closed',
      },
      createdAt: '2023-03-02T10:02:39+08:00',
      updatedAt: '2023-03-02T10:02:39+08:00',
    },
  ],
};

export const mockStoreLocationList: Customer360StoreLocation = {
  type: Customer360Type.STORE_LOCATION,
  address: 'Feltham, GB',
};

export const mockCustomerProfile: Customer360CustomerProfile = {
  type: Customer360Type.CUSTOMER_PROFILE,
  profile: {
    billingAddress: {
      id: '8796098854935',
      line1: 'billing address line1',
      line2: 'billing address line2',
      town: 'Sunnyvale',
      region: {
        isocode: 'string',
        isocodeShort: 'string',
        countryIso: 'string',
        name: 'string',
      },
      country: {
        isocode: 'US',
        name: 'United States',
      },
    },
    deliveryAddress: {
      id: '8796098854935',
      line1: 'd address line1',
      line2: 'd address line2',
      town: 'Sunnyvale',
      region: {
        isocode: 'string',
        isocodeShort: 'string',
        countryIso: 'string',
        name: 'string',
      },
      country: {
        isocode: 'US',
        name: 'United States',
      },
    },
    phone1: '090 0987 432',
    phone2: '090 0987 653',
    paymentDetails: [
      {
        id: '8796125822999',
        cardTypeName: 'visa',
        cardNumber: '************6182',
        expiryMonth: '02',
        expiryYear: '2999',
        defaultPayment: true,
      },
    ],
  },
};

export const mockReviewList: Customer360ReviewList = {
  type: Customer360Type.REVIEW_LIST,
  reviews: [
    {
      productName: 'Shirt',
      productCode: 'shirt',
      createdAt: '2022-12-02T20:07:08+0000',
      updatedAt: '2022-12-02T20:07:08+0000',
      rating: '3.5',
      reviewStatus: 'Complete',
      reviewText: 'review text shirts',
    },
    {
      productName: 'Shoes',
      productCode: 'shoes',
      createdAt: '2022-12-02T20:07:08+0000',
      updatedAt: '2022-12-02T20:07:08+0000',
      rating: '4',
      reviewStatus: 'Complete',
      reviewText: 'review text shoes',
    },
  ],
};

export const mockInterestList: Customer360ProductInterestList = {
  type: Customer360Type.PRODUCT_INTEREST_LIST,
  customerProductInterests: [
    {
      product: {
        code: '1934406',
      },
    },
    {
      product: {
        code: '358639',
      },
    },
    {
      product: {
        code: '1992693',
      },
    },
  ],
};

export const mockActiveCart: Customer360ActiveCart = {
  type: Customer360Type.ACTIVE_CART,
  code: '00000001',
  totalPrice: '$100.00',
  totalItemCount: 1,
  entries: [
    {
      quantity: 1,
      basePrice: '$10.00',
      totalPrice: '$10.00',
      productCode: '300938',
    },
    {
      quantity: 3,
      basePrice: '$10.00',
      totalPrice: '$30.00',
      productCode: '1981415',
    },
  ],
};

export const mockOverview: Customer360Overview = {
  type: Customer360Type.OVERVIEW,
  name: 'John Doe',
  cartSize: 5,
  cartCode: '00005033',
  lastOrderTotal: '$12.34',
  lastOrderCode: '00005032',
  lastOrderedAt: '2023-04-06T02:15:30.085Z',
  lastOpenedTicketId: '00002000',
  lastTicketCreatedAt: '2023-04-06T02:15:30.085Z',
  email: 'johndoe@example.com',
  registeredAt: '2023-04-06T02:15:30.085Z',
  defaultShippingAddress: {
    id: 'string',
    title: 'string',
    titleCode: 'string',
    firstName: 'string',
    lastName: 'string',
    companyName: 'string',
    line1: 'string',
    line2: 'string',
    town: 'string',
    region: {
      isocode: 'string',
      isocodeShort: 'string',
      countryIso: 'string',
      name: 'string',
    },
    district: 'string',
    postalCode: 'string',
    phone: 'string',
    cellphone: 'string',
    email: 'string',
    country: {
      isocode: 'string',
      name: 'string',
    },
    shippingAddress: true,
    defaultAddress: true,
    visibleInAddressBook: true,
    formattedAddress: 'string',
  },
  userAvatar: {
    url: '/medias/SAP-scrn-R.png?context=bWFzdGVyfGltYWdlc3wxMDEyN3xpbWFnZS9wbmd8YVcxaFoyVnpMMmc0WXk5b1ltSXZPRGM1TnpRNU5qYzNNRFU1TUM1d2JtY3w3MDRiODkxNWI2YWRmZTQ0NDFhZmIxZjZkYmZmYTA3MjM0NTY4NmNlYzU4OWM4Y2VmNDY5MzZkNmY0ZWMxZWUx',
    format: 'png',
  },
};

export const mockSavedCart: Customer360SavedCart = {
  type: Customer360Type.SAVED_CART,
  code: '00000001',
  totalPrice: '$100.00',
  totalItemCount: 1,
  entries: [
    {
      quantity: 1,
      basePrice: '$10.00',
      totalPrice: '$10.00',
      productCode: '300938',
    },
    {
      quantity: 3,
      basePrice: '$10.00',
      totalPrice: '$30.00',
      productCode: '1981415',
    },
  ],
};

export const mockActivityList: Customer360ActivityList = {
  type: Customer360Type.ACTIVITY_LIST,
  activities: [
    {
      type: {
        code: 'CART',
        name: 'Cart',
      },
      associatedTypeId: '0001',
      description: 'Mock active cart',
      createdAt: '2023-02-10T12:52:33+08:00',
      updatedAt: '2023-02-10T12:52:33+08:00',
    },
    {
      type: {
        code: 'SAVED CART',
        name: 'Saved Cart',
      },
      associatedTypeId: '0002',
      description: 'Mock saved cart',
      createdAt: '2023-01-10T12:53:33+08:00',
      updatedAt: '2023-01-10T12:54:33+08:00',
    },
    {
      type: {
        code: 'ORDER',
        name: 'Order',
      },
      associatedTypeId: '0003',
      status: {
        code: 'READY',
        name: 'Ready',
      },
      description: 'Mock Order',
      createdAt: '2023-01-10T12:54:33+08:00',
      updatedAt: '2023-01-10T12:54:33+08:00',
    },
    {
      type: {
        code: 'TICKET',
        name: 'Ticket',
      },
      associatedTypeId: '0004',
      status: {
        code: 'NEW',
        name: 'New',
      },
      description: 'Mock Ticket',
      createdAt: '2023-01-10T12:56:33+08:00',
      updatedAt: '2023-01-10T12:56:33+08:00',
    },
  ],
};

export const mockCustomer360Response: Customer360Response = {
  value: [
    mockReviewList,
    mockSupportTicketList,
    mockInterestList,
    mockStoreLocationList,
    mockCustomerProfile,
    mockActiveCart,
    mockSavedCart,
    mockOverview,
    mockActivityList,
  ],
};
