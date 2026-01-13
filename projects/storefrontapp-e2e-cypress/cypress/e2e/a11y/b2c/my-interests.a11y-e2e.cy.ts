/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { normalProductCode } from '../../../helpers/notification';

describe('Customer Interests accessibility', { testIsolation: false }, () => {
  before(() => {
    cy.a11yContinuumSetup();
    cy.requireLoggedIn();
  });

  it('Notification Preference Page', () => {
    cy.visit('my-account/notification-preference');
    cy.get('input.cx-np-checkbox');
    cy.get('main').a11yRunContinuumTest();

    // enable email notification
    cy.get('.form-check-label').click();
  });

  it('Product Page', () => {
    cy.visit(`product/${normalProductCode}`);

    cy.get('cx-stock-notification button').contains(' NOTIFY ME ').click();
    cy.get('cx-stock-notification-dialog .cx-stock-notification-content');
    cy.get('cx-stock-notification-dialog').a11yRunContinuumTest();
    cy.get('.cx-dialog-actions button').contains(' OK ').click();

    cy.get('cx-stock-notification button')
      .contains(' STOP NOTIFICATION ')
      .click();
    cy.get('cx-global-message .alert-info').a11yRunContinuumTest();

    cy.get('cx-stock-notification button').contains(' NOTIFY ME ').click();
  });

  it('My Interests Page', () => {
    cy.visit('my-account/my-interests');
    cy.get('.cx-product-interests-table .cx-info-container');
    cy.get('main').a11yRunContinuumTest();

    // empty page
    cy.get('.cx-actions button').contains(' Remove ').click();
    cy.get('.cx-product-interests-message');
    cy.get('main').a11yRunContinuumTest();
  });
});
