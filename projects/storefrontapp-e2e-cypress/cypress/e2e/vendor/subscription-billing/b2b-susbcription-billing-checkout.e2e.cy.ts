import * as helper from '../../../helpers/vendor/subscription-billing/subscription-billing';
import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';

describe('Susbscription Product Checkout Flow', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
  });
  it('should open a subscription product', () => {
    helper.openSubscriptionProduct(
      POWERTOOLS_BASESITE,
      'USD',
      helper.subscription_product_1.code
    );
    helper.verifySubscriptionProductDetails(helper.subscription_product_1);
  });
});
