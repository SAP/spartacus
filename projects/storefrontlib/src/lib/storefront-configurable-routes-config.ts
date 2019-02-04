import { RouteTranslation, ConfigurableRoutesConfig } from '@spartacus/core';

export interface StorefrontRoutesTranslations {
  // Those keys are listed explicitly for intellisense:
  home?: RouteTranslation;
  cart?: RouteTranslation;
  search?: RouteTranslation;
  login?: RouteTranslation;
  register?: RouteTranslation;
  resetPassword?: RouteTranslation;
  forgotPassword?: RouteTranslation;
  checkout?: RouteTranslation;
  orderConfirmation?: RouteTranslation;
  product?: RouteTranslation;
  category?: RouteTranslation;
  brand?: RouteTranslation;
  storeFinder?: {
    paths?: string[];
    children?: {
      searchResults?: RouteTranslation;
      allStores?: RouteTranslation;
      listStores?: RouteTranslation;
      storeDescription?: RouteTranslation;
    };
  };
  termsAndConditions?: RouteTranslation;
  contact?: RouteTranslation;
  help?: RouteTranslation;
  sale?: RouteTranslation;
  orders?: RouteTranslation;
  orderDetails?: RouteTranslation;
  addressBook?: RouteTranslation;
  paymentManagement?: RouteTranslation;
  pageNotFound?: RouteTranslation;

  [customRouteName: string]: RouteTranslation; // allow custom routes names
}

export interface StorefrontConfigurableRoutesConfig
  extends ConfigurableRoutesConfig {
  routes?: {
    config?: {
      translations?: {
        default?: StorefrontRoutesTranslations;
        [languageCode: string]: StorefrontRoutesTranslations;
      };
    };
    fetch?: boolean;
  };
}
