/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  createPunchoutUser,
  preparePunchoutSession,
} from '../../../../helpers/b2b/b2b-punchout';
import { isolateTests } from '../../../../support/utils/test-isolation';

describe('B2B Punchout', () => {
  isolateTests();
  let user: any;
  let cart: any;
  let stateAuth: any;

  // before(() => {
  //   // clearAllStorage();
  //   // Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
  // });

  // beforeEach(() => {});

  // describe('Punchout Create', () => {
  it('should open session', () => {
    //    let sampleUser = getSampleUser();
    createPunchoutUser().then((params) => {
      //  ({ user, cart, stateAuth } = params);
    });

    const punchoutConfig = {
      punchOutLevel: 'STORE',
      punchOutOperation: 'CREATE',
      selectedItem: '3881414',
    };
    cy.log('eeee', { user, cart, stateAuth, punchoutConfig });
    preparePunchoutSession({ user, cart, stateAuth, punchoutConfig });
    cy.get('cx-page-slot.SiteLogo').should('be.visible');
  });
  //});
});
