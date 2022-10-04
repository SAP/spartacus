import {
  defaultAddress,
  defaultPaymentDetails,
  EMAIL_ADDRESS,
  fillAddressForm,
  fillPaymentForm,
  LOCATORS as L,
  login,
  mockLocation,
  register,
} from '../../../helpers/pickup-in-store-utils';
import { viewportContext } from '../../../helpers/viewport-context';

/*
- A guest user navigates to a PDP wishing to buy the product.
- The user has the choice of whether they want the product delivered (the default) or whether they want to pick it up in store.
- The user selects pickup in store.
- The user selects which store they want to collect from (by default the last store they selected, falling back to the nearest store). (NEEDS TO BE CORRECTED)
- The user adds the product to the cart. (The cart entries post call will have the "deliveryPointOfService" field).
- From the cart, the user can change the location they wish to pick up the product from.
- The user also add another item only for delivery.(Multiple items in cart)
- The user decides to login so the order will show in the user's account.
TODO:- The logged in user checks out.
TODO:- During checkout, the user can change the pickup location. (WIP)
TODO:- During the order review, the user can change the pickup location.
TODO:- The user completes checkout and sees the order details. On here they can see their pickup location for the picket item and the delivery for the delivered item. (WIP)
*/

describe('Pickup Delivery Option', () => {
  viewportContext(['desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.cxConfig({
        context: {
          baseSite: ['apparel-uk-spa'],
          currency: ['GBP'],
        },
      });
      cy.visit('/', mockLocation(53, 0));
      cy.get(L.ALLOW_COOKIES_BUTTON).click();
    });

    it('A user who has a cart with multiple entries checkout with BOPIS', () => {
      const url = new RegExp(
        `\/${encodeURIComponent(
          EMAIL_ADDRESS
        )}\/carts\/[0-9a-zA-Z|-]*\/entries`,
        'g'
      );

      cy.intercept({
        method: 'POST',
        url: /users\/anonymous\/carts\/[0-9a-zA-Z|-]*\/entries/,
      }).as('apiAddToCart');
      cy.intercept({
        method: 'PATCH',
        url: /users\/anonymous\/carts\/[0-9a-zA-Z|-]*\/entries/,
      }).as('changePickupInStore');
      cy.intercept({
        method: 'POST',
        url: '/authorizationserver/oauth/token',
      }).as('registerUser');
      cy.intercept({
        method: 'PATCH',
        url,
      }).as('changePickupInStoreInOrderReview');
      cy.get(L.HOME_PAGE_FIRST_PRODUCT).click();
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).should('be.visible');
      cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY).should('be.visible');
      cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY).should('be.checked');

      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).click();
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).should('be.checked');
      cy.get(L.USE_MY_LOCATION).click();
      cy.get(L.ACTIVE_PICK_UP_IN_STORE_BUTTON).first().click();

      cy.get(L.ADD_TO_CART).click();

      cy.wait('@apiAddToCart').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        expect(interception.request.body).to.have.property(
          'deliveryPointOfService'
        );
        cy.get(L.PICKUP_STORE_LOCATION)
          .invoke('text')
          .should(
            'be.equal',
            interception.request.body.deliveryPointOfService.name
          );
      });

      // Start of:- From the cart, the user can change the location they wish to pick up the product from.

      cy.get(L.VIEW_CART).click();
      cy.url().should('include', '/cart');
      cy.get(L.PICKUP_STORE_LOCATION).should('be.visible');
      cy.get(L.CHANGE_STORE_LINK).click();
      cy.get(L.PICKUP_IN_STORE_MODAL).should('exist');

      cy.get(L.ACTIVE_PICK_UP_IN_STORE_BUTTON).last().click();

      cy.wait('@changePickupInStore').then((interception) => {
        expect(interception.request.body).to.have.property(
          'deliveryPointOfService'
        );

        // Start of - The user also add another item only for delivery.(Multiple items in cart)
        cy.get(L.SAP_ICON_HOME_LINK).click();
        cy.get(L.HOME_PAGE_SECOND_PRODUCT).click();
        cy.get(L.ADD_TO_CART).click();
        cy.get(L.VIEW_CART).click();
        // End of - The user also add another item only for delivery.(Multiple items in cart)

        //Start of:- The user decides to login so the order will show in the user's account.

        register();

        cy.wait('@registerUser').then((_interception) => {
          login();
        });
        // End of:- The user decides to login so the order will show in the user's account.

        // Start of:- The logged in user checks out.
        cy.get(L.MINI_CART_BUTTON).click();
        cy.get(L.PROCEED_TO_CHECKOUT_BUTTON).should('be.visible').click();

        // Start of:- During checkout, the user fill address form.
        fillAddressForm(defaultAddress);
        cy.get(L.CHECKOUT_ADDRESS_FORM_SUBMIT_BUTTON).click();
        // End of:- During checkout, the user fill address form.

        // Start of:- During checkout, the user selects delivery mode.
        cy.get(L.CHECKOUT_DELIVERY_MODE_CONTINUE_BUTTON).click();
        // End of:- During checkout, the user selects delivery mode.

        // Start of:- During checkout, the user fill payment form.
        fillPaymentForm(defaultPaymentDetails);
        cy.get(L.CHECKOUT_PAYMENT_FORM_CONTINUE_BUTTON).click();
        // End of:- During checkout, the user fill payment form.

        //Start of:- order review
        cy.get(L.CHANGE_STORE_LINK).first().click();
        cy.get(L.PICKUP_IN_STORE_MODAL).should('exist');
        cy.get(L.USE_MY_LOCATION).click();

        cy.get(L.ACTIVE_PICK_UP_IN_STORE_BUTTON).last().click();

        cy.wait('@changePickupInStoreInOrderReview').then((interception) => {
          expect(interception.response.statusCode).to.equal(200);
          expect(interception.request.body).to.have.property(
            'deliveryPointOfService'
          );
        });

        cy.get(L.REVIEW_ORDER_TERM_CONDITION).click();
        cy.get(L.REVIEW_ORDER_SUBMIT).click();
        //End of:- order review
      });
    });
  });
});
