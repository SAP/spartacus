/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  configureApparelProduct,
  LOCATORS as L,
  login,
  register,
} from '../../../helpers/pickup-in-store-utils';
import { viewportContext } from '../../../helpers/viewport-context';

/*
  E2E Test: A logged in user selects a store as preferred location for pick up and validates if its added to address book as preferred pickup in store and changes it from store finder
*/
describe('Preferred Store for pickup In Address Book', () => {
  viewportContext(['desktop'], () => {
    beforeEach(() => {
      configureApparelProduct();
    });

    it('A logged in user selects a store as preferred location for pick up and validates if its added to address book and changes it from store finder (CXSPA-201)', () => {
      cy.intercept({
        method: 'POST',
        url: '/authorizationserver/oauth/token',
      }).as('registerUser');

      cy.intercept({
        method: 'GET',
        url: /users\/current\?/,
      }).as('apiGetPreferredStoreBefore');

      cy.intercept({
        method: 'GET',
        url: /users\/current\?/,
      }).as('apiGetPreferredStoreAfter');

      const pickupStoreHeading = 'Pick-Up Store';

      register();
      cy.wait('@registerUser').then((_interception) => {
        login();
      });

      /** Validating PDP Page Pick up In Store and selecting a store as preferred */
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
      cy.get(L.SET_PREFERRED_STORE).first().click({ force: true });
      cy.get(L.SELECTED_STORE).should('exist');
      cy.get(L.SELECTED_STORE)
        .invoke('attr', 'data-preferred-store')
        .then((firstStoreName) => cy.wrap(firstStoreName).as('firstStoreName'));
      cy.get(L.DIALOG_CLOSE).click();

      /** Navigating to Address Book and validating if preferred store was populated  */
      cy.visit('/my-account/address-book');

      cy.get(L.PREFERRED_STORE_HEADING)
        .invoke('text')
        .then((text) => {
          expect(text.trim()).equal(pickupStoreHeading);
        });
      cy.get('@firstStoreName').then((firstName) => {
        cy.get(L.STORE_NAME).should('have.text', ` ${firstName} `);
      });

      /** Address Book Pickup Option Actions */
      cy.get(`${L.ADDRESS_BOOK_PICKUP_STORE_LINK}:contains('Get Directions')`);
      cy.get(`${L.ADDRESS_BOOK_PICKUP_STORE_LINK}:contains('Change Store')`)
        .should('exist')
        .click();
      cy.url().should('contain', '/store-finder');
      cy.get(L.VIEW_ALL_STORES).click();
      cy.get(L.REGION_UNITED_KINGDOM).click();

      cy.get('@firstStoreName').then((storeName) => {
        cy.get(`[data-preferred-store=${storeName}]`).should(
          'have.attr',
          'data-store-is-selected',
          'true'
        );
      });

      cy.get(L.STORE_FINDER_SET_PREFERRED_STORE_CONTAINER)
        .first()
        .invoke('attr', 'data-preferred-store')
        .then((ChangedStoreName) =>
          cy.wrap(ChangedStoreName).as('ChangedStoreName')
        );

      cy.get(L.STORE_FINDER_SET_PREFERRED_STORE_CONTAINER).first().click();

      cy.visit('/my-account/address-book');

      cy.get('@ChangedStoreName').then((storeName) => {
        cy.get(L.STORE_NAME).should('have.text', ` ${storeName} `);
      });
    });
  });
});
