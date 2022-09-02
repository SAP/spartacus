import {
  mockLocation,
  LOCATORS as L,
} from '../../../helpers/pickup-in-store-utils';
import { viewportContext } from '../../../helpers/viewport-context';

/*
- A guest user navigates to a PDP wishing to buy the product.
- The user has the choice of whether they want the product delivered (the default) or whether they want to pick it up in store.
- The user selects pickup in store.
- The user selects which store they want to collect from (by default the last store they selected, falling back to the nearest store).
- The user adds the product to the cart. (The cart entries post call will have the "deliveryPointOfService" field).
From the cart, the user can change the location they wish to pick up the product from.
The user also add another item only for delivery.(Multiple items in cart)
The user decides to login so the order will show in the user's account.
The logged in user checks out.
During checkout, the user can change the pickup location.
During the order review, the user can change the pickup location.
The user completes checkout and sees the order details. On here they can see their pickup location for the picket item and the delivery for the delivered item.
*/

describe('A user who has a cart with multiple entries checkout with BOPIS', () => {
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

    it('Does user journey as described above', () => {
      cy.visit('/product/300310300', mockLocation(53, 0));

      cy.get(L.DELIVERY_RADIO_BUTTON).should('exist');
      cy.get(L.PICKUP_IN_STORE_RADIO_BUTTON).should('exist');
      cy.get(L.DELIVERY_RADIO_BUTTON).should(
        'have.attr',
        'aria-checked',
        'true'
      );
      cy.get(L.PICKUP_IN_STORE_RADIO_BUTTON).click();
      cy.get(L.USE_MY_LOCATION).click();
      cy.get(L.ACTIVE_PICK_UP_IN_STORE_BUTTON).first().click();
      cy.intercept({
        method: 'POST',
        url: /users\/anonymous\/carts\/[0-9| a-z|-]*\/entries/,
      }).as('apiAddToCart');
      cy.get(L.ADD_TO_CART).click();
      cy.wait('@apiAddToCart').then((interception) => {
        console.log('interception', interception.request.body);
        expect(interception.request.body).to.have.property(
          'deliveryPointOfService'
        );
      });
      cy.get(L.VIEW_CART).click();
      cy.get(L.CHANGE_STORE_LINK).click();
    });
  });
});
