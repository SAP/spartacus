/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isolateTests } from '../../support/utils/test-isolation';

context('Auxiliary Keys', () => {
  describe('Category Navigation', () => {
    beforeEach(() => {
      loadPageWithComponenents('/');
    });

    it('should open and close menu with space key', () => {
      cy.get('cx-category-navigation').within(() => {
        cy.get('cx-navigation-ui')
          .find('li:not(.back)')
          .should('have.length', 30);
        cy.get('cx-navigation-ui')
          .first()
          .should('contain.text', 'Brands')
          .and('be.visible')
          .within(() => {
            cy.get('div.wrapper')
              .should('have.length', 7)
              .first()
              .should('not.be.visible');
            cy.get('nav > ul > li > button[aria-label="Brands"]')
              .focus()
              .trigger('keydown', {
                key: ' ',
                code: 'Space',
                force: true,
              });
            cy.get('div.wrapper')
              .should('have.length', 7)
              .first()
              .should('be.visible');
            cy.focused().trigger('keydown', {
              key: ' ',
              code: 'Space',
              force: true,
            });
            cy.focused().trigger('keydown', {
              key: ' ',
              code: 'Space',
              force: true,
            });
            cy.get('div.wrapper')
              .should('have.length', 7)
              .first()
              .should('not.be.visible');
          });
      });
    });
  });

  describe('My Account Navigation', () => {
    beforeEach(() => {
      cy.requireLoggedIn();
      loadPageWithComponenents('/');
    });

    it('should open and close menu with space key', () => {
      cy.get('cx-page-layout[section="header"]').within(() => {
        cy.get('cx-navigation-ui.accNavComponent')
          .should('contain.text', 'My Account')
          .and('be.visible')
          .within(() => {
            cy.get('cx-generic-link')
              .contains('Order History')
              .should('not.be.visible');
            cy.get('nav > ul > li > button')
              .first()
              .focus()
              .trigger('keydown', {
                key: ' ',
                code: 'Space',
                force: true,
              });
            cy.get('cx-generic-link')
              .contains('Order History')
              .should('be.visible');
            cy.focused().trigger('keydown', {
              key: ' ',
              code: 'Space',
              force: true,
            });
            cy.get('cx-generic-link')
              .contains('Order History')
              .should('not.be.visible');
          });
      });
    });
  });

  describe('Search Bar', { testIsolation: false }, () => {
    isolateTests();
    before(() => {
      loadPageWithComponenents('/');
    });

    it('should make search suggestions', () => {
      cy.intercept({
        method: 'GET',
        pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/products/search`,
      }).as('query');
      cy.get('cx-searchbox input').type('dsa');
      cy.wait('@query');
      cy.get('cx-searchbox a').should('have.length', 6);
    });

    it('should navigate through suggestions with ArrowDown key', () => {
      cy.focused().trigger('keydown', { key: 'ArrowDown' });
      cy.focused().should('contain.text', 'dsa');
      cy.focused().trigger('keydown', { key: 'ArrowDown' });
      cy.focused().should('contain.text', 'DSC-');
      cy.focused().trigger('keydown', { key: 'ArrowDown' });
      cy.focused().should('contain.text', 'DSC-');
      cy.focused().trigger('keydown', { key: 'ArrowDown' });
      cy.focused().should('contain.text', 'DSC-');
      cy.focused().trigger('keydown', { key: 'ArrowDown' });
      cy.focused().should('contain.text', 'DSC-');
      cy.focused().trigger('keydown', { key: 'ArrowDown' });
      cy.focused().should('contain.text', 'DSC-');
      cy.focused().trigger('keydown', { key: 'ArrowDown' });
      cy.focused().should('contain.text', 'dsa');
    });

    it('should navigate through suggestions with ArrowUp key', () => {
      cy.focused().should('contain.text', 'dsa');
      cy.focused().trigger('keydown', { key: 'ArrowUp' });
      cy.focused().should('contain.text', 'DSC-');
      cy.focused().trigger('keydown', { key: 'ArrowUp' });
      cy.focused().should('contain.text', 'DSC-');
      cy.focused().trigger('keydown', { key: 'ArrowUp' });
      cy.focused().should('contain.text', 'DSC-');
      cy.focused().trigger('keydown', { key: 'ArrowUp' });
      cy.focused().should('contain.text', 'DSC-');
      cy.focused().trigger('keydown', { key: 'ArrowUp' });
      cy.focused().should('contain.text', 'DSC-');
      cy.focused().trigger('keydown', { key: 'ArrowUp' });
      cy.focused().should('contain.text', 'dsa');
    });

    it('should go to suggested page with Enter key', () => {
      cy.focused().click(); // Simulates enter key
      cy.url().should('include', '/search/dsa');
    });
  });

  // TODO: Waiting for carousel fix
  xdescribe('Carousel', () => {
    it('should navigate with ArrowLeft key', () => {});

    it('should navigate with ArrowRight key', () => {});

    it('should go to link with Enter key', () => {});
  });

  describe('Skip Links', { testIsolation: false }, () => {
    isolateTests();
    before(() => {
      loadPageWithComponenents('/');
      cy.get('body').focus();
      cy.pressTab();
      cy.focused().should('contain.text', 'Skip to Header');
    });

    it('should navigate with ArrowRight key', () => {
      cy.focused().trigger('keydown', { key: 'ArrowRight', force: true });
      cy.focused().should('contain.text', 'Skip to Main Content');
      cy.focused().trigger('keydown', { key: 'ArrowRight', force: true });
      cy.focused().should('contain.text', 'Skip to Footer');
      cy.focused().trigger('keydown', { key: 'ArrowRight', force: true });
      cy.focused().should('contain.text', 'Skip to Footer');
    });

    it('should navigate with ArrowLeft key', () => {
      cy.focused().trigger('keydown', { key: 'ArrowLeft', force: true });
      cy.focused().should('contain.text', 'Skip to Main Content');
      cy.focused().trigger('keydown', { key: 'ArrowLeft', force: true });
      cy.focused().should('contain.text', 'Skip to Header');
      cy.focused().trigger('keydown', { key: 'ArrowLeft', force: true });
      cy.focused().should('contain.text', 'Skip to Header');
    });
  });
});

function loadPageWithComponenents(pageUrl: string) {
  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/components`,
  }).as('getComponents');
  cy.visit(pageUrl);
  cy.wait('@getComponents');
}
