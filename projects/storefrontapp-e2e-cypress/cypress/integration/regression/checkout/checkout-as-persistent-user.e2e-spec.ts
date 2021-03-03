import {
  checkoutAsPersistentUserTest,
  retrieveTokenAndLogin,
} from '../../../helpers/checkout-as-persistent-user';
import * as login from '../../../helpers/login';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Checkout - As an existing User', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() =>
      cy.window().then((win) => {
        win.sessionStorage.clear();
        retrieveTokenAndLogin();
        cy.visit('/');
      })
    );

    checkoutAsPersistentUserTest();

    after(() => {
      login.signOutUser();
    });
  });
});
