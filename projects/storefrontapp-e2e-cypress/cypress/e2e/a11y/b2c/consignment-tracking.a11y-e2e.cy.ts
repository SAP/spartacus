/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const disabledBestPracticesIds = [1775]; // Confirmed to not use table element for layout.

describe('Consignment Tracking Accessibility', { testIsolation: false }, () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.a11yContinuumSetup();
    cy.disableBestPractices(disabledBestPracticesIds);
    const username = 'test-user-with-orders@sap.cx.com';
    const password = 'pw4all';
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.visit('/my-account/order/100000');
  });

  it('Order tracking page', () => {
    cy.get('.cx-list');
    cy.get('main').a11yRunContinuumTest();
  });

  it('Tracking Dialog', () => {
    cy.get('cx-consignment-tracking button')
      .contains(' Track package ')
      .click();
    cy.get('.modal-dialog .cx-tracking-event-body');
    cy.get('cx-tracking-events').a11yRunContinuumTest();
  });

  it('Amend Items', () => {
    cy.get('cx-order-details-actions a').contains(' Cancel Items ').click();
    cy.get('table.cx-amend-order-items');
    cy.get('main').a11yRunContinuumTest();
  });

  it('Request Return', () => {
    cy.get('cx-order-details-actions a').contains(' Request a Return ').click();
    cy.get('table.cx-amend-order-items');
    cy.get('main').a11yRunContinuumTest();
  });
});
