export const myAccount = {
  orderDetails: {
    orderId: 'Order #',
    placed: 'Placed',
    status: 'Status',
    shippedOn: 'Shipped on',
    inProcess: 'In process...',
    pending: 'Pending',
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
        header: 'Tracking Information',
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
    accountClosedFailure: 'Failed to close account',
  },
  updateEmailForm: {
    newEmailAddress: {
      label: 'New email address',
      placeholder: 'Enter email',
    },
    confirmNewEmailAddress: {
      label: 'Confirm new email address',
      placeholder: 'Enter email',
    },
    enterValidEmail: 'Please enter a valid email.',
    bothEmailMustMatch: 'Both emails must match',
    password: {
      label: 'Password',
      placeholder: 'Enter password',
    },
    pleaseInputPassword: 'Please input password',
    emailUpdateSuccess: 'Success. Please sign in with {{ newUid }}',
  },
  updatePasswordForm: {
    oldPassword: {
      label: 'Old Password',
      placeholder: 'Old Password',
    },
    oldPasswordIsRequired: 'Old password is required.',
    newPassword: {
      label: 'New Password',
      placeholder: 'New Password',
    },
    passwordMinRequirements:
      'Password must be six characters minimum, with one uppercase letter, one number, one symbol',
    confirmPassword: {
      label: 'Confirm New Password',
      placeholder: 'Confirm Password',
    },
    bothPasswordMustMatch: 'Both password must match',
    passwordUpdateSuccess: 'Password updated with success',
  },
  updateProfileForm: {
    title: '',
    none: '',
    firstName: {
      label: 'First name',
      placeholder: 'First name',
    },
    firstNameIsRequired: 'First name is required.',
    lastName: {
      label: 'Last name',
      placeholder: 'Last name',
    },
    lastNameIsRequired: 'Last name is required.',
    profileUpdateSuccess: 'Personal details successfully updated',
  },
  consentManagementForm: {
    clearAll: 'Clear all',
    selectAll: 'Select all',
    message: {
      success: {
        given: 'Consent successfully given.',
        withdrawn: 'Consent successfully withdrawn.',
      },
    },
  },
  notificationPreference: {
    message: 'Select your preferred notification channels',
    note: 'Note: ',
    noteMessage:
      'If you deactivate all channels you will not be able to receive any further notifications.',
    EMAIL: 'Email:',
    SMS: 'SMS:',
    SITE_MESSAGE: 'SiteMessage',
  },
  myInterests: {
    header: 'My Interests',
    item: 'ITEM',
    price: 'PRICE',
    notifications: 'NOTIFICATIONS',
    noInterests: 'You have no registered interests yet.',
    inStock: 'In Stock',
    lowStock: 'Low Stock',
    outOfStock: 'Out of Stock',
    BACK_IN_STOCK: 'Back In Stock',
    sortByMostRecent: 'Sort by Most recent',
    expirationDate: ' - Till {{ expirationDate }}',
    productId: 'ID {{ code }}',
    remove: 'REMOVE',
    sorting: {
      byNameAsc: 'Name (ascending)',
      byNameDesc: 'Name (descending)',
    },
  },
  wishlist: {
    empty: 'No products in your wish list yet',
  },
};
