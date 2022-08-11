export const myAccount = {
  closeAccount: {
    confirmAccountClosure: 'Confirm Account Closure',
    confirmAccountClosureMessage:
      'Are you sure you want to close your account?',
    closeMyAccount: 'CLOSE MY ACCOUNT',
    accountClosedSuccessfully: 'Account closed with success',
    accountClosedFailure: 'Failed to close account',
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
    title: 'Title',
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
    customerId: 'Customer #',
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
  myCoupons: {
    noCouponsMessage: 'You have no coupons available.',
    effectiveTitle: 'Effective:',
    Effective: 'EFFECTIVE',
    PreSession: 'EFFECTIVE SOON',
    ExpireSoon: 'EXPIRING SOON',
    readMore: 'Read more',
    notification: 'Notification',
    findProducts: 'Find Products',
    status: 'Status:',
    dialogTitle: 'Coupon',
    claimCustomerCoupon: 'You have successfully claimed this coupon.',
    myCoupons: 'My coupons',
    startDateAsc: 'Start Date (ascending)',
    startDateDesc: 'Start Date (descending)',
    endDateAsc: 'End Date (ascending)',
    endDateDesc: 'End Date (descending)',
    sortBy: 'Sort by',
    sortCoupons: 'Sort coupons',
    notesPreffix:
      'You can set your preferred channels for receiving coupon notifications on the ',
    notesLink: 'Notification Channels',
    notesSuffix: ' page.',
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
    sortBy: 'Sort by',
    sortInterests: 'Sort interests',
    expirationDate: ' - Till {{ expirationDate }}',
    productId: 'ID {{ code }}',
    remove: 'Remove',
    sorting: {
      byNameAsc: 'Name (ascending)',
      byNameDesc: 'Name (descending)',
    },
    actions: 'ACTIONS',
    caption: 'My Interests contents.',
    itemRemoved: 'Selected item has been removed.',
  },
};
