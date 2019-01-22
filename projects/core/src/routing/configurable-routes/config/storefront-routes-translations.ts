/**
 * Translations in this file cover only routes of Storefront lib
 *
 * Translations for custom pages are covered by RoutesTranslations interface
 */

import { ParamsMapping } from '../routes-config';

interface StorefrontRouteTranslation {
  paths?: string[];
  paramsMapping?: ParamsMapping;
}

export interface StorefrontRoutesTranslations {
  home?: StorefrontRouteTranslation;
  cart?: StorefrontRouteTranslation;
  search?: StorefrontRouteTranslation;
  login?: StorefrontRouteTranslation;
  register?: StorefrontRouteTranslation;
  resetPassword?: StorefrontRouteTranslation;
  forgotPassword?: StorefrontRouteTranslation;
  checkout?: StorefrontRouteTranslation;
  orderConfirmation?: StorefrontRouteTranslation;
  product?: StorefrontRouteTranslation;
  category?: StorefrontRouteTranslation;
  brand?: StorefrontRouteTranslation;
  storeFinder?: {
    paths?: string[];
    children?: {
      searchResults?: StorefrontRouteTranslation;
      allStores?: StorefrontRouteTranslation;
      listStores?: StorefrontRouteTranslation;
      storeDescription?: StorefrontRouteTranslation;
    };
  };
  termsAndConditions?: StorefrontRouteTranslation;
  contact?: StorefrontRouteTranslation;
  help?: StorefrontRouteTranslation;
  sale?: StorefrontRouteTranslation;
  orders?: StorefrontRouteTranslation;
  orderDetails?: StorefrontRouteTranslation;
  addressBook?: StorefrontRouteTranslation;
  pageNotFound?: StorefrontRouteTranslation;
}
