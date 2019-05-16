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
    closeAccountRetentionInfo:
      'When you close your account, your profile information will be kept for the retention period mandated by the laws and regulations of your country. Customer Support will be able to assist you with any order history or proof of purchase needs during this time.<br/><br/>At the end of the retention period, the following profile information will be deleted and will no longer be accessible to you or anyone else:<br/><br/><ul><li>email addresses</li><li>contact information</li><li>shipping details</li><li>delivery preferences</li><li>consent management settings</li><li>account history</li><li>payment details</li><li>order history</li></ul>', //tslint:disable-line
  },
  notificationProference: {
    message: 'Select your preferred notification channels',
    note: 'Note: ',
    noteMessage:
      'If you deactivate all channels you will not be able to receive any further notifications.',
    EMAIL: 'Email:',
    SMS: 'SMS:',
    SITE_MESSAGE: 'SiteMessage',
  },
};
