/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { editedAddress, newAddress } from '../../../helpers/address-book';
import { fillShippingAddress } from '../../../helpers/checkout-forms';

describe('Address Book Page Accessibility', { testIsolation: false }, () => {
  before(() => {
    cy.a11yContinuumSetup();
    cy.requireLoggedIn();
    cy.visit('/my-account/address-book');
  });

  it('Empty page (no addresses)', () => {
    cy.get('cx-address-form');
    cy.get('main').a11yRunContinuumTest();
  });

  it('Page with address card', () => {
    fillShippingAddress(newAddress);
    cy.get('cx-address-book cx-card');
    cy.get('main').a11yRunContinuumTest();
  });

  it('Delete address card - confirmation dialog', () => {
    cy.get('cx-address-book cx-card')
      .first()
      .within(() => {
        cy.contains('button', 'Delete').click();
      });
    cy.get('cx-address-book cx-card').first().a11yRunContinuumTest();
  });

  it('Add second address and test card (skip main re-scan)', () => {
    const secondAddress = {
      ...editedAddress,
      firstName: 'Alex',
      lastName: 'Lee',
    };

    cy.contains('button', /add new address/i).click({ force: true });
    fillShippingAddress(secondAddress);
    cy.get('cx-address-book cx-card');
  });
});
