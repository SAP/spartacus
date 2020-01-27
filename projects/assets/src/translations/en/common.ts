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
    checkout: {
      title: 'Checkout {{count}} item',
      title_plural: 'Checkout {{count}} items',
    },
    search: {
      title: '{{count}} result for "{{query}}"',
      title_plural: '{{count}} results for "{{query}}"',
      findProductTitle: '{{count}} result for coupon "{{coupon}}"',
      findProductTitle_plural: '{{count}} results for coupon "{{coupon}}"',
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
  navigation: {
    shopAll: 'Shop all {{ navNode}} >',
  },
  searchBox: {
    placeholder: 'Search here...',
    help: {
      insufficientChars: 'Please type more characters',
      noMatch: 'We could not find any results',
      exactMatch: '{{ term }}',
      empty: 'Ask us anything',
    },
  },
  sorting: {
    date: 'Date',
    orderNumber: 'Order Number',
    rma: 'Return Number',
  },
  httpHandlers: {
    badGateway: 'A server error occurred. Please try again later.',
    badRequestPleaseLoginAgain: '{{ errorMessage }}. Please login again.',
    badRequestOldPasswordIncorrect: 'Old password incorrect.',
    conflict: 'Already exists',
    forbidden: 'You are not authorized to perform this action.',
    gatewayTimeout: 'The server did not respond, please try again later.',
    internalServerError:
      'An Internal Server Error occurred. Please try again later.',
    unknownError: 'An unknown error occurred',
    validationErrors: {
      missing: {
        card_cardType:
          'The selected credit card is not supported. Please select another.',
        card_accountNumber: 'The credit card number entered is not valid.',
        card_cvNumber: 'The security code entered is not valid.',
        card_expirationMonth:
          'The credit card expiration date entered is not valid.',
        card_expirationYear:
          'The credit card expiration date entered is not valid.',
        billTo_firstName: 'The first name entered is not valid.',
        billTo_lastName: 'The last name entered is not valid.',
        billTo_street1: 'The address entered is not valid.',
        billTo_street2: 'The address entered is not valid.',
        billTo_city: 'The city entered is not valid for this credit card.',
        billTo_state:
          'The state/province entered is not valid for this credit card.',
        billTo_country:
          'The country entered is not valid for this credit card.',
        billTo_postalCode:
          'The zip/postal code is not valid for this credit card.',
        country: {
          isocode: 'Missing country',
        },
      },
      invalid: {
        card_expirationMonth:
          'The credit card expiration date entered is not valid.',
        firstName: 'First Name entered is not valid.',
        lastName: 'Last Name entered is not valid.',
        password: 'Password entered is not valid.',
        uid: 'UID is not valid.',
      },
    },
    cartNotFound: 'Cart not found.',
  },
  miniCart: {
    item: '{{count}} item currently in your cart',
    item_plural: '{{count}} items currently in your cart',
  },
  miniLogin: {
    userGreeting: 'Hi, {{name}}',
    signInRegister: 'Sign In / Register',
  },
  skipLink: {
    skipTo: 'Skip to',
    labels: {
      header: 'Header',
      main: 'Main Content',
      footer: 'Footer',
      productFacets: 'Product Facets',
      productList: 'Product List',
    },
  },
};
