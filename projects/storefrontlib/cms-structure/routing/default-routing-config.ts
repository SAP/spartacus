/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutesConfig, RoutingConfig } from '@spartacus/core';

export const defaultStorefrontRoutesConfig: RoutesConfig = {
  home: { paths: [''] },
  notFound: { paths: ['not-found'] },

  // semantic links for login related pages
  login: {
    paths: ['login'],
    protected: false,
    authFlow: true,
  },
  register: {
    paths: ['login/register'],
    protected: false,
    authFlow: true,
  },
  forgotPassword: {
    paths: ['login/forgot-password'],
    protected: false,
    authFlow: true,
  },
  resetPassword: {
    paths: ['login/pw/change'],
    protected: false,
    authFlow: true,
  },
  logout: { paths: ['logout'], protected: false, authFlow: true },

  // plp routes
  search: { paths: ['search/:query'] },
  category: {
    paths: ['category/:categoryCode'],
    paramsMapping: { categoryCode: 'code' },
  },
  brand: { paths: ['Brands/:brandName/c/:brandCode'] },

  // pdp routes
  product: {
    paths: ['product/:productCode/:name'],
    paramsMapping: { productCode: 'code' },
  },

  termsAndConditions: { paths: ['terms-and-conditions'] },
  coupons: { paths: ['my-account/coupons'] },
  couponClaim: {
    paths: ['my-account/coupon/claim/:couponCode'],
    paramsMapping: { couponCode: 'code' },
  },
  myInterests: {
    paths: ['my-account/my-interests'],
  },
  notificationPreference: {
    paths: ['my-account/notification-preference'],
  },
};

export const defaultRoutingConfig: RoutingConfig = {
  routing: {
    routes: defaultStorefrontRoutesConfig,
  },
};
