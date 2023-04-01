import {
  Customer360CustomerProfile,
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

export const mockCustomer360Response: Customer360Response = {
  value: [
    mockReviewList,
    mockSupportTicketList,
    mockInterestList,
    mockStoreLocationList,
    mockCustomerProfile,
  ],
};
