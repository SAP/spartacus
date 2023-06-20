/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cdc from '../../../../helpers/vendor/cdc/cdc';
import { user, organisation } from '../../../../sample-data/checkout-flow';

describe('Register an B2B Organisation with Screenset', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.visit('/cdc/register-org');
  });

  it('should register organization and request received message should appear', () => {
    cdc.registerOrg(user, organisation);
    cdc.verifyOrgRegistrationRequestReceived();
  });
});
