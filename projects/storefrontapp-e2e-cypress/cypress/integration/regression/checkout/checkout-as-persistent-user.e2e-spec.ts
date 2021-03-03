import {
  checkoutAsPersistentUserTest,
  retrieveTokenAndLogin,
} from '../../../helpers/checkout-as-persistent-user';
import * as login from '../../../helpers/login';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Checkout - As a Persistent User', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() =>
      cy.window().then((win) => {
        win.sessionStorage.clear();
      })
    );

    describe('Checkout test as a persistent user', () => {
      before(() => {
        retrieveTokenAndLogin();
        cy.visit('/');
      });

      checkoutAsPersistentUserTest();

      after(() => {
        login.signOutUser();
      });
    });
  });
});
