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
    badRequest: '{{ errorMessage }}. Please login again.',
    badRequestPasswordMismatch: 'Old password incorrect.', // consider using translate's context functionality here as there are multiple responses possible (TODO)
    conflict: 'Already exists',
    forbidden: 'You are not authorized to perform this action.',
    gatewayTimeout: 'The server did not responded, please try again later.',
    unknownError: 'An unknown error occured',
  },
};
