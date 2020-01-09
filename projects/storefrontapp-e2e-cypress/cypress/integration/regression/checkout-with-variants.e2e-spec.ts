import { checkoutWithVariants } from '../../helpers/checkout-with-variants';
import * as login from '../../helpers/login';
import { retrieveTokenAndLogin } from '../../helpers/checkout-as-persistent-user';

describe('Checkout - With Product Variants', () => {
  before(() =>
    cy.window().then(win => {
      win.sessionStorage.clear();
    })
  );

  describe('checkout test as a persistent user', () => {
    before(() => {
      retrieveTokenAndLogin();
      cy.reload();
      cy.visit('/');
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    checkoutWithVariants();

    afterEach(() => {
      cy.saveLocalStorage();
    });

    after(() => {
      login.signOutUser();
    });
  });
});
