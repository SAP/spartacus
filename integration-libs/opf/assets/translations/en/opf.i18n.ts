/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const opf = {
  opf: {
    checkout: {
      tabs: {
        shipping: 'Shipping',
        deliveryMethod: 'Delivery Method',
        paymentAndReview: 'Payment & Review',
      },
      paymentAndReviewTitle: 'Payment and review',
      billingAddress: 'Billing Address',
      paymentOption: 'Payment option',
      termsAndConditions: 'Terms & Conditions',
      itemsToBeShipped: 'Items to be shipped',
      proceedPayment: 'Place Order',
      retryPayment: 'Retry to Continue',
      errors: {
        proceedPayment:
          'We are unable to proceed with this payment method at this time. Please try again later or choose a different payment option.',
        cancelPayment:
          'You have cancelled your payment. To proceed with the order, try again, or choose a different payment option.',
        cardExpired: 'Card is expired.',
        insufficientFunds: 'Insufficient funds.',
        invalidCreditCard: 'Invalid credit card.  Please review card details.',
        loadActiveConfigurations:
          'We are unable to load payment options at this time. Please try again later.',
      },
    },
  },
};
