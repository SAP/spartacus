export const myAccount = {
  orderDetails: {
    orderId: 'Order #',
    placed: 'Placed',
    status: 'Status',
    shippedOn: 'Shipped on',
    inProcess: 'In process...',
    deliveryStatus_READY_FOR_PICKUP: 'Ready for pickup',
    deliveryStatus_PICKUP_COMPLETE: 'Picked up',
    deliveryStatus_SHIPPED: 'Shipped',
    deliveryStatus_CANCELLED: 'Cancelled',
    statusDisplay_cancelled: 'Cancelled',
    statusDisplay_cancelling: 'Cancel Pending',
    statusDisplay_completed: 'Completed',
    statusDisplay_created: 'Created',
    statusDisplay_error: 'Pending',
    statusDisplay_Error: 'Pending',
    statusDisplay_open: 'Open',
    statusDisplay_processing: 'In Process',
    consignmentTracking: {
      action: 'Track package',
      dialog: {
        header: '{{ consignmentCode }} - Tracking',
        shipped: 'Shipped',
        estimate: 'Estimated Delivery',
        carrier: 'Delivery Service',
        trackingId: 'Tracking Number',
        noTracking:
          'The package has not been dispatched from the warehouse. ' +
          'The tracking information will be available after the package is shipped.',
        loadingHeader: 'Consignment Tracking',
      },
    },
  },
  orderHistory: {
    orderHistory: 'Order history',
    orderId: 'Order #',
    date: 'Date',
    status: 'Status',
    total: 'Total',
    noOrders: 'We have no order records for this account.',
    startShopping: 'Start Shopping',
    sortByMostRecent: 'Sort by Most recent',
  },
  closeAccount: {
    confirmAccountClosure: 'Confirm Account Closure',
    confirmAccountClosureMessage:
      'Are you sure you want to close your account?',
    closeMyAccount: 'CLOSE MY ACCOUNT',
    accountClosedSuccessfully: 'Account closed with success',
  },
};
