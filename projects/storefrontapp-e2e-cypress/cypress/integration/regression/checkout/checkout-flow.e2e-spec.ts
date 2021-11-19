import * as checkout from '../../../helpers/checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';
import {
  filterUsingFacetFiltering,
  searchResult,
} from '../../../helpers/product-search';
import {
  carts,
  getSampleUser,
  products,
} from '../../../sample-data/checkout-flow';

import { AddressData, PaymentDetails } from '../../../helpers/checkout-forms';

context('Checkout flow', () => {
  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
    });

    it('should perform checkout', () => {
      const user = getSampleUser();
      checkout.visitHomePage();

      checkout.clickHamburger();

      checkout.registerUser(false, user);
      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCartAndLogin(user);
      checkout.fillAddressFormWithCheapProduct(user);
      checkout.verifyDeliveryMethod();
      checkout.fillPaymentFormWithCheapProduct(user);
      checkout.placeOrderWithCheapProduct(user);
      checkout.verifyOrderConfirmationPageWithCheapProduct(user);
    });

    it('should filter with faceting and perform checkout', () => {
      const user = getSampleUser();
      checkout.visitHomePage();

      checkout.clickHamburger();

      checkout.registerUser(false, user);
      searchResult();
      filterUsingFacetFiltering();

      checkout.addFirstResultToCartFromSearchAndLogin(user);

      checkout.fillAddressFormWithCheapProduct(user as AddressData, carts[1]);
      checkout.verifyDeliveryMethod();
      checkout.fillPaymentFormWithCheapProduct(user as PaymentDetails);
      checkout.placeOrderWithCheapProduct(user, carts[1]);
      checkout.verifyOrderConfirmationPageWithCheapProduct(user, products[1]);
    });
  });
});
