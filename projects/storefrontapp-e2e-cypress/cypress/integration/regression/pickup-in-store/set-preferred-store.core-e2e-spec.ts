import {
  LOCATORS as L,
  login,
  mockLocation,
  register,
} from '../../../helpers/pickup-in-store-utils';
import { viewportContext } from '../../../helpers/viewport-context';
describe('Set Preferred store', () => {
  viewportContext(['desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.cxConfig({
        context: {
          baseSite: ['apparel-uk-spa'],
          currency: ['GBP'],
        },
      });
      cy.visit('/logout', mockLocation(53, 0));
      cy.get(L.ALLOW_COOKIES_BUTTON).click();
    });

    /*
2 intercepts required that intercept the GET request that constins defaultPointOfService in the response body
1 of them needs to be defined before the patch request is made (eg at the top of the it block)
1 of them needs to be defined immediately before the patch request
they should have different alias names (I think)
For the first one, assert that that the property defaultPointOfServiceName does not exist in teh body
for the second one assert that it does exist, and that its value is what we set it to when we click the heart (firstStoreName I think)


    */
    xit('A logged in user should be able to set a preferred store when not logged in', () => {
      cy.get(L.HOME_PAGE_FIRST_PRODUCT).click();
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).should('be.visible');
      cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY).should('be.visible');
      cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY).should('be.checked');

      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).click();
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).should('be.checked');
      cy.get(L.USE_MY_LOCATION).click();

      cy.get(L.SELECTED_STORE).should('not.exist');
      cy.get(L.SET_PREFERRED_STORE).first().click({ force: true });
      cy.get(L.SELECTED_STORE).should('exist');

      cy.get(L.SELECTED_STORE)
        .invoke('attr', 'data-preferred-store')
        .as('firstStoreName');
      cy.get('@firstStoreName').then((firstStoreName) => {
        expect(
          JSON.parse(localStorage.getItem('preferred_store')).name
        ).to.equal(firstStoreName);
        cy.get(
          `[data-preferred-store="${firstStoreName}"] div.icon-selected`
        ).should('exist');
      });

      cy.get(L.SET_PREFERRED_STORE).eq(1).click({ force: true });
      cy.get(L.SELECTED_STORE)
        .invoke('attr', 'data-preferred-store')
        .as('secondStoreName');
      cy.get('@secondStoreName').then((secondStoreName) => {
        expect(
          JSON.parse(localStorage.getItem('preferred_store')).name
        ).to.equal(secondStoreName);
        cy.get(
          `[data-preferred-store="${secondStoreName}"] div.icon-selected`
        ).should('exist');
        cy.get('@firstStoreName').then((firstStoreName) =>
          expect(firstStoreName).to.not.equal(secondStoreName)
        );
      });
    });
    it('A logged in user should be able to set a preferred store in when logged in', () => {
      cy.intercept({
        method: 'POST',
        url: '/authorizationserver/oauth/token',
      }).as('registerUser');

      cy.intercept({
        method: 'GET',
        url: /users\/current\?/,
      }).as('apiGetPreferredStoreBefore');

      cy.intercept({
        method: 'PATCH',
        url: /users\/current/,
      }).as('apiSetPreferredStore');
      // The user decides to login so the order will show in the user's account.
      register();

      cy.wait('@registerUser').then((_interception) => {
        login();
      });

      cy.get(L.HOME_PAGE_FIRST_PRODUCT).click();
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).should('be.visible');
      cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY).should('be.visible');
      cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY).should('be.checked');

      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).click();
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).should('be.checked');
      cy.get(L.USE_MY_LOCATION).click();
      cy.wait('@apiGetPreferredStoreBefore').then((interception) => {
        expect(interception.response.body['defaultPointOfServiceName']).to.be
          .undefined;
      });

      cy.get(L.SELECTED_STORE).should('not.exist');
      cy.intercept({
        method: 'GET',
        url: /users\/current\?/,
      }).as('apiGetPreferredStoreAfter');
      cy.get(L.SET_PREFERRED_STORE).first().click({ force: true });
      cy.get(L.SELECTED_STORE).should('exist');

      cy.get(L.SELECTED_STORE)
        .invoke('attr', 'data-preferred-store')
        .as('firstStoreName');

      cy.get('@firstStoreName').then((firstStoreName) => {
        cy.wait('@apiSetPreferredStore').then((interception) => {
          expect(firstStoreName).to.equal(
            interception.request.body['defaultPointOfServiceName']
          );
          expect(
            JSON.parse(localStorage.getItem('preferred_store')).name
          ).to.equal(firstStoreName);
          cy.wait('@apiGetPreferredStoreAfter').then((interception) => {
            expect(
              interception.response.body['defaultPointOfServiceName']
            ).to.equal(firstStoreName);
          });
        });
      });
    });
  });
});
