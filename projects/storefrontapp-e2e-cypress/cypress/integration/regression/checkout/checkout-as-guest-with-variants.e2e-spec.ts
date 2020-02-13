import { CheckoutConfig } from '@spartacus/storefront';
import { checkoutAsGuestWithVariantsTest } from '../../../helpers/checkout-as-guest-with-variants';
import { configureApparelProduct } from '../../../helpers/checkout-with-variants';

context('Checkout as guest', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.cxConfig({ checkout: { guest: true } } as CheckoutConfig);
    configureApparelProduct();
  });
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  checkoutAsGuestWithVariantsTest();

  afterEach(() => {
    cy.saveLocalStorage();
  });
});
