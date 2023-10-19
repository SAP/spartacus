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
      checkTermsAndConditionsFirst:
        'You must agree Terms & Conditions to see available payment options.',
      errors: {
        loadActiveConfigurations:
          'We are unable to load payment options at this time. Please try again later.',
        noActiveConfigurations:
          'There are no payment options available at this time. Please try again later or contact support.',
        updateBillingAddress:
          'The address could not be updated. Please check that the address information is correct and that your device is connected to the internet. If the problem persists, you may need to clear your cart and start the checkout again.',
      },
    },
  },
};
