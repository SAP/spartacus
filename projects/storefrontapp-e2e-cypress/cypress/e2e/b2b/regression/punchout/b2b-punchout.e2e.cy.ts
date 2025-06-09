/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isolateTests } from '../../../../support/utils/test-isolation';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';
import { POWERTOOLS_BASESITE } from '../../../../sample-data/b2b-checkout';
import { createPunchoutUser } from '../../../../helpers/b2b/b2b-punchout';

describe('B2B Punchout', () => {
  isolateTests();
  before(() => {
    clearAllStorage();
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
  });

  beforeEach(() => {
    createPunchoutUser();
  });

  describe('Punchout Create', () => {
    it('should open session', () => {
      cy.title().should('not.be.empty');
    });
  });
});
