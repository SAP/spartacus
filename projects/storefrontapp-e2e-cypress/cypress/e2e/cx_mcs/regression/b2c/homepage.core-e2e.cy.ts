/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isolateTests } from '../../../../support/utils/test-isolation';

context('Homepage', { testIsolation: false }, () => {
  isolateTests();
  before(() => {
    cy.visit('/');
  });

  it('should display title', () => {
    cy.title().should('not.be.empty');
  });

  it('should have site logo', () => {
    cy.get('cx-page-slot.SiteLogo').should('be.visible');
  });

  it('should have splash banner', () => {
    cy.get('cx-page-slot.Section1 cx-banner');
  });

  it('should have footer with footer navigation and notice', () => {
    cy.get('cx-page-slot.Footer').within(() => {
      cy.get('cx-navigation-ui > nav > ul > li').should('have.length', 3);
      cy.get('cx-navigation-ui > nav > ul > li > span').should(
        'have.length',
        3
      );
      cy.get('cx-generic-link').should('have.length', 8);
    });
    // MCs has a mismatched of sample data. It currently has the cms component in the slot, but the content is empty.
    // cy.get('cx-paragraph .cx-notice').should(
    //   'contain',
    //   'SAP SE or an SAP affiliate company. All rights reserved.'
    // );
  });
});
