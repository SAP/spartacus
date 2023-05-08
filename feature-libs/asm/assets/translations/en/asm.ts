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
    createCustomerSuccessfullyAlert:
      'The customer account has been created and the customer session has started.',
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
      noMatchResult: 'This account cannot be found. ',
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
        byUnit: 'Unit (Asc)',
        byUnitDesc: 'Unit (Desc)',
      },
      page: {
        page: 'Page {{count}}',
        previous: 'Previous',
        next: 'Next',
      },
      noOfCustomers: '{{count}} Customers',
      noCustomers: 'There are currently no customers in this customer list.',
      noLists:
        'There are currently no customer lists available. Contact your system administrator.',
      listsError:
        'The customer lists could not be retrieved. Please try again later.',
      searchBox: 'Search',
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
