export const common = {
  common: {
    cancel: 'Cancel',
    delete: 'Delete',
    remove: 'Remove',
    edit: 'Edit',
    back: 'Back',
    submit: 'Submit',
    continue: 'Continue',
    save: 'Save',
    done: 'Done',
    home: 'Home',
  },
  pageMetaResolver: {
    category: {
      title: '{{count}} result for {{query}}',
      title_plural: '{{count}} results for {{query}}',
    },
    content: {
      title: '{{content}}',
    },
    checkout: {
      title: 'Checkout {{count}} item',
      title_plural: 'Checkout {{count}} items',
    },
    cart: {
      title: '{{title}} ({{code}})',
    },
    search: {
      title: '{{count}} result for {{query}}',
      title_plural: '{{count}} results for {{query}}',
    },
    product: {
      description: '{{description}}',
      heading: '{{heading}}',
      title: '{{title}}',
    },
  },
  spinner: {
    loading: 'Loading...',
  },
  header: {
    skipToNavigation: 'Skip to navigation',
    skipToShoppingCart: 'Skip to shopping cart',
    skipToMainContent: 'Skip to main content',
    skipToFooter: 'Skip to Footer',
  },
  searchBox: {
    searchHere: 'Search here...',
  },
  sorting: {
    date: 'Date',
    orderNumber: 'Order Number',
  },
  httpHandlers: {
    badGateway: 'A server error occurred. Please try again later.',
    badRequestPleaseLoginAgain: '{{ errorMessage }}. Please login again.',
    badRequestOldPasswordIncorrect: 'Old password incorrect.',
    conflict: 'Already exists',
    forbidden: 'You are not authorized to perform this action.',
    gatewayTimeout: 'The server did not responded, please try again later.',
    unknownError: 'An unknown error occured',
  },
};
