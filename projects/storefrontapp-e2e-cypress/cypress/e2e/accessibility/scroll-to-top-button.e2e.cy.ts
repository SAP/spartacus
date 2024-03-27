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

  context('when focused', () => {
    beforeEach(() => {
      cy.get('@scrollBtn').focus();
    });

    it('should lose focus but remain visible on tab press', () => {
      cy.pressTab(true);
      cy.get('@scrollBtn').should('not.have.focus').should('be.visible');
    });

    it('should scroll to top when key pressed', () => {
      cy.get('@scrollBtn').type('{enter}').should('be.visible');
      cy.window().its('scrollY').should('equal', 0);
    });
  });

  context('after scrolled to top by a key press', () => {
    beforeEach(() => {
      cy.get('@scrollBtn').type('{enter}');
      cy.window().its('scrollY').should('equal', 0);
    });

    it('should still be visible and focused', () => {
      cy.get('@scrollBtn').should('be.visible').should('have.focus');
    });

    it('focuses first focusable element after a Tab press', () => {
      cy.get('@scrollBtn').trigger('keydown', {
        key: 'Tab',
      });
      cy.get('cx-storefront').should('be.focused');
      cy.get('@scrollBtn').should('not.be.visible');
    });
  });
});
