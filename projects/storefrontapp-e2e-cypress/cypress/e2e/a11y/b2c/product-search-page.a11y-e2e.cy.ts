/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { viewportContext } from '../../../helpers/viewport-context';

describe('Product Search Page', { testIsolation: false }, () => {
  beforeEach(() => {
    cy.a11yContinuumSetup();
  });

  it('Searchbar', () => {
    cy.visit('/search/camera');
    cy.get('cx-product-list-item');
    cy.get('cx-searchbox input').type('cam').get('.products a');
    cy.get('cx-searchbox').a11yRunContinuumTest();
    cy.get('body').click(0, 0);
  });

  it('Page content with list view', () => {
    cy.get('cx-product-list').a11yRunContinuumTest();
  });

  it('Grid view', () => {
    cy.get('button.cx-product-grid').first().click({ force: true });
    cy.get('#product-results-list').a11yRunContinuumTest();
  });

  it('Sorting dropdown', () => {
    cy.get('cx-sorting').first().click();
    cy.get('ng-dropdown-panel').a11yRunContinuumTest();
  });

  it('Facets', () => {
    cy.visit('/search/camera?query=camera:relevance:availableInStores:Chiba');
    cy.get('cx-active-facets a');
    cy.get('cx-product-facet-navigation').a11yRunContinuumTest();
  });

  viewportContext(['mobile'], () => {
    it('Facets Modal', () => {
      cy.get('cx-product-facet-navigation .dialog-trigger').click();
      cy.get('cx-facet-list .value');
      cy.get('.dialog.active').a11yRunContinuumTest();
    });
  });
});
