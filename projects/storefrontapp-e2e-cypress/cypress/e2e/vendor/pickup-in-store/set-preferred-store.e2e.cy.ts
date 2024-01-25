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

/**
 * This test suite relies on an API on a newer version of commerce instance
 * and will be activated when the CI commerce instance is updated to 2211.
 */
describe.skip('Set Preferred store', () => {
  viewportContext(['desktop'], () => {
    beforeEach(() => {
      configureApparelProduct();
    });

    it('A logged in user should be able to set a preferred store when not logged in (CXSPA-201)', () => {
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

    it('A logged in user should be able to set a preferred store in when logged in (CXSPA-201)', () => {
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
