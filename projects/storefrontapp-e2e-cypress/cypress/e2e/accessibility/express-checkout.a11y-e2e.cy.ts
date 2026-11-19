/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckoutConfig } from '@spartacus/storefront';
import * as checkout from '../../helpers/checkout-flow';
import * as expressCheckout from '../../helpers/express-checkout';
import { viewportContext } from '../../helpers/viewport-context';
import { clearAllStorage } from '../../support/utils/clear-all-storage';
import { isolateTestsBefore } from '../../support/utils/test-isolation';

describe('Express Checkout Accessibility', { testIsolation: false }, () => {
  viewportContext(['mobile', 'desktop'], () => {
    isolateTestsBefore();

    before(() => {
      clearAllStorage();
      cy.a11yContinuumSetup();
      cy.cxConfig({ checkout: { express: true } } as CheckoutConfig);
      checkout.visitHomePage();
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    it('should show Shipping Address step when no default address/payment set', () => {
      expressCheckout.testExpressCheckout();
      cy.get('main').a11yRunContinuumTest();
    });

    it('should skip to Review step after setting address and payment', () => {
      checkout.fillAddressFormWithCheapProduct();
      checkout.verifyDeliveryOptions();
      checkout.fillPaymentFormWithCheapProduct(undefined, undefined, true);

      cy.get('main').a11yRunContinuumTest();
    });

    it('should correctly display Review page after default delivery mode change', () => {
      cy.cxConfig({
        checkout: {
          express: true,
          defaultDeliveryMode: ['MOST_EXPENSIVE'],
        },
      } as CheckoutConfig);

      checkout.visitHomePage();
      cy.get('cx-mini-cart').click();
      cy.findByText(/proceed to checkout/i).click();
      cy.get('main').a11yRunContinuumTest();
    });
  });
});
