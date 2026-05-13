/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
    'customLoginPage',
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

export { cs as translationsCs } from './cs';
export { de as translationsDe } from './de';
export { en as translationsEn } from './en';
export { es as translationsEs } from './es';
export { es_CO as translationsEs_CO } from './es_CO';
export { fr as translationsFr } from './fr';
export { hi as translationsHi } from './hi';
export { hu as translationsHu } from './hu';
export { id as translationsId } from './id';
export { it as translationsIt } from './it';
export { ja as translationsJa } from './ja';
export { ko as translationsKo } from './ko';
export { pl as translationsPl } from './pl';
export { pt as translationsPt } from './pt';
export { ru as translationsRu } from './ru';
export { zh as translationsZh } from './zh';
export { zh_TW as translationsZh_TW } from './zh_TW';
