/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { viewportContext } from '../../helpers/viewport-context';

describe('Payment Methods Page accessibility', { testIsolation: false }, () => {
  viewportContext(['desktop', 'mobile'], () => {
    before(() => {
      cy.a11yContinuumSetup();
      cy.login('test-user-with-orders@sap.cx.com', 'pw4all');
      cy.visit('/my-account/payment-details');
    });

    it('Page loaded', () => {
      cy.get('main').a11yRunContinuumTest();
    });

    it('Delete payment method', () => {
      cy.get('cx-card').first().find('button').click();
      cy.get('main').a11yRunContinuumTest();
    });

    it('set as default', () => {
      cy.get('cx-card').eq(1).find('button').first().click();
      cy.get('.alert-success').a11yRunContinuumTest();
      cy.get('main').a11yRunContinuumTest();
    });
  });
});
