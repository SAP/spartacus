export const myAccount = {
  orderDetails: {
    orderId: 'Order #',
    placed: 'Placed',
    status: 'Status',
    shippedOn: 'Shipped on',
    inProcess: 'In process...',
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
  consignmentTracking: {
    action: {
      trackPackage: 'Track package'
    },
    dialog: {
      label: {
        header: '{{ consignmentCode }} - Tracking',
        shipped: 'Shipped',
        estimate: 'Estimated Delivery',
        carrier: 'Delivery Service',
        trackingId: 'Tracking Number',
        noTracking: 'The package has not been dispatched from the warehouse. '
          + 'The tracking information will be available after the package is shipped.',
        loadingHeader: 'Consignment Tracking'
      }
    }
  }
};
