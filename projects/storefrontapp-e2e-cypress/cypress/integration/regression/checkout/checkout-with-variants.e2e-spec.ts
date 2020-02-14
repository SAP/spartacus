import * as login from '../../../helpers/login';
import {
  checkoutWithVariantsTest,
  configureApparelProduct,
} from '../../../helpers/checkout-with-variants';
import { retrieveTokenAndLogin } from '../../../helpers/checkout-as-persistent-user';

context('Checkout - With product Variants', () => {
  describe('Apparel', () => {
    before(() => {
      retrieveTokenAndLogin();
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
