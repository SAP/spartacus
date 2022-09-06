import {
  defaultAddress,
  defaultPaymentDetails,
  fillAddressForm,
  fillPaymentForm,
  isSorted,
  LOCATORS as L,
  LOCATORS,
  login,
  mockLocation,
  register,
} from '../../../helpers/pickup-in-store-utils';
import { viewportContext } from '../../../helpers/viewport-context';

/*
- A guest user navigates to a PDP wishing to buy the product.
- The user has the choice of whether they want the product delivered (the default) or whether they want to pick it up in store.
- The user selects pickup in store.
- The user selects which store they want to collect from (by default the last store they selected, falling back to the nearest store).
- The user adds the product to the cart. (The cart entries post call will have the "deliveryPointOfService" field).
- From the cart, the user can change the location they wish to pick up the product from.
- The user also add another item only for delivery.(Multiple items in cart)
The user decides to login so the order will show in the user's account.
The logged in user checks out.
During checkout, the user can change the pickup location.
During the order review, the user can change the pickup location.
The user completes checkout and sees the order details. On here they can see their pickup location for the picket item and the delivery for the delivered item.
*/

describe('Pickup Delivery Option: A user who has a cart with multiple entries checkout with BOPIS', () => {
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
      cy.visit('/product/300310300', mockLocation(53, 0));
    });

    it('The user has the choice of whether they want the product delivered (the default) or whether they want to pick it up in store', () => {
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).should('be.visible');
      cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY).should('be.visible');
      cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY).should('be.checked');
    });

    it('The user selects pickup in store and selects which store they want to collect from (by default the last store they selected, falling back to the nearest store).', () => {
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).click();
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).should('be.checked');
      cy.get(L.USE_MY_LOCATION).click();
      cy.get(L.STORE_DISTANCE).then(($distance) => {
        let distanceArr = $distance.text().split(' ');
        expect(isSorted(distanceArr)).to.be.true;
      });
      cy.get(L.ACTIVE_PICK_UP_IN_STORE_BUTTON).first().click();

      cy.get(L.ADD_TO_CART).click();

      cy.intercept({
        method: 'POST',
        url: /users\/anonymous\/carts\/[0-9| a-z|-]*\/entries/,
      }).as('apiAddToCart');

      cy.wait('@apiAddToCart').then((interception) => {
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

      cy.intercept({
        method: 'PATCH',
        url: /users\/anonymous\/carts\/[0-9| a-z|-]*\/entries/,
      }).as('changePickupInStore');

      cy.get(L.ACTIVE_PICK_UP_IN_STORE_BUTTON).last().click();

      cy.wait('@changePickupInStore').then((interception) => {
        expect(interception.request.body).to.have.property(
          'deliveryPointOfService'
        );

        // Start of - The user also add another item only for delivery.(Multiple items in cart)
        cy.visit('/product/300062456', mockLocation(53, 0));
        cy.get(L.ADD_TO_CART).click();
        cy.get(L.VIEW_CART).click();
        // End of - The user also add another item only for delivery.(Multiple items in cart)

        //Start of:- The user decides to login so the order will show in the user's account.
        cy.intercept({
          method: 'POST',
          url: '/authorizationserver/oauth/token',
        }).as('registerUser');

        register();

        cy.wait('@registerUser').then((_interception) => {
          login();
          cy.get(LOCATORS.PRODUCT_PAGE_TEMPLATE).should('be.visible');
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
        cy.get(L.CHECKOUT_DELIVERY_MODE_CONTINUE_BUTTON)
          .scrollIntoView()
          .click({ force: true });
        // End of:- During checkout, the user selects delivery mode.

        // Start of:- During checkout, the user fill payment form.
        fillPaymentForm(defaultPaymentDetails);
        cy.get(L.CHECKOUT_PAYMENT_FORM_CONTINUE_BUTTON).click();
        // End of:- During checkout, the user fill payment form.

        //Start of:- order review

        cy.get(L.REVIEW_ORDER_TERM_CONDITION).click();
        cy.get(L.REVIEW_ORDER_SUBMIT).click();
        //End of:- order review
      });
    });
    // it('Does user journey as described above', () => {
    //   // TODO, we want to pick products by clicking on them, not navigate to them as this breaks the login process
    //   cy.get(L.SAP_ICON_HOME_LINK).click();
    //   // cy.get(
    //   //   `cx-carousel .slide.active :nth-child(1) > cx-product-carousel-item > a`
    //   // )
    //   //   .scrollIntoView()
    //   //   .click({ force: true });
    //   cy.wait(100000);

    //   // cy.visit('/product/300310300', mockLocation(53, 0));
    //   // cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY).should('exist');
    //   // cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).should('exist');
    //   // cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY).should(
    //   //   'have.attr',
    //   //   'aria-checked',
    //   //   'true'
    //   // );
    //   // cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).click();
    //   // cy.get(L.USE_MY_LOCATION).click();
    //   // cy.get(L.ACTIVE_PICK_UP_IN_STORE_BUTTON).first().click();
    //   // cy.intercept({
    //   //   method: 'POST',
    //   //   url: /users\/anonymous\/carts\/[0-9| a-z|-]*\/entries/,
    //   // }).as('apiAddToCart');
    //   // cy.get(L.PICKUP_STORE_LOCATION).then((value) => {
    //   //   cy.log(value[0].innerText.trim());
    //   //   cy.wrap(value[0].innerText.trim()).as('firstStorePickupLocation');
    //   // });
    //   // cy.get(L.ADD_TO_CART).click();
    //   // cy.wait('@apiAddToCart').then((interception) => {
    //   //   expect(interception.request.body).to.have.property(
    //   //     'deliveryPointOfService'
    //   //   );
    //   // });
    //   // cy.get(L.VIEW_CART).click();
    //   // cy.get(L.CHANGE_STORE_LINK).scrollIntoView();
    //   // cy.get(L.CHANGE_STORE_LINK).click();
    //   // cy.get(L.PICKUP_IN_STORE_MODAL).should('exist');
    //   // cy.get(L.ACTIVE_PICK_UP_IN_STORE_BUTTON).last().click();
    //   // cy.get('@firstStorePickupLocation').then((value) => {
    //   //   const OLD_STORE_LOCATION_VALUE = value;
    //   //   cy.get(L.PICKUP_STORE_LOCATION_NOT_VALUE(value)).then((v) => {
    //   //     const NEW_STORE_LOCATION_VALUE = v[0].innerText.trim();
    //   //     expect(NEW_STORE_LOCATION_VALUE).to.not.equal(
    //   //       OLD_STORE_LOCATION_VALUE
    //   //     );
    //   //   });
    //   // });
    //   // cy.get(L.SAP_ICON_HOME_LINK).click();
    //   // cy.get(
    //   //   `cx-carousel .slide.active :nth-child(2) > cx-product-carousel-item > a`
    //   // )
    //   //   .scrollIntoView()
    //   //   .click({ force: true });
    //   // cy.get(L.ADD_TO_CART).click();
    //   // cy.get(L.VIEW_CART).click();
    //   // cy.get(L.PICKUP_OPTIONS_RADIO).should('have.length', 4);
    //   // cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY_CHECKED).should('have.length', 1);
    //   // cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP_CHECKED).should('have.length', 1);
    //   // cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY_UNCHECKED).should(
    //   //   'have.length',
    //   //   1
    //   // );
    //   // cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP_UNCHECKED).should('have.length', 1);
    //   // login();
    // });
  });
});
