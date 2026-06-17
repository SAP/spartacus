/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject } from '@angular/core';
import { FeatureToggles, RoutesConfig, RoutingConfig } from '@spartacus/core';

export const defaultRoutesConfigFactory: () => RoutingConfig = () => {
  const featureToggles = inject(FeatureToggles);

  const routingConfig: RoutingConfig = {
    routing: {
      routes: {
        home: { paths: [''] },
        notFound: { paths: ['not-found'] },

        // semantic links for login related pages
        login: {
          /*
           * New auth flow requires 2 paths for login trigger and login form
           * where we are redirected from oauth server.
           * Legacy path will stay, new one is updated.           *
           */
          paths: [
            featureToggles.authorizationCodeFlowByDefault ? 'sign-in' : 'login',
          ],
          protected: false,
          authFlow: true,
        },
        verifyToken: {
          paths: ['login/verify-token'],
          protected: false,
          authFlow: true,
        },
        verifyTokenForRegistration: {
          paths: ['register/verify-token'],
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
          paths: ['product/:productCode/:name', 'product/:productCode'],
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
      },
    },
  };
  /*
   * Configuration necessary to allow customization of login form path,
   * which have to be the same as configured in oauth client
   */
  if (featureToggles.authorizationCodeFlowByDefault) {
    (routingConfig.routing?.routes as RoutesConfig)['loginForm'] = {
      paths: ['login'],
      protected: false,
      authFlow: true,
    };
  }

  return routingConfig;
};
