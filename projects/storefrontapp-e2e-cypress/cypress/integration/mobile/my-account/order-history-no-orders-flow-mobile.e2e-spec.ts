import { formats } from '../../../sample-data/viewports';
import { user } from '../../../sample-data/checkout-flow';
import { register } from '../../../helpers/auth-forms';
import { orderHistoryTest } from '../../../helpers/order-history';

describe(`${formats.mobile.width +
  1}p resolution - Order History with no orders`, () => {
  const loginLink = 'cx-login [role="link"]';

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

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  orderHistoryTest.checkRedirectNotLoggedInUser();
  orderHistoryTest.checkRedirectLoggedInUser();
  orderHistoryTest.checkStartShoppingButton();
});
