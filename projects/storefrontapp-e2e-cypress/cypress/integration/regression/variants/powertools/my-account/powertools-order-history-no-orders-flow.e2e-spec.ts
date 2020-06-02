import { visitHomePage } from '../../../../../helpers/checkout-flow';
import { orderHistoryTest } from '../../../../../helpers/order-history';
import { BASESITE_SPA } from '../../../../../sample-data/basesite-config';
import { variantUser } from '../../../../../sample-data/powertools-checkout-flow';

context('Powetools - Order History with no orders', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    Cypress.env('BASE_SITE', BASESITE_SPA.POWERTOOLS);
    visitHomePage();
  });

  orderHistoryTest.checkRedirectNotLoggedInUser();
  orderHistoryTest.checkRedirectLoggedInUser(variantUser);
  orderHistoryTest.checkStartShoppingButton(true);
});
