/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { formats } from '../../sample-data/viewports';

const mobileHeaderVisibleElements = [
  'cx-banner a',
  'button.search',
  'cx-mini-cart a',
];

describe('Skipping elements from tab navigation in header', () => {
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.visit('/');
    // close the cookie banner
    cy.get('button').contains('Allow All').click();
  });

  it('toggles elements tabindex', () => {
    // when hamburger menu is closed
    mobileHeaderVisibleElements.forEach((selector) => {
      cy.get(selector).should('not.have.attr', 'tabIndex', '-1');
    });

    // open hamburger menu
    cy.get('button.cx-hamburger').click();

    // elements are hidden from tabbing
    mobileHeaderVisibleElements.forEach((selector) => {
      cy.get(selector).should('have.attr', 'tabIndex', '-1');
    });

    // close hamburger menu
    cy.get('button.cx-hamburger').click();

    // elements are available for tabbing again
    mobileHeaderVisibleElements.forEach((selector) => {
      cy.get(selector).should('not.have.attr', 'tabIndex', '-1');
    });
  });

  it('persists tabbing sequence', () => {
    // menu is closed
    cy.get('button.cx-hamburger').focus();
    cy.pressTab();
    cy.focused().should('have.attr', 'aria-label', 'SAP Commerce');
    cy.pressTab(true);

    // open menu
    cy.focused().click();
    cy.get('button.cx-hamburger').focus();
    cy.pressTab();
    cy.focused().should('have.text', 'Sign In / Register');

    // return to button and close the menu
    cy.pressTab(true);
    cy.focused().click();

    // tab through header
    cy.pressTab();
    cy.focused().should('have.attr', 'aria-label', 'SAP Commerce');
    cy.pressTab();
    cy.focused().should('have.attr', 'title', 'Search');
    cy.pressTab();
    cy.focused().should(
      'have.attr',
      'aria-label',
      '0 items currently in your cart'
    );
  });

  it('restores header item tabbing after navigation', () => {
    cy.get('button.cx-hamburger').click();
    cy.pressTab(true);
    cy.focused().click();

    // elements are available for tabbing again
    mobileHeaderVisibleElements.forEach((selector) => {
      cy.get(selector).should('not.have.attr', 'tabIndex', '-1');
    });

    // tab through header in reverse order
    cy.get('cx-mini-cart a').focus();
    cy.pressTab(true);
    cy.focused().should('have.attr', 'title', 'Search');
    cy.pressTab(true);
    cy.focused().should('have.attr', 'aria-label', 'SAP Commerce');
    cy.pressTab(true);
    cy.focused().should('have.class', 'cx-hamburger');
  });
});
