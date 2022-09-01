export const customer360 = {
  overview: {
    tabName: 'Overview',
    activeCart: 'Active Cart',
    activeCartCode: 'Active Cart {{code}}',
    totalNoItems: 'Total No. Items {{count}}',
    totalPrice: 'Total Price {{price}}',
    noActiveCart: 'There are currently no Active Cart Items',
    savedCartCode: 'Last Saved Cart {{code}}',
    savedCart: 'Last Saved Cart',
    noSavedCart: 'There are currently no Saved Cart items',
    interests: 'Interests',
    noInterests: 'There are currently no Interest items',
    inStock: 'In Stock',
    lowStock: 'Low Stock',
    outOfStock: 'Out of Stock',
  },
  profile: {
    tabName: 'Profile',
  },
  activity: {
    tabName: 'Activity',
  },
  feedback: {
    tabName: 'Feedback',
  },
  promotions: {
    tabName: 'Promotion',
  },
  maps: {
    tabName: 'Maps',
  },
};

export const asm = {
  asm: {
    mainLogoLabel: 'SAP',
    mainTitle: 'Assisted Service Mode',
    logout: 'Sign Out',
    hideUi: 'Close ASM',
    toggleUi: {
      collapse: 'Hide ASM',
      expand: 'Show ASM',
    },
    loginForm: {
      submit: 'Sign In',
      userId: {
        label: 'Agent ID',
        required: 'Agent ID is required',
      },
      password: {
        label: 'Password',
        required: 'Password is required',
      },
    },
    customerSearch: {
      searchTerm: {
        label: 'Customer Name/Email Address',
      },
      submit: 'Start Session',
      noMatch: 'No customer found.',
    },
    bindCart: {
      cartNumber: 'Cart Number',
      bindCartToCustomer: 'Assign Cart to Customer',
      success: 'Cart has been successfully assigned',
      error: 'Cart failed to be assigned',
    },
    profileAddresses: {
      billingAddress: 'Billing Address',
      deliveryAddress: 'Delivery Address',
      phone1: 'Phone1',
      phone2: 'Phone2',
      paymentMethodHeader: 'Saved Payment Methods',
    },
    customer360,
    customerOverview: {
      activeCart: 'Active Cart',
      activeCartCode: 'Active Cart {{code}}',
      totalNoItems: 'Total No. Items {{count}}',
      totalPrice: 'Total Price {{price}}',
      noActiveCart: 'There are currently no Active Cart Items',
      savedCartCode: 'Last Saved Cart {{code}}',
      savedCart: 'Last Saved Cart',
      noSavedCart: 'There are currently no Saved Cart items',
      interests: 'Interests',
      noInterests: 'There are currently no Interest items',
      inStock: 'In Stock',
      lowStock: 'Low Stock',
      outOfStock: 'Out of Stock',
    },
    csagentTokenExpired: 'Your customer support agent session is expired.',
    endSession: 'End Session',
    agentSessionTimer: {
      label: 'Session Timeout',
      minutes: 'min',
      reset: 'Reset',
    },
    auth: {
      agentLoggedInError:
        'Cannot login as user when there is an active CS agent session. Please either emulate user or logout CS agent.',
    },
    error: {
      noCustomerId:
        'No customerId found for selected user. Session cannot be started.',
    },
  },
};
