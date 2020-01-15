import * as login from '../../../helpers/login';
import { checkoutWithVariantsTest } from '../../../helpers/checkout-with-variants';

context('Checkout - With product Variants', () => {
  describe('Apparel', () => {
    before(() => {
      configureApparelProduct();
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    checkoutWithVariantsTest();

    afterEach(() => {
      cy.saveLocalStorage();
    });

    after(() => {
      login.signOutUser();
    });
  });
});

function configureApparelProduct() {
  cy.window().then(win => win.sessionStorage.clear());
  cy.cxConfig({
    context: {
      baseSite: ['apparel-uk-spa'],
      currency: ['GBP'],
    },
  });
}
