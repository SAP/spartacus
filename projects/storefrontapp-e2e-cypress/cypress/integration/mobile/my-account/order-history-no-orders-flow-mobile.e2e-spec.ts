import { waitForHomePage } from '../../../helpers/homepage';
import * as loginHelper from '../../../helpers/login';
import { orderHistoryTest } from '../../../helpers/order-history';
import { formats } from '../../../sample-data/viewports';
import { getAlert } from '../../../helpers/global-message';

describe(`${
  formats.mobile.width + 1
}p resolution - Order History with no orders`, () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.visit('/');

    waitForHomePage();

    loginHelper.registerUser();

    // waiting for post-register alert, so we don't abort register user request
    getAlert();
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  orderHistoryTest.checkRedirectNotLoggedInUser();
  orderHistoryTest.checkRedirectLoggedInUser();
  orderHistoryTest.checkStartShoppingButton();
});
