import { user } from '../../../sample-data/checkout-flow';
import { register } from '../../../helpers/auth-forms';
import { orderHistoryTest } from '../../../helpers/order-history';

describe('Order History with no orders', () => {
  const loginLink = 'cx-login [role="link"]';

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');

    cy.get(loginLink).click();
    cy.get('cx-page-layout')
      .getByText('Register')
      .click();
    register(user);

    cy.selectUserMenuOption({
      option: 'Sign Out',
    });
  });

  orderHistoryTest.checkRedirectNotLoggedInUser();
  orderHistoryTest.checkRedirectLoggedInUser();
  orderHistoryTest.checkStartShoppingButton();
});
