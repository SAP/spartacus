export interface RouteTranslation {
  paths?: string[];
  paramsMapping?: ParamsMapping;
  children?: RoutesTranslations;
}

export interface RoutesTranslations {
  [pageName: string]: RouteTranslation;
}

// spike todo bring back and provide strong typing
// interface StandardRoutesTranslations {
//   // spike todo use it somewhere for strong typing
//   homepage?: RouteTranslation;
//   cart?: RouteTranslation;
//   search?: RouteTranslation;
//   login?: RouteTranslation;
//   register?: RouteTranslation;
//   resetNewPassword?: RouteTranslation;
//   resetPassword?: RouteTranslation;
//   checkout?: RouteTranslation;
//   orderConfirmation?: RouteTranslation;
//   product?: RouteTranslation;
//   category?: RouteTranslation;
//   storeFinder?: RouteTranslation;
//   storeFinderSearchResult?: RouteTranslation;
//   storeFinderAllStores?: RouteTranslation;
//   storeFinderListStores?: RouteTranslation;
//   storeFinderStoreDescription?: RouteTranslation;
//   contact?: RouteTranslation;
//   help?: RouteTranslation;
//   sale?: RouteTranslation;
//   myAccount_orders?: RouteTranslation;
//   myAccount_orderDetails?: RouteTranslation;
//   pageNotFound?: RouteTranslation;

//   // allow custom pages
//   [pageName: string]: RouteTranslation;
// }

// root level properties bellow should match those from RoutesTranslations interface:
// export interface ParameterNamesMapping {
//   product?: { [_: string]: string };
//   category?: { [_: string]: string };
//   myAccount_orderDetails?: { [_: string]: string };

//   // allow custom pages
//   [pageName: string]: {
//     [_: string]: string;
//   };
// }

export interface ParamsMapping {
  [paramName: string]: string;
}

export interface RoutesConfig {
  translations?: {
    default?: RoutesTranslations;
    [languageCode: string]: RoutesTranslations;
  };

  fetch?: boolean;
}

// spike todo: when adding new properties below, please add them also to relevant interfaces above
const defaultTranslations: {
  default?: RoutesTranslations;
  [languageCode: string]: RoutesTranslations;
} = {
  default: {
    homepage: { paths: [''] },
    cart: { paths: ['cart'] },
    search: { paths: ['search/:query'] },
    login: { paths: ['login'] },
    register: { paths: ['register'] },
    resetNewPassword: { paths: ['reset-new-password/:token'] },
    resetPassword: { paths: ['reset-password'] },
    checkout: { paths: ['checkout'] },
    orderConfirmation: { paths: ['order-confirmation'] },
    product: {
      paths: ['product/:productCode'],
      paramsMapping: { productCode: 'code' }
    },
    category: {
      paths: [
        'category/:categoryCode/:title',
        'category/:categoryCode',
        'Brands/:brandName/c/:brandCode'
      ],
      paramsMapping: { categoryCode: 'code' }
    },
    storeFinder: {
      paths: ['store-finder'],
      children: {
        searchResult: { paths: ['find-stores'] },
        allStores: { paths: ['view-all-stores'] },
        listStores: {
          paths: ['country/:country/region/:region', 'country/:country']
        },
        storeDescription: {
          paths: ['country/:country/region/:region/:store']
        }
      }
    },

    contact: { paths: ['contact'] },
    help: { paths: ['faq'] },
    sale: { paths: ['sale'] },
    myAccount_orders: { paths: ['my-account/orders'] },
    myAccount_orderDetails: {
      paths: ['my-account/orders/:orderCode'],
      paramsMapping: { orderCode: 'code' }
    },
    pageNotFound: { paths: ['**'] }
  },
  en: {}
};

export const defaultRoutesConfig: RoutesConfig = {
  translations: defaultTranslations,

  fetch: false
};
