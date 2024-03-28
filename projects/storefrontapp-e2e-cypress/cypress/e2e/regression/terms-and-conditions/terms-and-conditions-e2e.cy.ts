/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isolateTests } from '../../../support/utils/test-isolation';

context('Homepage', { testIsolation: false }, () => {
  isolateTests();
  before(() => {
    cy.visit('/terms-and-conditions');
  });

  it('should display title and sub title', () => {
    cy.get('h1').contains('Terms and Conditions');
    cy.get('.title_holder h2').contains('Terms and Conditions');
  });

  it('should scroll to correct content when click index title', () => {
    cy.scrollTo('top');
    cy.get('ul.facet_block')
      .contains('li', 'Intellectual property rights')
      .click();
    cy.contains('h2', 'Intellectual property rights').should('be.visible');

    cy.scrollTo('top');
    cy.get('ul.facet_block').contains('li', 'Your activity').click();
    cy.contains('h2', 'Your activity').should('be.visible');

    cy.scrollTo('top');
    cy.get('ul.facet_block').contains('li', 'Third party').click();
    cy.contains('h2', 'Third party').should('be.visible');
  });

  it('should scroll back to the first item when click "back to top" link', () => {
    cy.get('.pagetop-link').last().scrollIntoView();
    cy.get('.pagetop-link').last().click();
    cy.contains('h2', 'Registration').should('be.visible');
  });
});
