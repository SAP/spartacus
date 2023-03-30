/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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

  E2E Test: A logged in user

    GIVEN
    The user has not selected a store for the product to be picked up from previously and doesn't have a preferred store
    WHEN
    The user is on the PDP and cart pages
    THEN
    Don't display an elected pickup store

    GIVEN
    The user has selected a store for the product to be picked up from
    WHEN
    The user is on the PDP and cart pages
    THEN
    Display the selected store as the elected pickup store

    GIVEN
    The user has not selected a store for the product previously, but has a preferred store (Backend API)
    WHEN
    The user is on the PDP and cart pages
    THEN
    Display remote preferred store as the elected pickup store

    GIVEN
    The user has not selected a store for the product previously, but has a preferred store (browser storage API)
    WHEN
    The user is on the PDP and cart pages
    THEN
    Display local preferred store as the elected pickup store

*/
describe('Check for presence or absence of displayed pick up store on PDP page', () => {
  viewportContext(['desktop'], () => {
    beforeEach(() => {
      configureApparelProduct();
    });

    it('As a logged in user, pick a store for pickup that is not the default store. Then click Ship It radio button. Then click Pickup in store radio button. The displayed store should be the one picked earlier, not the default (CXSPA-201)', () => {
      cy.intercept({
        method: 'POST',
        url: '/authorizationserver/oauth/token',
      }).as('registerUser');

      // A registered user who has logged in.
      register();
      cy.wait('@registerUser').then((_interception) => {
        login();
      });
      cy.get(L.PICKUP_STORE_LOCATION).should('not.exist');
      cy.get(L.SELECT_STORE_LINK).should('have.text', 'Select Store');
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).click();
      cy.get(L.USE_MY_LOCATION).click();
      cy.get(L.PICKUP_FROM_HERE_BUTTON_NOTTINGHAM_ICE_CENTER).click();
    });

    it.skip("User has not selected a store for the product to be picked up from previously and doesn't have a preferred store. The user is on the PDP page. Don't display an elected pickup store", () => {
      /*
    GIVEN
    The user has not selected a store for the product to be picked up from previously and doesn't have a preferred store
    WHEN
    The user is on the PDP page
    THEN
    Don't display an elected pickup store

      */
      cy.intercept({
        method: 'POST',
        url: '/authorizationserver/oauth/token',
      }).as('registerUser');

      // A registered user who has logged in.
      register();
      cy.wait('@registerUser').then((_interception) => {
        login();
      });
      cy.get(L.PICKUP_STORE_LOCATION).should('not.exist');
      //
    });

    it.skip('User has selected a store for the product to be picked up from. The user is on the PDP page. Display the selected store as the elected pickup store', () => {
      /*
    GIVEN
    The user has selected a store for the product to be picked up from
    WHEN
    The user is on the PDP and cart pages
    THEN
    Display the selected store as the elected pickup store
      */

      cy.intercept({
        method: 'POST',
        url: '/authorizationserver/oauth/token',
      }).as('registerUser');

      // A registered user who has logged in.
      register();
      cy.wait('@registerUser').then((_interception) => {
        login();
      });

      // The user has the choice of whether they want the product delivered (the default) or whether they want to pick it up in store.
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).should('be.visible');
      cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY).should('be.visible');
      cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY).should('be.checked');

      // The user selects pickup in store.
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).click();
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).should('be.checked');
      cy.get(L.USE_MY_LOCATION).click();

      //The user selects which store they want to collect from (by default the last store they selected, falling back to the nearest store).
      cy.get(L.ACTIVE_PICK_UP_IN_STORE_BUTTON).first().click();
      cy.get(L.PICKUP_STORE_LOCATION).invoke('text').as('firstStoreName');

      cy.get('@firstStoreName').then((firstStoreName) => {
        cy.get(L.PICKUP_STORE_LOCATION_WITH_VALUE(firstStoreName)).should(
          'exist'
        );
      });

      //
    });

    it.skip('User has not selected a store for the product previously, but has a preferred store (Backend API). The user is on the PDP page. Display remote preferred store as the elected pickup store.', () => {
      /*
    GIVEN
    The user has not selected a store for the product previously, but has a preferred store (Backend API)
    WHEN
    The user is on the PDP and cart pages
    THEN
    Display remote preferred store as the elected pickup store
      */

      cy.intercept({
        method: 'POST',
        url: '/authorizationserver/oauth/token',
      }).as('registerUser');

      // A registered user who has logged in.
      register();
      cy.wait('@registerUser').then((_interception) => {
        login();
      });
      cy.get(L.PICKUP_STORE_LOCATION).should('not.exist');

      // The user has the choice of whether they want the product delivered (the default) or whether they want to pick it up in store.
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).should('be.visible');
      cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY).should('be.visible');
      cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY).should('be.checked');

      // The user selects pickup in store.
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).click();
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).should('be.checked');
      cy.get(L.USE_MY_LOCATION).click();

      cy.get(L.SET_PREFERRED_STORE)
        .first()
        .invoke('attr', 'data-preferred-store')
        .then((firstStoreName) => cy.wrap(firstStoreName).as('firstStoreName'));

      cy.get(L.SET_PREFERRED_STORE).first().click();

      cy.get(L.DIALOG_CLOSE).click();

      cy.get('@firstStoreName').then((firstStoreName) => {
        cy.get(L.PICKUP_STORE_LOCATION_WITH_VALUE(firstStoreName)).should(
          'exist'
        );
      });
    });
  });
});
