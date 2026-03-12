/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isolateTestsBefore } from '../../../support/utils/test-isolation';

describe('Applied Promotions Accessibility', { testIsolation: false }, () => {
  const ProductCode = '1382080';
  isolateTestsBefore();
  before(() => {
    cy.a11yContinuumSetup();
    cy.requireLoggedIn();
  });

  it('should show all applied promotions on Cart page', () => {
    cy.visit(`/product/${ProductCode}`);

    cy.get('cx-add-to-cart')
      .findByText(/Add To Cart/i)
      .click();
    cy.get('cx-added-to-cart-dialog button.close').click({ force: true });

    cy.get('cx-mini-cart').click();
    cy.get('.cart-details-wrapper');

    cy.get('.cx-promotions')
      .filter(':visible')
      .each(($el) => {
        if ($el.text().trim().length > 0) {
          cy.wrap($el).a11yRunContinuumTest();
        }
      });
  });
});
