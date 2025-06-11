/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isolateTests } from '../../../../support/utils/test-isolation';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';
import { POWERTOOLS_BASESITE } from '../../../../sample-data/b2b-checkout';
import {
  createPunchoutSession,
  createPunchoutSessionResponse,
  createPunchoutUser,
  preparePunchoutSession,
} from '../../../../helpers/b2b/b2b-punchout';
import { getSampleUser } from '../../../../sample-data/checkout-flow';

describe('B2B Punchout', () => {
  isolateTests();
  let { user, cart, stateAuth } = {};
  before(() => {
    // clearAllStorage();
    // Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
  });

  beforeEach(() => {
    let sampleUser = getSampleUser();
    // createPunchoutUser(sampleUser).then((params) => {
    createPunchoutUser({ user, cart, stateAuth }).then((params) => {
      // ({ user, cart, stateAuth } = params);
      user = user;
      cart = cart;
      stateAuth = stateAuth;
    });
  });

  describe('Punchout Create', () => {
    it('should open session', () => {
      const punchoutConfig = {
        punchOutLevel: 'STORE',
        punchOutOperation: 'CREATE',
        selectedItem: '3881414',
      };
      console.log('eeee', { user, cart, stateAuth, punchoutConfig });
      preparePunchoutSession({ user, cart, stateAuth, punchoutConfig });
      cy.get('cx-page-slot.SiteLogo').should('be.visible');
    });
  });
});
