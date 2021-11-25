import {
  visitCartPage,
  waitForCartPageData,
} from '../../../helpers/b2b/b2b-saved-cart';
import * as checkoutBackoff from '../../../helpers/checkout-backoff';
import { viewportContext } from '../../../helpers/viewport-context';
import * as sampleData from '../../../sample-data/checkout-flow';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

context('Checkout backoff test', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      clearAllStorage();
    });

    beforeEach(() => {
      cy.requireLoggedIn();
      waitForCartPageData(sampleData.product);
      visitCartPage();

      checkoutBackoff.waitForShippingAddressdata();
      checkoutBackoff.visitCheckoutDeliveryModePage();
    });

    it('should verify backoff mechanism in checkout', () => {
      let retry = 1;
      cy.intercept(
        `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/users/current/carts/*?fields=deliveryAddress(FULL),deliveryMode(FULL),paymentInfo(FULL)&lang=en&curr=USD`,
        (req) => {
          if (retry <= 3) {
            retry++;
            cy.log('retry fail', retry);
            req.reply({
              statusCode: 400,
              body: {
                errors: [
                  {
                    message: 'The application has encountered an error',
                    type: 'JaloObjectNoLongerValidError',
                  },
                ],
              },
            });
          } else {
            cy.log('retry success', retry);
            req.reply({
              statusCode: 200,
            });
          }
        }
      ).as('testBackoff');

      cy.wait(3000);

      cy.get('cx-delivery-mode input#deliveryMode-premium-gross')
        .first()
        .click({
          force: true,
        });

      cy.wait(`@testBackoff`).its('response.statusCode').should('eq', 400);
      cy.wait(`@testBackoff`).its('response.statusCode').should('eq', 400);
      cy.wait(`@testBackoff`).its('response.statusCode').should('eq', 400);

      // if you add this one, it will fail because the next one is expected to be 200
      // cy.wait(`@testBackoff`).its('response.statusCode').should('eq', 400);

      cy.wait(`@testBackoff`).its('response.statusCode').should('eq', 200);
    });
  });
});
