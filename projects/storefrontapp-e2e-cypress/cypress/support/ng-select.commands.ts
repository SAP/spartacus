/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

declare namespace Cypress {
  interface Chainable {
    /**
       * Selects in ng select
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.get('[name="title"]').ngSelect('Mr.')
        ```
       */
    ngSelect: (option: string) => void;
  }
}

Cypress.Commands.add(
  'ngSelect',
  {
    prevSubject: 'element',
  },
  (element, option) => {
    // `@ng-select/ng-select` v24 opens the dropdown on a left-button `mousedown`,
    // not on a synthetic `click()`. Target the `.ng-arrow-wrapper`: for a
    // NON-searchable select whose mousedown lands on the selected `.ng-value` /
    // `.ng-placeholder`, the handler only focuses and returns early (no open),
    // so triggering on the arrow (outside `.ng-value`) is what reliably toggles
    // it open for both searchable and non-searchable selects.
    //
    // The option panel renders in a CDK overlay appended to <body>, OUTSIDE any
    // `cy.get(...).within()` scope the caller may be in (e.g. address form or
    // the create-ticket dialog). Query it from the document root with
    // `{ withinSubject: null }` so it escapes the `within()` scope.
    cy.wrap(element)
      .find('.ng-arrow-wrapper')
      .trigger('mousedown', { which: 1, button: 0 });
    cy.wrap(element).should('have.class', 'ng-select-opened');
    cy.get('.ng-dropdown-panel .ng-option', { withinSubject: null })
      .contains(option)
      .click({ force: true });
  }
);
