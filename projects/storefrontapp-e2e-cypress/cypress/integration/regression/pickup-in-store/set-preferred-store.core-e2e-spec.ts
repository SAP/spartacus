import {
  LOCATORS as L,
  mockLocation,
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
    it('A logged in user should be able to set a preferred store when not logged in', () => {
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
    // it('A logged in user should be able to set a preferred store in when logged in', () => {});
  });
});
