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
