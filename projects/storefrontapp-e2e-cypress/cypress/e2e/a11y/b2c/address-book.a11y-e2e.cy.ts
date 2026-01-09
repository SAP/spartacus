/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { newAddress } from '../../../helpers/address-book';
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
});
