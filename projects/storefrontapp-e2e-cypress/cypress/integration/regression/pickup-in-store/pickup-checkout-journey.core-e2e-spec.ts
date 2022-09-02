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
- From the cart, the user can change the location they wish to pick up the product from.
- The user also add another item only for delivery.(Multiple items in cart)
The user decides to login so the order will show in the user's account.
The logged in user checks out.
During checkout, the user can change the pickup location.
During the order review, the user can change the pickup location.
The user completes checkout and sees the order details. On here they can see their pickup location for the picket item and the delivery for the delivered item.
*/

const EMAIL_ADDRESS = `${new Date().getTime()}@test.com`;
const PASSWORD = `Password-1234`;

function register() {
  cy.visit('/', mockLocation(53, 0));
  cy.get(L.ALLOW_COOKIES_BUTTON).click();
  cy.get(L.LOGIN_LINK).click();
  cy.get(L.REGISTER_BUTTON).click();
  cy.get(L.FORM_TITLE).click();
  cy.get(L.FORM_TITLE_ENTRY_MR).click();
  cy.get(L.FORM_FIRSTNAME).type('Firstname');
  cy.get(L.FORM_LASTNAME).type('Lastname');
  cy.get(L.FORM_EMAIL).type(EMAIL_ADDRESS);
  cy.get(L.FORM_PASSWORD).type(PASSWORD);
  cy.get(L.FORM_CONFIRM_PASSWORD).type(PASSWORD);
  cy.get(L.FORM_NEWSLETTER).click();
  cy.get(L.FORM_TANDC).click();
  cy.get(L.SUBMIT_REGISTRATION_FORM).click();
}
function login() {
  cy.get(L.LOGIN_LINK).click();
  cy.get(L.SIGNIN_USERNAME).type(EMAIL_ADDRESS);
  cy.get(L.SIGNIN_PASSWORD).type(PASSWORD);
  cy.get(L.SIGN_IN_BUTTON).click();
}
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

      register();
    });

    it('Does user journey as described above', () => {
      // TODO, we want to pick products by clicking on them, not navigate to them as this breaks the login process
      cy.get(L.SAP_ICON_HOME_LINK).click();
      // cy.get(
      //   `cx-carousel .slide.active :nth-child(1) > cx-product-carousel-item > a`
      // )
      //   .scrollIntoView()
      //   .click({ force: true });
      cy.wait(100000)

      // cy.visit('/product/300310300', mockLocation(53, 0));
      // cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY).should('exist');
      // cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).should('exist');
      // cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY).should(
      //   'have.attr',
      //   'aria-checked',
      //   'true'
      // );
      // cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).click();
      // cy.get(L.USE_MY_LOCATION).click();
      // cy.get(L.ACTIVE_PICK_UP_IN_STORE_BUTTON).first().click();
      // cy.intercept({
      //   method: 'POST',
      //   url: /users\/anonymous\/carts\/[0-9| a-z|-]*\/entries/,
      // }).as('apiAddToCart');
      // cy.get(L.PICKUP_STORE_LOCATION).then((value) => {
      //   cy.log(value[0].innerText.trim());
      //   cy.wrap(value[0].innerText.trim()).as('firstStorePickupLocation');
      // });
      // cy.get(L.ADD_TO_CART).click();
      // cy.wait('@apiAddToCart').then((interception) => {
      //   expect(interception.request.body).to.have.property(
      //     'deliveryPointOfService'
      //   );
      // });
      // cy.get(L.VIEW_CART).click();
      // cy.get(L.CHANGE_STORE_LINK).scrollIntoView();
      // cy.get(L.CHANGE_STORE_LINK).click();
      // cy.get(L.PICKUP_IN_STORE_MODAL).should('exist');
      // cy.get(L.ACTIVE_PICK_UP_IN_STORE_BUTTON).last().click();
      // cy.get('@firstStorePickupLocation').then((value) => {
      //   const OLD_STORE_LOCATION_VALUE = value;
      //   cy.get(L.PICKUP_STORE_LOCATION_NOT_VALUE(value)).then((v) => {
      //     const NEW_STORE_LOCATION_VALUE = v[0].innerText.trim();
      //     expect(NEW_STORE_LOCATION_VALUE).to.not.equal(
      //       OLD_STORE_LOCATION_VALUE
      //     );
      //   });
      // });
      // cy.get(L.SAP_ICON_HOME_LINK).click();
      // cy.get(
      //   `cx-carousel .slide.active :nth-child(2) > cx-product-carousel-item > a`
      // )
      //   .scrollIntoView()
      //   .click({ force: true });
      // cy.get(L.ADD_TO_CART).click();
      // cy.get(L.VIEW_CART).click();
      // cy.get(L.PICKUP_OPTIONS_RADIO).should('have.length', 4);
      // cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY_CHECKED).should('have.length', 1);
      // cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP_CHECKED).should('have.length', 1);
      // cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY_UNCHECKED).should(
      //   'have.length',
      //   1
      // );
      // cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP_UNCHECKED).should('have.length', 1);
      // login();
    });
  });
});
