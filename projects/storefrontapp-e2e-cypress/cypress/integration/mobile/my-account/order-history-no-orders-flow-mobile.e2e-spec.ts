import { waitForHomePage } from '../../../helpers/homepage';
import * as loginHelper from '../../../helpers/login';
import { orderHistoryTest } from '../../../helpers/order-history';
import { formats } from '../../../sample-data/viewports';

describe(`${formats.mobile.width +
  1}p resolution - Order History with no orders`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.visit('/');

    waitForHomePage();

    loginHelper.registerUser();

    loginHelper.loginUser();

    waitForHomePage();

    loginHelper.signOutUser();
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  orderHistoryTest.checkRedirectNotLoggedInUser();
  orderHistoryTest.checkRedirectLoggedInUser();
  orderHistoryTest.checkStartShoppingButton();
});
