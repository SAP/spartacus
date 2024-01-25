/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const asmCustomer360 = {
  asmCustomer360: {
    alertErrorMessage:
      'The information cannot be be loaded. Please try again later or contact your system administrator.',
    errorMessageHeader: 'Oops! Something went wrong',
    applyActionAlter:
      "The action couldn't be completed. Please try again later.",
    header: {
      title: 'Customer Profile',
      subTitle: '{{name}} Customer 360\xB0 View',
      activeCartLabel: '{{cartSize}} item added to cart',
      recentOrderLabel: 'Last order {{price}}',
      recentTicketLabel: 'Last ticket',
      signedUpAt: 'Account created on {{date}}',
    },
    productListing: {
      totalNoItems: 'Total No. Items {{count}}',
      totalPrice: 'Total Price {{price}}',
      showMore: 'Show More',
      showLess: 'Show Less',
    },
    productItem: {
      outOfStock: 'Out of Stock',
      quantity: 'Qty: {{count}}',
      itemPrice: 'Item Price: {{price}}',
    },
    activeCart: {
      header: 'Active Cart',
      emptyDescription: 'There are currently no active cart Items',
      aria: {
        linkLabel: 'Active Cart {{code}}',
      },
    },
    savedCart: {
      header: 'Last Saved Cart',
      emptyDescription: 'There are currently no saved cart items',
      aria: {
        linkLabel: 'Last Saved Cart {{code}}',
      },
    },
    productInterests: {
      header: 'Interests',
      emptyDescription: 'There are currently no interest items',
    },
    profile: {
      address: 'Address',
      billingAddress: 'Billing Address',
      deliveryAddress: 'Delivery Address',
      phone1: 'Phone 1',
      phone2: 'Phone 2',
      paymentMethodHeader: 'Saved Payment Methods',
    },
    activity: {
      type: 'Type',
      id: 'Id',
      description: 'Description',
      status: 'Status',
      created: 'Created',
      updated: 'Updated',
      numberOfCartItems: 'Cart with {{count}} items',
      cart: 'Cart',
      order: 'Order',
      savedCart: 'Saved Cart',
      emptyStateText: 'There is currently no recorded customer activity',
      headerText: 'General',
    },
    productReviews: {
      columnHeaders: {
        item: 'Item',
        dateAndStatus: 'Date / Status',
        rating: 'Rating',
        review: 'Review',
      },
      header: 'Product Reviews',
      emptyDescription: 'There are currently no product review items',
      sku: 'SKU',
    },
    supportTickets: {
      columnHeaders: {
        id: 'ID',
        headline: 'Headline',
        category: 'Category',
      },
      header: 'Support Tickets',
      emptyDescription: 'There are currently no support tickets',
    },
    coupons: {
      headerText: 'Coupons',
      emptyDescription: 'There are currently no coupons',
      applyButtonText: 'Apply to Cart',
      applied: 'Coupon Applied',
      removeButtonText: 'Remove',
    },
    promotions: {
      headerText: 'Promotions',
      emptyDescription: 'There are currently no promotions',
      applied: 'Promotion Applied',
      headerName: 'Name',
      headerAction: 'Action',
    },
    customerCoupons: {
      headerText: 'Customer Coupons',
      emptyDescription: 'There are currently no customer coupons',
      applyButtonText: 'Assign to Customer',
      removeButtonText: 'Remove',
      availableTab: 'Available',
      sentTab: 'Sent',
      searchBox: 'Coupon',
    },
    maps: {
      storeClosed: 'Close',
      storesFound: '{{ initial }} - {{ end }} from {{ total }} stores found',
    },
    overviewTab: 'Overview',
    profileTab: 'Profile',
    activityTab: 'Activity',
    feedbackTab: 'Feedback',
    promotionsTab: 'Promotions',
    mapsTab: 'Maps',
    storeLocationsTab: 'Store Locations',
    aria: {
      activeCartCode: 'Active Cart {{code}}',
      recentOrderCode: 'Last Order {{code}}',
    },
    pagination: 'Pagination',
    page: 'Page {{number}}',
    emptyCellValue: '---',
  },
};
