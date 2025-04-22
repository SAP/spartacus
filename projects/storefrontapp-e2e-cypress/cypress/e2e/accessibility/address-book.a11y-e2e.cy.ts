/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { editedAddress, newAddress } from '../../helpers/address-book';
import { fillShippingAddress } from '../../helpers/checkout-forms';

describe('Address Book Page Accessibility', { testIsolation: false }, () => {
  before(() => {
    cy.a11yContinuumSetup();
    cy.requireLoggedIn();
    cy.visit('/');
  });

  it('Empty page', () => {
    cy.visit('/my-account/address-book');

    cy.get('cx-address-form').should('exist');
    cy.get('main').a11yRunContinuumTest();
  });

  it('Page with cards', () => {
    // Add first address
    fillShippingAddress(newAddress);
    cy.get('cx-address-book cx-card').should('exist');
    cy.get('main').a11yRunContinuumTest();
  });

  it('Delete address card (confirmation state)', () => {
    cy.get('cx-address-book cx-card')
      .first()
      .within(() => {
        cy.contains('button', 'Delete').click();
      });

    cy.get('cx-address-book cx-card').first().a11yRunContinuumTest();
  });

  it('Set second address as default', () => {
    const secondAddress = {
      ...editedAddress,
      firstName: 'Alex',
      lastName: 'Lee',
    };

    cy.get('button')
      .contains(/add new address/i)
      .click({ force: true });
    fillShippingAddress(secondAddress);

    cy.get('cx-address-book cx-card').should('have.length.at.least', 2);
    cy.get('cx-address-book cx-card').eq(1).contains('Set as default').click();

    cy.get('.alert-success').should('exist');
    cy.get('.alert-success').a11yRunContinuumTest();
  });
});
