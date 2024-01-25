/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const myAccountV2Order = {
  myAccountV2OrderHistory: {
    heading: 'All Orders ({{param}})',
    item: '{{param}} Item',
    items: '{{param}} Items',
    totalPrice: 'Total Price: {{param}}',
    consignmentCode: 'Consignment {{param}}',
    statusDate: 'Last Updated: {{param}}',
    returnProcessed: 'Return Processed: {{param}}',
    deliveryPointOfServiceDetails: {
      itemsToBePickUp: 'To Be Picked Up - ',
    },
    checkoutMode: {
      deliveryEntries: 'To Be Shipped - ',
    },
    checkoutPickupInStore: {
      heading: 'To Be Picked Up - ',
    },
    orderListResults: 'Orders List',
    orderListPagination: 'Orders List pagination',
    totalPriceLabel: 'Total Price',
    orderPlaced: 'Order Placed On',
    orderCodeLabel: 'Order Code',
    consignmentDetailLabel: 'Consignment Information',
    consignmentNumberLabel: 'Consignment Number',
    consignmentStatusLabel: 'Consignment Status',
    consignmentStatusDateLabel: 'Last Updated On',
    estimateDeliveryLabel: 'Estimated Delivery Date',
  },
  myAccountV2OrderDetails: {
    returnItems: 'Return Items',
    cancelItems: 'Cancel Items',
    downloadInvoices: 'Download Invoices',
    viewAllOrders: 'View All Orders',
    noInvoices: 'Invoices are not generated yet. Please come back later.',
  },
  myAccountV2Orders: {
    item: '{{value}} Item',
    items: '{{value}} Items',
    heading: 'Orders And Returns',
    orderNumber: 'Order Number ({{value}})',
    purchasedOn: 'Purchased On: {{value}}',
    orderedItems: 'Ordered Items: {{value}}',
    totalPrice: 'Total Price: {{value}}',
    orderDetails: 'Order Details',
    orderDetailsLabel: 'Show Order Details',
    orderStatusLabel: 'Order Status',
    returnOrder: 'Return Order',
    showMore: 'Show More',
  },
};
