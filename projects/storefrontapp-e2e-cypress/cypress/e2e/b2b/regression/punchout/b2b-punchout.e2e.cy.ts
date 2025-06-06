/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// import { loginB2bUser } from '../../../../helpers/b2b/b2b-checkout';
// import * as cart from '../../../../helpers/cart';
// import {
// ...
// } from '../../../../helpers/order-history';
// import {...} from '../../../../sample-data/b2b-punchout';

import { isolateTests } from '../../../../support/utils/test-isolation';

describe('B2B Punchout', () => {
  isolateTests();
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Punchout Create', () => {
    it('should open session', () => {});
  });
});
