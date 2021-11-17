export const ORDER_CODE = '00000001';
export const RETURN_REQUEST_CODE = '00000000';
export const RMA = '00000000';
export const REQUEST_CREATE_TIME = 'November 18, 2020';
export const REQUEST_STATUS_PENDING = 'Approval Pending';
export const REQUEST_STATUS_CANCELLING = 'Cancelling';

export const product = {
  baseOptions: [],
  code: '816802',
  images: [
    {
      format: 'zoom',
      imageType: 'PRIMARY',
      url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMTY1N3xpbWFnZS9qcGVnfGltYWdlcy9oMmQvaDIxLzg3OTY2MTYxMzA1OTAuanBnfGY3MDRjMWViNDc4ZTA0MWY3YTIwZWRmOWFjZmZkYTQ4NDM0YWI1MGY5NTdmMDY5ODExY2E5ZjU0ZTZmNDk0MDk',
    },
    {
      format: 'product',
      imageType: 'PRIMARY',
      url: '/medias/?context=bWFzdGVyfGltYWdlc3w1NjY3fGltYWdlL2pwZWd8aW1hZ2VzL2g5ZC9oZjkvODc5NjY0MjQxMDUyNi5qcGd8ZDAwOWZkNmFkYjExMTA2ZGNiMzZjZDI1Mjk0MWEzMmIzYTdjMWM3ZWQ5YTkxMGU3YjI3NWFiNjM1NGJjMTQ2ZA',
    },
    {
      format: 'thumbnail',
      imageType: 'PRIMARY',
      url: '/medias/?context=bWFzdGVyfGltYWdlc3wxNzkzfGltYWdlL2pwZWd8aW1hZ2VzL2gxMi9oM2QvODc5NjY2ODc1NTk5OC5qcGd8YzU3N2YwNzljN2Y0ODkxZWZiZDJjYjY0Yjg1ZjUyZGFmMmU3YmE3ODRiMzk4NzQwNzZhNzZlNGY2ZDM3MzI3Ng',
    },
    {
      format: 'cartIcon',
      imageType: 'PRIMARY',
      url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMjU4fGltYWdlL2pwZWd8aW1hZ2VzL2gwNi9oNTgvODc5NjY5NTEwMTQ3MC5qcGd8ZTY4ZGUwZTk2Njc5YThmZWE0MjA4OTNmZDU4ZjRiZWY4OTEzYTM0ODFjNzRiZTkzN2Y2Y2RmNDJiNDA2YWYwZA',
    },
  ],
  name: 'Web Camera (100KpixelM CMOS, 640X480, USB 1.1) Black',
};

export const orderDetails = {
  code: ORDER_CODE,
  deliveryAddress: {
    country: {
      isocode: 'CA',
      name: 'Canada',
    },
    defaultAddress: false,
    firstName: 'Test',
    formattedAddress: '2113, 32nd Avenue, , Ontario, Lachine, H8T 3J1',
    id: '8797825957911',
    lastName: 'Test',
    line1: '2113, 32nd Avenue',
    line2: '',
    phone: '',
    postalCode: 'H8T 3J1',
    region: {
      countryIso: 'CA',
      isocode: 'CA-ON',
      isocodeShort: 'ON',
      name: 'Ontario',
    },
    shippingAddress: true,
    title: 'Mr.',
    titleCode: 'mr',
    town: 'Lachine',
    visibleInAddressBook: true,
  },
  deliveryCost: {
    currencyIso: 'USD',
    formattedValue: '$7.49',
    priceType: 'BUY',
    value: 7.49,
  },
  deliveryItemsQuantity: 1,
  deliveryMode: {
    code: 'standard-net',
    deliveryCost: {
      currencyIso: 'USD',
      formattedValue: '$7.49',
      priceType: 'BUY',
      value: 7.49,
    },
    description: '3-5 business days',
    name: 'Standard Delivery',
  },
  entries: [
    {
      basePrice: {
        currencyIso: 'USD',
        formattedValue: '$260.87',
        priceType: 'BUY',
        value: 260.87,
      },
      cancellableQuantity: 1,
      configurationInfos: [],
      entryNumber: 0,
      product,
      quantity: 1,
      returnableQuantity: 0,
      statusSummaryList: [],
      totalPrice: {
        currencyIso: 'USD',
        formattedValue: '$260.87',
        priceType: 'BUY',
        value: 260.87,
      },
      updateable: true,
    },
  ],
  net: true,
  orderDiscounts: {
    currencyIso: 'USD',
    formattedValue: '$20.00',
    priceType: 'BUY',
    value: 20.0,
  },
  paymentInfo: {
    accountHolderName: 'Test',
    billingAddress: {
      country: {
        isocode: 'CA',
        name: 'Canada',
      },
      defaultAddress: false,
      email: 'test@test1.com',
      firstName: 'Test',
      formattedAddress: '2113, 32nd Avenue , Ontario, Lachine, H8T 3J1',
      id: '8797826023447',
      lastName: 'Test',
      line1: '2113, 32nd Avenue ',
      phone: '5147468956',
      postalCode: 'H8T 3J1',
      region: {
        countryIso: 'CA',
        isocode: 'CA-ON',
        isocodeShort: 'ON',
        name: 'Ontario',
      },
      shippingAddress: false,
      town: 'Lachine',
      visibleInAddressBook: true,
    },
    cardNumber: '************1111',
    cardType: {
      code: 'visa',
      name: 'Visa',
    },
    defaultPayment: false,
    expiryMonth: '6',
    expiryYear: '2024',
    id: '8796753133610',
    saved: true,
    subscriptionId: '0cc42a70-6134-498f-84dd-a4be95c925ad',
  },
  productDiscounts: {
    currencyIso: 'USD',
    formattedValue: '$0.00',
    priceType: 'BUY',
    value: 0.0,
  },
  site: 'electronics-spa',
  store: 'electronics',
  user: {
    name: 'Test Test',
    uid: 'test@test1.com',
  },
  cancellable: true,
  created: '2020-11-17T16:02:23+0000',
  guestCustomer: false,
  returnable: false,
  status: 'READY',
  statusDisplay: 'processing',
  totalUnitCount: 1,
};

export const cancellableOrder = JSON.parse(JSON.stringify(orderDetails));
cancellableOrder.cancellable = true;
cancellableOrder.returnable = false;
cancellableOrder.entries[0].cancellableQuantity = 1;

export const returnableOrder = JSON.parse(JSON.stringify(orderDetails));
returnableOrder.returnable = true;
returnableOrder.cancellable = false;
returnableOrder.entries[0].returnableQuantity = 1;

export const returnRequestDetails = {
  cancellable: true,
  code: RETURN_REQUEST_CODE,
  deliveryCost: {
    formattedValue: '$7.49',
  },
  order: {
    code: ORDER_CODE,
  },
  returnEntries: [
    {
      expectedQuantity: 1,
      orderEntry: {
        basePrice: {
          formattedValue: '$260.87',
        },
        configurationInfos: [],
        entryNumber: 0,
        product,
        quantity: 1,
        statusSummaryList: [],
      },
      refundAmount: {
        currencyIso: 'USD',
        formattedValue: '$7.81',
        value: 7.81,
      },
    },
  ],
  rma: RMA,
  status: 'APPROVAL_PENDING',
  subTotal: {
    formattedValue: '$260.87',
  },
  totalPrice: {
    currencyIso: 'USD',
    formattedValue: '$260.87',
    value: 260.87,
  },
  creationTime: '2020-11-18T16:16:15+0000',
};

export const returnRequestList = {
  pagination: {
    currentPage: 0,
    pageSize: 5,
    sort: 'byDate',
    totalPages: 1,
    totalResults: 1,
  },
  returnRequests: [returnRequestDetails],
  sorts: [
    {
      code: 'byDate',
      selected: true,
    },
    {
      code: 'byRMA',
      selected: false,
    },
  ],
};

export const cancelledReturnRequest = JSON.parse(
  JSON.stringify(returnRequestDetails)
);
cancelledReturnRequest.cancellable = false;
cancelledReturnRequest.status = 'CANCELLING';
