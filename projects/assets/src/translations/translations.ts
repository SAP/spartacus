/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const translationChunksConfig = {
  common: [
    'common',
    'pageMetaResolver',
    'spinner',
    'navigation',
    'searchBox',
    'sorting',
    'httpHandlers',
    'miniCart',
    'skipLink',
    'carousel',
    'formErrors',
    'errorHandlers',
    'assistiveMessage',
    'passwordVisibility',
    'generalErrors',
    'formLegend',
    'chatMessaging',
  ],
  deliveryMode: ['setDeliveryMode'],
  myAccountV2Consent: ['myAccountV2Consent'],
  myAccountV2NotificationPreference: ['myAccountV2NotificationPreference'],
  myAccount: [
    'closeAccount',
    'updatePasswordForm',
    'updateProfileForm',
    'consentManagementForm',
    'myCoupons',
    'notificationPreference',
    'myInterests',
  ],
  payment: [
    'paymentForm',
    'paymentMethods',
    'paymentCard',
    'paymentTypes',
    'paymentMessages',
  ],
  pdf: ['pdf'],
  product: [
    'productDetails',
    'productList',
    'productFacetNavigation',
    'productSummary',
    'productReview',
    'productCarousel',
    'addToCart',
    'TabPanelContainer',
    'addToWishList',
    'stockNotification',
    'itemCounter',
    'productView',
  ],
  pwa: ['pwa'],
  siteThemeSwitcher: ['siteThemeSwitcher'],
  user: ['anonymousConsents', 'checkoutLogin', 'authMessages'],
  video: ['player'],
};

export { cs as translationsCs } from './cs/index';
export { de as translationsDe } from './de/index';
export { en as translationsEn } from './en/index';
export { es as translationsEs } from './es/index';
export { es_CO as translationsEs_CO } from './es_CO/index';
export { fr as translationsFr } from './fr/index';
export { hi as translationsHi } from './hi/index';
export { hu as translationsHu } from './hu/index';
export { id as translationsId } from './id/index';
export { it as translationsIt } from './it/index';
export { ja as translationsJa } from './ja/index';
export { ko as translationsKo } from './ko/index';
export { pl as translationsPl } from './pl/index';
export { pt as translationsPt } from './pt/index';
export { ru as translationsRu } from './ru/index';
export { zh as translationsZh } from './zh/index';
export { zh_TW as translationsZh_TW } from './zh_TW/index';
