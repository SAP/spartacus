import { visitHomePage } from '../../../helpers/checkout-flow';
import { orderHistoryTest } from '../../../helpers/order-history';
import {
  b2bAccountShipToUser,
  PLACE_ORDER_REQUEST,
  POWERTOOLS_BASESITE,
  USER_REQUEST_CHANNEL,
} from '../../../sample-data/b2b-checkout';

describe('Order History with no orders', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    Cypress.env('USER', USER_REQUEST_CHANNEL);
    Cypress.env('ORDER', PLACE_ORDER_REQUEST);
    visitHomePage();
  });

  orderHistoryTest.checkRedirectNotLoggedInUser();
  orderHistoryTest.checkRedirectLoggedInUser(b2bAccountShipToUser);
  orderHistoryTest.checkStartShoppingButton();
});
