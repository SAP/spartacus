/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '../../config/occ-config';

export const defaultOccUserConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        /* eslint-disable max-len */
        paymentDetailsAll: 'users/${userId}/paymentdetails',
        paymentDetail: 'users/${userId}/paymentdetails/${paymentDetailId}',
        anonymousConsentTemplates: 'users/anonymous/consenttemplates',
        consentTemplates: 'users/${userId}/consenttemplates',
        consents: 'users/${userId}/consents',
        consentDetail: 'users/${userId}/consents/${consentId}',
        addresses: 'users/${userId}/addresses',
        addressDetail: 'users/${userId}/addresses/${addressId}',
        addressVerification: 'users/${userId}/addresses/verification',
        customerCoupons: 'users/${userId}/customercoupons',
        claimCoupon: 'users/${userId}/customercoupons/${couponCode}/claim',
        couponNotification:
          'users/${userId}/customercoupons/${couponCode}/notification',
        notificationPreference: 'users/${userId}/notificationpreferences',
        productInterests: 'users/${userId}/productinterests',
        getProductInterests:
          'users/${userId}/productinterests?fields=sorts,pagination,results(productInterestEntry,product(code))',
      },
    },
  },
};
