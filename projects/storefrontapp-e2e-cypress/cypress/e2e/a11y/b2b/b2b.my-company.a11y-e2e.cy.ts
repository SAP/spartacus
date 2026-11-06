/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { loginAsMyCompanyAdmin } from '../../../helpers/b2b/my-company/my-company.utils';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';

const MY_COMPANY_URL = '/organization';

/**
 * This test checks accessibility concerns on the B2B My Company Units page using Access Continuum
 */
describe(
  'B2B / My Company / Page Accessibility',
  { testIsolation: false },
  () => {
    isolateTestsBefore();
    before(() => {
      cy.a11yContinuumSetup();
      loginAsMyCompanyAdmin();
      cy.visit(MY_COMPANY_URL);
    });

    it('initial page load', () => {
      cy.get('main cx-banner');
      cy.get('main').a11yRunContinuumTest();
    });
  }
);
