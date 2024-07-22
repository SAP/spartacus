import { viewportContext } from '../../../helpers/viewport-context';
import * as checkoutMultiDVariants from '../../../helpers/checkout-multi-dimensional';
import {
  ELECTRONICS_BASESITE,
  ELECTRONICS_CURRENCY,
} from '../../../helpers/checkout-flow';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

context('Multi Dimensional - checkout flow', () => {
  viewportContext(['desktop', 'mobile'], () => {
    beforeEach(() => {
      clearAllStorage();
      Cypress.env('BASE_SITE', ELECTRONICS_BASESITE);
      Cypress.env('BASE_CURRENCY', ELECTRONICS_CURRENCY);
    });

    checkoutMultiDVariants.testCheckoutRegisteredUser();
  });
});
