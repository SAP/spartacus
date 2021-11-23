import {
  visitCartPage,
  waitForCartPageData,
} from '../../../helpers/b2b/b2b-saved-cart';
import * as checkoutBackoff from '../../../helpers/checkout-backoff';
import { fillPaymentForm } from '../../../helpers/checkout-flow';
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

      checkoutBackoff.waitForShippingAddressAndDeliveryModeSetdata();
      checkoutBackoff.visitCheckoutPaymentDetailsPage();
    });

    it('should verify backoff mechanism in checkout', () => {
      // intercept for route
      fillPaymentForm();
      // do the 3 assert test (fail, fail, pass)
    });
  });
});
