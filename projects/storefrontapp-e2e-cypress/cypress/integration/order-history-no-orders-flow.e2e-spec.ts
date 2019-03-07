import { user } from '../sample-data/big-happy-path';
import { register, login } from '../helpers/auth-forms';

describe('Order History with no orders', () => {
  const loginLink = 'cx-login [role="link"]';
  const orderHistoryLink = '/my-account/orders';

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');

    cy.get(loginLink).click();
    cy.get('cx-page-layout')
      .getByText('Register')
      .click();
    register(user);

    cy.selectUserMenuOption('Sign Out');
  });

  it('should redirect to login page if user is not logged in', () => {
    cy.visit(orderHistoryLink);
    cy.url().should('contain', '/login');
    cy.get('cx-login').should('contain', 'Sign In / Register');
  });

  it('should go to Order History once user has logged in', () => {
    login(user.email, user.password);
    cy.url().should('contain', orderHistoryLink);
    cy.get('.cx-order-history-header h3').should('contain', 'Order history');
  });

  it('should be able to start shopping from an empty Order History', () => {
    cy.get('.btn.btn-primary.btn-block.active')
      .getByText('Start Shopping')
      .click();

    cy.get('.ElectronicsHompageSplashBannerComponent');
  });
});
