import { CheckoutConfig } from '@spartacus/storefront';
import * as guestCheckout from '../../../helpers/checkout-as-guest';
import { viewportContext } from '../../../helpers/viewport-context';
context('Checkout as guest', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      guestCheckout.generateGuestUser();
      cy.window().then((win) => win.sessionStorage.clear());
    });

    beforeEach(() => {
      cy.cxConfig({ checkout: { guest: true } } as CheckoutConfig);
    });

    guestCheckout.testCheckoutAsGuest();
  });
});
