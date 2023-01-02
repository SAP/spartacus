/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const order = {
  orderDetails: {
    orderId: 'Order #',
    orderNumber: 'Order Number',
    replenishmentId: 'Replenishment #',
    purchaseOrderId: 'Purchase Order #',
    purchaseOrderNumber: 'Purchase Order Number',
    emptyPurchaseOrderId: 'None',
    none: 'None {{value}}',
    placed: 'Placed',
    placedBy: 'Placed By',
    unit: 'Unit',
    costCenter: 'Cost Center',
    costCenterAndUnit: 'Cost Center / Unit',
    costCenterAndUnitValue: '{{costCenterName}} / {{unitName}}',
    methodOfPayment: 'Method of Payment',
    payByAccount: 'Pay by Account',
    paidByCreditCard: '(paid by credit card)',
    status: 'Status',
    active: 'Active',
    shippedOn: 'Shipped on',
    shippingMethod: 'Shipping Method',
    placedOn: 'Placed on',
    startOn: 'Start On',
    nextOrderDate: 'Next Order Date',
    frequency: 'Frequency',
    cancelled: ' Cancelled',
    deliveryStatus_IN_TRANSIT: 'In Transit',
    deliveryStatus_READY_FOR_PICKUP: 'Ready for Pickup',
    deliveryStatus_READY_FOR_SHIPPING: 'Ready for Shipping',
    deliveryStatus_WAITING: 'Waiting',
    deliveryStatus_DELIVERING: 'Delivering',
    deliveryStatus_PICKPACK: 'Preparing for Shipment',
    deliveryStatus_PICKUP_COMPLETE: 'Pickup Complete',
    deliveryStatus_DELIVERY_COMPLETED: 'Delivery Complete',
    deliveryStatus_PAYMENT_NOT_CAPTURED: 'Payment Issue',
    deliveryStatus_IN_PROCESS: 'In Process',
    deliveryStatus_READY: 'In Process',
    deliveryStatus_DELIVERY_REJECTED: 'Delivery Rejected',
    deliveryStatus_SHIPPED: 'Shipped',
    deliveryStatus_TAX_NOT_COMMITTED: 'Tax Issue',
    deliveryStatus_CANCELLED: 'Cancelled',
    statusDisplay_cancelled: 'Cancelled',
    statusDisplay_cancelling: 'Cancel Pending',
    statusDisplay_completed: 'Completed',
    statusDisplay_created: 'Created',
    statusDisplay_error: 'Pending',
    statusDisplay_Error: 'Pending',
    statusDisplay_processing: 'Pending',
    statusDisplay_open: 'Open',
    statusDisplay_pending: {
      approval: 'Pending Approval',
      merchant: {
        approval: 'Pending Merchant Approval',
      },
    },
    statusDisplay_approved: 'Approved',
    statusDisplay_rejected: 'Rejected',
    statusDisplay_merchant: {
      approved: 'Merchant Approved',
      rejected: 'Merchant Rejected',
    },
    statusDisplay_assigned: {
      admin: 'Assigned To Administrator',
    },
    consignmentTracking: {
      action: 'Track package',
      dialog: {
        header: 'Tracking Information',
        shipped: 'Shipped',
        estimate: 'Estimated Delivery',
        carrier: 'Delivery Service',
        trackingId: 'Tracking Number',
        noTracking:
          'The package has not been dispatched from the warehouse. The tracking information will be available after the package is shipped.',
        loadingHeader: 'Consignment Tracking',
      },
    },
    cancellationAndReturn: {
      returnAction: 'Request a Return',
      cancelAction: 'Cancel Items',
      item: 'Item',
      itemPrice: 'Item Price',
      quantity: 'Max Quantity',
      returnQty: 'Quantity to Return',
      cancelQty: 'Quantity to Cancel',
      setAll: 'Set all quantities to maximum',
      totalPrice: 'Total',
      submit: 'Submit Request',
      submitDescription:
        'Submit Request. Items on this page will be included in the cancellation request.',
      returnSuccess: 'Your return request ({{rma}}) was submitted',
      cancelSuccess:
        'Your cancellation request was submitted (original order {{orderCode}} will be updated)',
    },
    cancelReplenishment: {
      title: 'Cancel Replenishment',
      description: 'Cancel any future replenishment order?',
      accept: 'Yes',
      reject: 'No',
      cancelSuccess:
        'Replenishment order #{{replenishmentOrderCode}} has been successfully cancelled',
    },
    caption: 'Order contents.',
  },
  orderHistory: {
    orderHistory: 'Order history',
    orderId: 'Order #',
    emptyPurchaseOrderId: 'None',
    date: 'Date',
    status: 'Status',
    PONumber: 'P.O. Number',
    total: 'Total',
    noOrders: 'We have no order records for this account.',
    noReplenishmentOrders:
      'We have no replenishment order records for this account.',
    startShopping: 'Start Shopping',
    sortBy: 'Sort by',
    sortOrders: 'Sort orders',
    replenishmentOrderHistory: 'Replenishment Order History',
    replenishmentOrderId: 'Replenishment #',
    purchaseOrderNumber: 'PO #',
    costCenter: 'Cost Center',
    startOn: 'Start On',
    frequency: 'Frequency',
    nextOrderDate: 'Next Order Date',
    cancel: 'Cancel',
    cancelled: 'Cancelled',
    replenishmentHistory: 'Replenishment History',
    notFound: 'No Orders Found',
    actions: 'Actions',
  },
  AccountOrderHistoryTabContainer: {
    tabs: {
      AccountOrderHistoryComponent: 'ALL ORDERS ({{param}})',
      OrderReturnRequestListComponent: 'RETURNS ({{param}})',
    },
    tabPanelContainerRegion: 'Group with order history details',
  },
  returnRequestList: {
    returnRequestId: 'Return #',
    orderId: 'Order #',
    date: 'Date Created',
    status: 'Status',
    sortBy: 'Sort by',
    sortReturns: 'Sort returns',
    statusDisplay_APPROVAL_PENDING: 'Approval Pending',
    statusDisplay_CANCELED: 'Cancelled',
    statusDisplay_CANCELLING: 'Cancelling',
    statusDisplay_WAIT: 'Wait',
    statusDisplay_RECEIVED: 'Received',
    statusDisplay_RECEIVING: 'Receiving',
    statusDisplay_APPROVING: 'Approving',
    statusDisplay_REVERSING_PAYMENT: 'Reversing Payment',
    statusDisplay_PAYMENT_REVERSED: 'Payment Reversed',
    statusDisplay_PAYMENT_REVERSAL_FAILED: 'Payment Reversal Failed',
    statusDisplay_REVERSING_TAX: 'Reversing Tax',
    statusDisplay_TAX_REVERSED: 'Tax Reversed',
    statusDisplay_TAX_REVERSAL_FAILED: 'Tax Reversal Failed',
    statusDisplay_COMPLETED: 'Completed',
  },
  returnRequest: {
    returnRequestId: 'Return Request #',
    orderCode: 'For Order #',
    status: 'Return status',
    cancel: 'Cancel Return Request',
    item: 'Description',
    itemPrice: 'Item Price',
    returnQty: 'Return Quantity',
    total: 'Total',
    summary: 'Return Totals',
    subtotal: 'Subtotal',
    deliveryCode: 'Delivery cost',
    estimatedRefund: 'Estimated refund',
    note: 'The totals are estimated and may not include applicable taxes or other charges.',
    cancelSuccess: 'Your return request ({{rma}}) was cancelled',
    caption: 'Order contents.',
  },
};
