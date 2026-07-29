/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as sampleData from '../../../sample-data/b2b-checkout';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';
import { stubB2bUnitSelectionApis } from '../../../helpers/b2b/b2b-unit-selection';

describe('B2B Quick Order Accessibility', { testIsolation: false }, () => {
  isolateTestsBefore();
  beforeEach(() => {
    clearAllStorage();
  });

  before(() => {
    cy.a11yContinuumSetup();
    stubB2bUnitSelectionApis();
    cy.requireLoggedIn();
    cy.visit('/my-account/quick-order');
  });

  it('scan empty Quick Order page', () => {
    cy.get('main').a11yRunContinuumTest();
  });

  it('scan after adding a product', () => {
    cy.get('.quick-order-form-input input')
      .clear()
      .type(`${sampleData.b2bProduct2.code}`);

    cy.get('.quick-order-results-products');
    cy.get('.quick-order-form-input input').type('{downarrow}{enter}');
    cy.get('.cx-quick-order-table-row');

    cy.get('main').a11yRunContinuumTest();
  });

  it('scan after deleting the product', () => {
    cy.get('.quick-order-form-input input')
      .clear()
      .type(`${sampleData.b2bProduct2.code}`);

    cy.get('.quick-order-results-products');
    cy.get('.quick-order-form-input input').type('{downarrow}{enter}');
    cy.get('.cx-quick-order-table-row');

    cy.get('.cx-quick-order-table-row')
      .first()
      .within(() => {
        cy.get('button.btn-tertiary').click();
      });

    cy.get('.quick-order-deletions-message').a11yRunContinuumTest();
  });

  it('scan import modal after opening it', () => {
    cy.get('.cx-import-btn').click();
    cy.get('cx-import-entries-dialog').a11yRunContinuumTest();
    cy.get('cx-import-entries-dialog button.close').click();
  });
});
