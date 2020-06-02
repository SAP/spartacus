import { visitHomePage } from '../../../../../helpers/checkout-flow';
import { orderHistoryTest } from '../../../../../helpers/order-history';
import { BASESITE_SPA } from '../../../../../sample-data/basesite-config';
import { variantUser } from '../../../../../sample-data/powertools-checkout-flow';
import { formats } from '../../../../../sample-data/viewports';

context(
  `${
    formats.mobile.width + 1
  }p resolution - Powertools - Order History with no orders`,
  () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.viewport(formats.mobile.width, formats.mobile.height);
      Cypress.env('BASE_SITE', BASESITE_SPA.POWERTOOLS);
      visitHomePage();
    });

    beforeEach(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
    });

    orderHistoryTest.checkRedirectNotLoggedInUser();
    orderHistoryTest.checkRedirectLoggedInUser(variantUser);
    orderHistoryTest.checkStartShoppingButton(true);
  }
);
