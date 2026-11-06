/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OPF_QUICK_BUY_DEFAULT_MERCHANT_NAME } from '../model';
import { OpfQuickBuyConfig } from './opf-quick-buy-config';

export const defaultOpfQuickBuyConfig: OpfQuickBuyConfig = {
  providers: {
    googlePay: {
      resourceUrl: 'https://pay.google.com/gp/p/js/pay.js',
      environment: 'TEST',
      paymentRequest: {
        apiVersion: 2,
        apiVersionMinor: 0,
        merchantInfo: {
          merchantId: '',
          merchantName: OPF_QUICK_BUY_DEFAULT_MERCHANT_NAME,
        },
        emailRequired: true,
        shippingAddressRequired: true,
        shippingOptionRequired: true,
        shippingAddressParameters: {
          phoneNumberRequired: false,
        },
        callbackIntents: [
          'PAYMENT_AUTHORIZATION',
          'SHIPPING_ADDRESS',
          'SHIPPING_OPTION',
        ],
      },
      cardParameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: [
          'AMEX',
          'DISCOVER',
          'INTERAC',
          'JCB',
          'MASTERCARD',
          'VISA',
        ],
        billingAddressRequired: true,
        billingAddressParameters: {
          format: 'FULL',
        },
      },
    },

    applePay: {
      resourceUrl:
        'https://applepay.cdn-apple.com/jsapi/1.latest/apple-pay-sdk.js',
      cardParameters: {
        shippingMethods: [],
        merchantCapabilities: ['supports3DS'],
        supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
        requiredShippingContactFields: ['email', 'name', 'postalAddress'],
        requiredBillingContactFields: ['email', 'name', 'postalAddress'],
      },
    },
  },
};
