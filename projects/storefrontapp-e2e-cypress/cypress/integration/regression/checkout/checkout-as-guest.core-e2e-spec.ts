import { CheckoutConfig } from '@spartacus/storefront';
import { assertAddressForm } from '../../../helpers/address-book';
import * as guestCheckout from '../../../helpers/checkout-as-guest';
import * as checkout from '../../../helpers/checkout-flow';
import { validateUpdateProfileForm } from '../../../helpers/update-profile';
import { viewportContext } from '../../../helpers/viewport-context';
import {
  cheapProduct,
  getSampleUser,
} from '../../../sample-data/checkout-flow';
context('Checkout as guest', () => {
  let user;
  viewportContext(['desktop'], () => {
    before(() => {
      user = getSampleUser();
      cy.window().then((win) => win.sessionStorage.clear());
    });

    beforeEach(() => {
      cy.cxConfig({ checkout: { guest: true } } as CheckoutConfig);
    });

    it('should perform checkout as guest and create a user account', () => {
      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCartAndProceedToCheckout();

      cy.get('.register').findByText(/Guest Checkout/i);

      guestCheckout.loginAsGuest(user);

      checkout.fillAddressFormWithCheapProduct();
      checkout.verifyDeliveryMethod();
      checkout.fillPaymentFormWithCheapProduct();
      checkout.placeOrderWithCheapProduct();
      checkout.verifyOrderConfirmationPageWithCheapProduct();

      guestCheckout.createAccountFromGuest(user.password);

      cy.selectUserMenuOption({
        option: 'Address Book',
      });

      assertAddressForm(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          phone: '',
          address: user.address,
        },
        'US-CA'
      );

      cy.selectUserMenuOption({
        option: 'Payment Details',
      });

      cy.get('.cx-payment .cx-body').then(() => {
        cy.get('cx-card').should('exist');
      });

      cy.selectUserMenuOption({
        option: 'Personal Details',
      });

      validateUpdateProfileForm('mr', user.firstName, user.lastName);
      checkout.signOut();
    });
  });
});
