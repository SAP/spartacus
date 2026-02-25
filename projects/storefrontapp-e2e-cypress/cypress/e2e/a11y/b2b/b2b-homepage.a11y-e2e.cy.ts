/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { waitForPage } from '../../../helpers/navigation';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';

describe('B2B Homepage Accessibility', { testIsolation: false }, () => {
  isolateTestsBefore();
  before(() => {
    const homePage = waitForPage('homepage', 'getHomePage');
    cy.visit('/');
    cy.wait(`@${homePage}`);
    cy.a11yContinuumSetup();
  });

  it('should not have any accessibility violations', () => {
    cy.get('cx-product-carousel-item');
    cy.get('main').a11yRunContinuumTest();
  });
});
