/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isolateTestsBefore } from '../../../support/utils/test-isolation';

describe(
  'Store finder - Access Continuum accessibility tests',
  { testIsolation: false },
  () => {
    isolateTestsBefore();
    beforeEach(() => {
      cy.a11yContinuumSetup();
    });

    it('Finder search results', () => {
      cy.visit('/store-finder/find?query=test');
      cy.get('button').contains(' Make This My Store ').click();
      cy.get('.cx-store-full-address').contains(' Chiba ');
      cy.get('main').a11yRunContinuumTest();
    });

    it('Store details', () => {
      cy.get('a.cx-store-name').first().click();
      cy.get('.cx-contact');
      cy.get('cx-store-finder-list').a11yRunContinuumTest();
    });

    it('View all stores', () => {
      cy.get('button').contains(' View all stores ').click();
      cy.get('.country-header-link');
      cy.get('cx-store-finder-stores-count').a11yRunContinuumTest();

      cy.get('a').contains('Japan').click();
      cy.get('cx-store-finder-list-item');
      cy.get('cx-store-finder-grid').a11yRunContinuumTest();
    });
  }
);
