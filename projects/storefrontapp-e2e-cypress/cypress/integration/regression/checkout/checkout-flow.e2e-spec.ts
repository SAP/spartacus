import * as checkout from '../../../helpers/checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';
import { getSampleUser } from '../../../sample-data/checkout-flow';

context('Checkout flow', () => {
  viewportContext(['desktop'], () => {
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

      checkout.goToShippingAddresses();
      cy.get('cx-spinner').should('not.exist');
      cy.get('cx-shipping-address button')
        .contains('Continue')
        .should('not.be.disabled');
      cy.tabScreenshot({
        container: 'main',
        scenario: 'shipping-address',
      });
      cy.get('cx-shipping-address button').contains('Add New Address').click();
      // TODO: Include when ng-select is removed from Spartacus
      // cy.tabScreenshot({
      //   container: 'main',
      //   scenario: 'shipping-address-form',
      // });
      cy.get('cx-shipping-address button').contains('Choose address').click();
      cy.get('cx-shipping-address button').contains('Continue').click();

      cy.get('cx-spinner').should('not.exist');
      cy.get('cx-delivery-mode button')
        .contains('Continue')
        .should('not.be.disabled');
      cy.tabScreenshot({
        container: 'main',
        scenario: 'delivery-modes',
      });
      cy.get('cx-delivery-mode button').contains('Continue').click();

      cy.get('cx-payment-method button')
        .contains('Continue')
        .should('not.be.disabled');
      cy.tabScreenshot({
        container: 'main',
        scenario: 'payment-method',
      });
      cy.get('cx-payment-method button').contains('Add New Payment').click();
      // TODO: Include when ng-select is removed from Spartacus
      // cy.tabScreenshot({
      //   container: 'main',
      //   scenario: 'payment-methods-form',
      // });
      cy.get('cx-payment-method button').contains('Change Payment').click();
      cy.get('cx-payment-method button').contains('Continue').click();

      cy.get(
        'cx-place-order input[formcontrolname="termsAndConditions"]'
      ).check();
      cy.get('cx-place-order button')
        .contains('Place Order')
        .should('not.be.disabled');
      cy.tabScreenshot({
        container: 'main',
        scenario: 'review-order',
      });
      cy.get(
        'cx-place-order input[formcontrolname="termsAndConditions"]'
      ).uncheck();

      checkout.placeOrderWithCheapProduct(user);
      checkout.verifyOrderConfirmationPageWithCheapProduct(user);

      cy.tabScreenshot({
        container: 'main',
        scenario: 'order-confirmation',
      });

      cy.saveLocalStorage();
    });

    xit('should check keyboard accessibility', () => {
      cy.restoreLocalStorage();

      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCartAndBeginCheckoutForSignedInCustomer();

      cy.get('cx-shipping-address');
      cy.get('cx-spinner').should('not.exist');
      cy.get('cx-shipping-address button')
        .contains('Continue')
        .should('not.be.disabled');

      cy.tabScreenshot({
        container: 'main',
        scenario: 'shipping-address',
      });

      checkout.goToDeliveryModes();
      cy.tabScreenshot({
        container: 'main',
        scenario: 'shipping-address',
      });

      checkout.goToPaymentDetails();
      cy.tabScreenshot({
        container: 'main',
        scenario: 'shipping-address',
      });

      checkout.goToReviewOrder();
      cy.tabScreenshot({
        container: 'main',
        scenario: 'shipping-address',
      });
    });
  });
});
