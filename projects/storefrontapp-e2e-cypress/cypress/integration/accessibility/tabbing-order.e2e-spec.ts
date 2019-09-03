import { registerUser, signOutUser } from '../../helpers/login';
import { closeAccountTabbingOrder } from '../../helpers/accessibility/tabbing-order/close-account';
import { tabbingOrderConfig as config } from '../../helpers/accessibility/tabbing-order.config';
import { footerTabbingOrder } from '../../helpers/accessibility/tabbing-order/footer';
import { loginTabbingOrder } from '../../helpers/accessibility/tabbing-order/login';
import { login } from '../../helpers/accessibility/tabbing-order';
import { registerTabbingOrder } from '../../helpers/accessibility/tabbing-order/register';

context('Tabbing order', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
    registerUser();
  });

  describe('Close account', () => {
    it('should verify tabbing order', () => {
      login();

      closeAccountTabbingOrder(config.closeAccount);

      signOutUser();
    });
  });

  describe('Footer', () => {
    it('should verify tabbing order', () => {
      footerTabbingOrder(config.footer);
    });
  });

  describe('Login page', () => {
    it('should verify tabbing order', () => {
      loginTabbingOrder(config.login);
    });
  });

  describe('Register page', () => {
    it('should verify tabbing order', () => {
      registerTabbingOrder(config.register);
    });
  });
});
