import { loginUser } from '../../../helpers/checkout-flow';
import * as helper from '../../../helpers/vendor/subscrption-billing/subscrption';
import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';

describe('Cancel Resubscribe Withdraw subscription billing Order Flow', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    cy.visit('/powertools-spa/en/USD/login');
    loginUser(helper.serviceUser);  // pass the user object here
  });

  it('should click on Manage Service for the first active subscription', () => {
    helper.clickManageServiceForActiveSubscription();
  });
  it('should cancel subscription if cancel button exists', () => {
  helper.cancelSubscriptionIfPossible();
});
});
