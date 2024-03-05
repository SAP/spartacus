/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

describe('Scroll to top button', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.scrollTo('bottom');
    cy.get('.cx-scroll-to-top-btn').as('scrollBtn');

    // close the cookie banner
    cy.get('button').contains('Allow All').click();
  });

  it('should appear when the page is scrolled down', () => {
    cy.get('@scrollBtn').should('be.visible');
  });

  it('should scroll to top and disappear when clicked by mouse', () => {
    cy.get('@scrollBtn').click().should('not.be.visible');
    cy.window().its('scrollY').should('equal', 0);
  });

  describe('when focused', () => {
    beforeEach(() => {
      cy.get('@scrollBtn').focus();
    });

    it('should lost focus but remain visible on tab press', () => {
      cy.pressTab();
      cy.get('@scrollBtn').should('not.have.focus').should('be.visible');
    });

    it('should scroll to top when key clicked', () => {
      cy.get('@scrollBtn').type('{enter}').should('be.visible');
      cy.window().its('scrollY').should('equal', 0);
    });

    describe('when scrolled to top by key click', () => {
      beforeEach(() => {
        cy.get('@scrollBtn').type('{enter}');
      });

      it('should still be visible and focused', () => {
        cy.get('@scrollBtn').should('be.visible').should('have.focus');
      });

      it('on tab press should lost focus, disapper and skip to header button should be focused', () => {
        cy.pressTab();
        cy.get('@scrollBtn').should('not.have.focus').should('not.be.visible');
        cy.get('cx-skip-link').get('button').first().should('be.focused');
      });
    });
  });
});
