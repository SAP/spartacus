/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isolateTests } from '../../../../support/utils/test-isolation';
import {
  goToPunchoutCart,
  mockPunchoutSession,
  openPunchoutSession,
  verifyBackToAriba,
} from '../../../../helpers/b2b/b2b-punchout';

describe('B2B Punchout', () => {
  isolateTests();

  it('should open and close session', () => {
    openPunchoutSession({
      ...mockPunchoutSession,
      punchOutLevel: 'STORE',
      punchOutOperation: 'CREATE',
    }).then(() => {
      cy.get('.cx-login-greet').should('contain', 'Hi, PunchOut Customer');
      cy.get('.accNavComponent').should('not.exist');
      cy.get('cx-page-slot.SiteLogo').should('be.not.visible');
      cy.get('cx-punchout-close-session').should('be.visible').click();
      verifyBackToAriba();
    });
  });

  describe('Product level and Create operation', () => {
    it('should go to cart and Back to requisition', () => {
      const productId = '3880500';
      openPunchoutSession({
        ...mockPunchoutSession,
        punchOutLevel: 'PRODUCT',
        punchOutOperation: 'CREATE',
        selectedItem: productId,
      }).then(() => {
        goToPunchoutCart(productId);
        cy.get('cx-punchout-buttons').within(() => {
          cy.get('button').contains(' Cancel ').should('be.visible');
          cy.get('button')
            .contains(' Back to requisition ')
            .should('be.visible')
            .click();
        });
        verifyBackToAriba();
      });
    });

    it('should go to cart and Cancel', () => {
      const productId = '3880500';
      openPunchoutSession({
        ...mockPunchoutSession,
        punchOutLevel: 'PRODUCT',
        punchOutOperation: 'CREATE',
        selectedItem: productId,
      }).then(() => {
        goToPunchoutCart(productId);
        cy.get('cx-punchout-buttons').within(() => {
          cy.get('button')
            .contains(' Back to requisition ')
            .should('be.visible');
          cy.get('button').contains(' Cancel ').should('be.visible').click();
        });
        verifyBackToAriba();
      });
    });
  });
});
