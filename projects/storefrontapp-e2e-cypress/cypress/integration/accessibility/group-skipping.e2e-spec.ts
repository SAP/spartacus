import {
  groupSkippingConfigNotLoggedIn,
  groupSkippingConfigMyAccount,
  groupSkippingConfigCheckout,
} from '../../helpers/accessibility/group-skipping/group-skipping.config';
import * as checkout from '../../helpers/checkout-flow';
import { verifyGroupSkippingFromConfig } from '../../helpers/accessibility/group-skipping/group-skipping';
import { checkoutNextStep } from '../../helpers/accessibility/tabbing-order';

context('Group Skipping - Not Logged In', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  verifyGroupSkippingFromConfig(groupSkippingConfigNotLoggedIn);
});

context('Group Skipping - My Account', () => {
  before(() => {
    cy.requireLoggedIn();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  verifyGroupSkippingFromConfig(groupSkippingConfigMyAccount);
});

context('Group Skipping - Checkout', () => {
  before(() => {
    cy.requireLoggedIn().then(() => {
      checkout.goToProductDetailsPage();
      checkout.addProductToCart();
      checkout.fillAddressForm();
      cy.get('input[type=radio][formcontrolname=deliveryModeId]:not(:disabled)')
        .first()
        .focus()
        .click();
      checkoutNextStep('/checkout/payment-details');
      checkout.fillPaymentForm();
      cy.get('.cx-review-summary-card');
      cy.saveLocalStorage();
    });
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  verifyGroupSkippingFromConfig(groupSkippingConfigCheckout);
});
