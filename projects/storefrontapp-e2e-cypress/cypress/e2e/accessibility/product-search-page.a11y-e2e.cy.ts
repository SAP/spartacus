/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

describe('Product Search Page', () => {
  beforeEach(() => {
    cy.a11yContinuumSetup();
    cy.visit('/search/camera');
    cy.get('cx-product-list-item');
  });

  it('Searchbar', () => {
    cy.get('cx-searchbox input').type('cam').get('.products a');
    cy.get('cx-searchbox').a11yRunContinuumTest();
  });

  it('Page content with list view', () => {
    cy.get('cx-product-list').a11yRunContinuumTest();
  });

  it('Grid view', () => {
    cy.get('button.cx-product-grid').first().click();
    cy.get('#product-results-list').a11yRunContinuumTest();
  });

  it('Sorting dropdown', () => {
    cy.get('cx-sorting').first().click();
    cy.get('ng-dropdown-panel').a11yRunContinuumTest();
  });

  it('Facets', () => {
    cy.visit('/search/canon?query=canon:relevance:availableInStores:Chiba');
    cy.get('cx-active-facets a');
    cy.get('cx-product-facet-navigation').a11yRunContinuumTest();
  });
});
