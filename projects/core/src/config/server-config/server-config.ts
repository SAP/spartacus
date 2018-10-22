export abstract class ServerConfig {
  production?: boolean;
  server?: {
    baseUrl?: string;
    occPrefix?: string;
  };

  // TODO move to RoutesConfig
  routePaths?: {
    cart?: string;
    search?: string;
    login?: string;
    register?: string;
    resetNewPassword?: string;
    resetPassword?: string;
    checkout?: string;
    orderConfirmation?: string;
    products?: string;
    storeFinder?: string;

    // myAccount pages
    myAccount?: {
      orders?: string;
      paymentMethods?: string;
    };

    // content pages:
    contact?: string;
    help?: string;
    sale?: string;
  };
}

export const defaultServerConfig: ServerConfig = {
  server: {
    occPrefix: '/rest/v2/'
  },

  // TODO move to RoutesConfig
  // TODO consider if all those default routes shoyld be configured in separate modules
  // But do we need them also here in case they are not defined in separate modules then?
  routePaths: {
    // any need for homepage?
    // homepage: '',

    cart: 'cart',
    search: 'search',
    login: 'login',
    register: 'register',
    resetNewPassword: 'reset-new-password',
    resetPassword: 'reset-password',
    checkout: 'checkout',
    orderConfirmation: 'order-confirmation',
    products: 'products',
    storeFinder: 'store-finder',

    // myAccount pages
    myAccount: {
      orders: 'orders',
      paymentMethods: 'payment-methods'
    },

    // content pages:
    contact: 'contact',
    help: 'help',
    sale: 'sale'
  }
};
