/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Customer360ProductInterestList,
  Customer360Response,
  Customer360ReviewList,
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

export const mockCustomer360Response: Customer360Response = {
  value: [
    mockReviewList,
    mockSupportTicketList,
    mockInterestList,
    mockStoreLocationList,
  ],
};
