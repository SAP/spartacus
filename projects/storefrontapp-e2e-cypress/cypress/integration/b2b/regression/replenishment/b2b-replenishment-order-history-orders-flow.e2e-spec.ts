import { loginB2bUser } from '../../../../helpers/b2b/b2b-checkout';
import * as replenishmentHistory from '../../../../helpers/b2b/b2b-replenishment-order-history';
import {
  ORDER_REQUEST_ENDPOINT,
  POWERTOOLS_BASESITE,
  USER_REQUEST_ENDPOINT,
} from '../../../../sample-data/b2b-checkout';

describe('Replenishment order history', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    Cypress.env('OCC_PREFIX_USER_ENDPOINT', USER_REQUEST_ENDPOINT);
    Cypress.env('OCC_PREFIX_ORDER_ENDPOINT', ORDER_REQUEST_ENDPOINT);
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('should be able to login as a b2b user', () => {
    loginB2bUser();
  });

  it('should be able to view order in replenishment order history', () => {
    replenishmentHistory.waitForReplenishmentOrders();
  });

  it('should be able to sort ', () => {
    replenishmentHistory.verifySorting();
  });

  it('should be able to cancel a replenishment', () => {
    replenishmentHistory.cancelReplenishmentInHistory();
  });
});
