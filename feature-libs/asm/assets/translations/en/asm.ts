/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const asm = {
  asm: {
    mainLogoLabel: 'SAP',
    mainTitle: 'Assisted Service Mode',
    logout: 'Sign Out',
    hideUi: 'Close ASM',
    customers: 'Customers',
    asmCustomer360Button: '360 Customer View',
    createCustomerSuccessfullyAlert:
      'The customer account has been created and the customer session has started.',
    saveInactiveCartAlertInfo:
      'The identified cart is an inactive cart. To take further actions on this cart, save it first.',
    activeCartAlertInfo: 'The identified cart is an active cart.',
    startCustomerEmulationAlertInfo:
      'Customer emulation has started. Any actions you do will reflect the effects on the customer account.',
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
      startEmulation: 'Start Emulation',
      noMatch: 'No customer found.',
      noMatchResult: 'This account cannot be found.',
      createCustomer: 'Create New Customer',
    },
    createCustomerForm: {
      title: 'Create New Customer',
      createAccount: 'Create',
      cancel: 'Cancel',
      firstName: {
        label: 'First Name',
        placeholder: 'First name',
      },
      lastName: {
        label: 'Last Name',
        placeholder: 'Last name',
      },
      emailAddress: {
        label: 'Email Address',
        placeholder: 'Email address',
      },
      createAccountAlert:
        'The customer session starts once you create the customer account.',
      validationErrors: {
        firstName: 'Enter a valid first name.',
        lastName: 'Enter a valid last name.',
        emailAddress: 'Enter a valid email address.',
      },
      badRequestDuplicatedEmail:
        'Enter a different email address as {{ emailAddress }} already exists.',
    },
    customerList: {
      title: 'Customer List',
      description: 'Select a customer from one of several provided lists.',
      createCustomer: 'Create New Customer',
      cancel: 'Cancel',
      tableHeader: {
        customer: 'Customer',
        customerName: 'Customer Name',
        name: 'Name',
        email: 'Email',
        emailId: 'Email/ID',
        phone: 'Phone',
        account: 'Account',
        cart: 'Cart',
        order: 'Order',
        view: '360 View',
      },
      tableSort: {
        sortBy: 'Sort by',
        byName: 'Name (Asc)',
        byNameAsc: 'Name (Asc)',
        byNameDesc: 'Name (Desc)',
        byDateAsc: 'Date (Asc)',
        byDateDesc: 'Date (Desc)',
        byOrderDateAsc: 'Order date (Asc)',
        byOrderDateDesc: 'Order date (Desc)',
        byUnit: 'Account (Asc)',
        byUnitDesc: 'Account (Desc)',
      },
      page: {
        page: 'Page {{count}}',
        previous: 'Previous',
        next: 'Next',
      },
      noOfCustomers: '{{count}} Customers',
      oneCustomer: '1 Customer',
      noCustomers: 'There are currently no customers in this customer list.',
      noLists:
        'There are currently no customer lists available. Contact your system administrator.',
      listsError:
        'The customer lists could not be retrieved. Please try again later.',
      searchBox: 'Search',
      enterSearchBox: 'Enter customer name or email',
    },
    switchCustomer: {
      dialog: {
        title: 'Warning',
        body: 'Clicking "Switch Customer" will end the emulation for "{{ customerA }}" and start for "{{ customerB }}". Any unsaved changes for "{{ customerA }}" will be lost.',
        actions: {
          switch: 'Switch Customer',
        },
      },
    },
    saveCart: {
      saveCartBtn: 'Save for Later',
      dialog: {
        saveInfo: 'Save the cart before you can take further actions.',
        disableInfo: 'Cannot save the cart as it is empty.',
        title: 'Save Cart',
        row: {
          id: 'ID',
          qty: 'Qty',
          total: 'Total',
        },
        actions: {
          save: 'Save for Later',
        },
      },
    },
    bindCart: {
      cartNumber: 'Cart Number',
      bindCartToCustomer: 'Assign Cart to Customer',
      success: 'Cart has been successfully assigned',
      assignCartId: 'Assign a cart id to customer',
      enterCartId: 'Enter cart id',
      resetCartId: 'Reset',
      dialog: {
        title: 'Assign Anonymous Cart',
        body: 'Do you want to replace the current active cart with the anonymous cart? If you replace the current active cart, it is saved as a saved cart.',
        actions: {
          replace: 'Replace Cart',
        },
      },
    },
    csagentTokenExpired: 'Your customer support agent session is expired.',
    endSession: 'End Session',
    endEmulation: 'End Emulation',
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
