/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { clearAllStorage } from '../../../support/utils/clear-all-storage';
import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';
import * as sampleData from '../../../sample-data/b2b-bulk-pricing';

describe('Bulk pricing accessibility', () => {
  before(() => {
    clearAllStorage();
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    cy.a11yContinuumSetup();
  });

  it('Bulk pricing', () => {
    cy.visit(`/product/${sampleData.PRODUCT}`);
    cy.get('cx-bulk-pricing-table table').a11yRunContinuumTest();
  });
});
