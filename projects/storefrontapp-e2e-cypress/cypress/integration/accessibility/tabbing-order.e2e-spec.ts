import { registerUser, signOutUser } from '../../helpers/login';
import { closeAccountTabbingOrder } from '../../helpers/accessibility/tabbing-order/close-account';
import { tabbingOrderConfig as config } from '../../helpers/accessibility/tabbing-order.config';
import { footerTabbingOrder } from '../../helpers/accessibility/tabbing-order/footer';
import { loginTabbingOrder } from '../../helpers/accessibility/tabbing-order/login';
import { login } from '../../helpers/accessibility/tabbing-order';
import { registerTabbingOrder } from '../../helpers/accessibility/tabbing-order/register';
import { forgotPasswordTabbingOrder } from '../../helpers/accessibility/tabbing-order/reset-password';

context('Tabbing order', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
    registerUser();
  });

  describe('Close account', () => {
    it('should allow to navigate with tab key', () => {
      login();

      closeAccountTabbingOrder(config.closeAccount);

      signOutUser();
    });
  });

  describe('Footer', () => {
    it('should allow to navigate with tab key', () => {
      footerTabbingOrder(config.footer);
    });
  });

  describe('Login page', () => {
    it('should allow to navigate with tab key', () => {
      loginTabbingOrder(config.login);
    });
  });

  describe('Register page', () => {
    it('should verify tabbing order', () => {
      registerTabbingOrder(config.register);
    });
  });
  
  describe('Reset password', () => {
    it('should allow to navigate with tab key', () => {
      forgotPasswordTabbingOrder(config.resetPassword);
    });
  });
});
