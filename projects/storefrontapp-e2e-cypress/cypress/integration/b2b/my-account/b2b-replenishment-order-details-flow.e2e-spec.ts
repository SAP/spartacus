import { loginB2bUser } from '../../../helpers/b2b/b2b-checkout';
import * as replenishmentDetails from '../../../helpers/b2b/b2b-replenishment-order-details';
import {
  PLACE_ORDER_REQUEST,
  POWERTOOLS_BASESITE,
  USER_REQUEST_CHANNEL,
} from '../../../sample-data/b2b-checkout';

describe('Replenishment order details', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    Cypress.env('USER', USER_REQUEST_CHANNEL);
    Cypress.env('ORDER', PLACE_ORDER_REQUEST);
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

  it('should be able to cancel a replenishment order details', () => {
    replenishmentDetails.cancelReplenishmentDetails();
  });
});
