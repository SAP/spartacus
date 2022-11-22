import { verifyGroupSkippingFromConfig } from '../../helpers/accessibility/group-skipping/group-skipping';
import {
  groupSkippingConfigCheckout,
  groupSkippingConfigMyAccount,
  groupSkippingConfigNotLoggedIn,
} from '../../helpers/accessibility/group-skipping/group-skipping.config';
import { checkoutNextStep } from '../../helpers/accessibility/tabbing-order';
import * as checkout from '../../helpers/checkout-flow';

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

      cy.get('input[type=radio][formcontrolname=deliveryModeId]')
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
