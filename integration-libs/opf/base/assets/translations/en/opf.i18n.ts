/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const opf = {
  opf: {
    payment: {
      errors: {
        proceedPayment:
          'We are unable to proceed with this payment method at this time. Please try again later or choose a different payment option.',
        cancelPayment:
          'You have cancelled your payment. To proceed with the order, try again, or choose a different payment option.',
        cardExpired: 'Card is expired.',
        insufficientFunds: 'Insufficient funds.',
        invalidCreditCard: 'Invalid credit card.  Please review card details.',
      },
    },
    address: {
      errors: {
        cannotUpdate:
          'The address could not be updated. Please check that the address information is correct and that your device is connected to the internet. If the problem persists, you may need to clear your cart and start the checkout again.',
      },
    },
  },
};
