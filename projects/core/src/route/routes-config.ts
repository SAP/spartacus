export interface RoutesTranslations {
  homepage?: string[];
  cart?: string[];
  search?: string[];
  login?: string[];
  register?: string[];
  resetNewPassword?: string[];
  resetPassword?: string[];
  checkout?: string[];
  orderConfirmation?: string[];
  product?: string[];
  category?: string[];
  storeFinder?: string[];
  storeDescription?: string[];
  storeList?: string[];
  contact?: string[];
  help?: string[];
  sale?: string[];
  myAccount_orders?: string[];
  myAccount_orderDetails?: string[];
  pageNotFound?: string[];

  // allow custom pages
  [pageName: string]: string[];
}

// root level properties bellow should match those from RoutesTranslations interface:
export interface ParameterNamesMapping {
  product?: {
    [_: string]: string;
  };
  category?: {
    [_: string]: string;
  };
  myAccount_orderDetails?: {
    [_: string]: string;
  };

  // allow custom pages:
  [pageName: string]: {
    [_: string]: string;
  };
}

export interface RoutesConfig {
  translations?: {
    default?: RoutesTranslations;
    [languageCode: string]: RoutesTranslations;
  };
  parameterNamesMapping?: ParameterNamesMapping;
}

// when adding new properties below, please add them also to relevant interfaces above
export const defaultRoutesConfig: RoutesConfig = {
  translations: {
    default: {
      homepage: [''],
      cart: ['cart'],
      search: ['search/:query'],
      login: ['login'],
      register: ['register'],
      resetNewPassword: ['reset-new-password/:token'],
      resetPassword: ['reset-password'],
      checkout: ['checkout'],
      orderConfirmation: ['order-confirmation'],
      product: ['product/:productCode'],
      category: [
        'category/:categoryCode/:title',
        'category/:categoryCode',
        'Brands/:brandName/c/:brandCode'
      ],
      storeFinder: ['store-finder'],
      storeDescription: ['store-finder/country/:country/region/:region/:store'],
      storeList: [
        'store-finder/country/:country/region/:region',
        'store-finder/country/:country'
      ],
      contact: ['contact'],
      help: ['faq'],
      sale: ['sale'],
      myAccount_orders: ['my-account/orders'],
      myAccount_orderDetails: ['my-account/orders/:orderCode'],
      pageNotFound: ['**']
    },
    en: {}
  },
  parameterNamesMapping: {
    product: {
      productCode: 'code'
    },
    category: {
      categoryCode: 'code'
    },
    myAccount_orderDetails: {
      orderCode: 'code'
    }
  }
};
