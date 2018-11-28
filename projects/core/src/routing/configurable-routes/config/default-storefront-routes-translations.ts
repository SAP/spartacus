import { StorefrontRoutesTranslations } from './storefront-routes-translations';

export const defaultStorefrontRoutesTranslations: {
  default?: StorefrontRoutesTranslations;
  [languageCode: string]: StorefrontRoutesTranslations;
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
    termsAndConditions: { paths: ['terms-and-conditions'] },
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

  en: {} as any
};
