import { RoutesTranslations } from '../routes-config';

export const defaultStorefrontRoutesTranslations: {
  default?: RoutesTranslations;
  [languageCode: string]: RoutesTranslations;
} = {
  default: {
    home: { paths: ['', 'cx-preview'] },
    cart: { paths: ['cart'] },
    search: { paths: ['search/:query'] },
    login: { paths: ['login'] },
    register: { paths: ['register'] },
    resetPassword: { paths: ['reset-new-password/:token'] },
    forgotPassword: { paths: ['reset-password'] },
    checkout: { paths: ['checkout'] },
    orderConfirmation: { paths: ['order-confirmation'] },
    product: {
      paths: ['product/:productCode'],
      paramsMapping: { productCode: 'code' }
    },
    category: {
      paths: ['category/:categoryCode'],
      paramsMapping: { categoryCode: 'code' }
    },
    brand: { paths: ['Brands/:brandName/c/:brandCode'] },
    storeFinder: {
      paths: ['store-finder'],
      children: {
        searchResults: { paths: ['find-stores'] },
        allStores: { paths: ['view-all-stores'] },
        listStores: {
          paths: ['country/:country/region/:region', 'country/:country']
        },
        storeDescription: {
          paths: ['country/:country/region/:region/:store']
        }
      }
    },
    termsAndConditions: { paths: ['terms-and-conditions'] },
    contact: { paths: ['contact'] },
    help: { paths: ['faq'] },
    sale: { paths: ['sale'] },
    orders: { paths: ['my-account/orders'] },
    orderDetails: {
      paths: ['my-account/orders/:orderCode'],
      paramsMapping: { orderCode: 'code' }
    },
    addressBook: { paths: ['my-account/address-book'] },
    paymentManagement: { paths: ['my-account/payment-details'] },
    pageNotFound: { paths: ['**'] }
  },

  // 'en' should remain here until we support localized routes for all languages
  // Currently we use hardcoded 'en' key that extends all 'default' translations in runtime
  en: {} as any
};
