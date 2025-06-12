/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isolateTests } from '../../../../support/utils/test-isolation';
import {
  mockPunchoutSession,
  openPunchoutSession,
} from '../../../../helpers/b2b/b2b-punchout';

describe('B2B Punchout', () => {
  isolateTests();

  it('should open session', () => {
    openPunchoutSession({
      ...mockPunchoutSession,
      punchOutLevel: 'STORE',
      punchOutOperation: 'CREATE',
    }).then(() => {
      cy.get('cx-punchout-close-session').should('be.visible');
      cy.get('.cx-login-greet').should('contain', 'Hi, PunchOut Customer');
      cy.get('.accNavComponent').should('not.exist');
      cy.get('cx-page-slot.SiteLogo').should('be.not.visible');
    });
  });

  it('should open PDP in Create operation', () => {
    const productId = '3880500';
    openPunchoutSession({
      ...mockPunchoutSession,
      punchOutLevel: 'PRODUCT',
      punchOutOperation: 'CREATE',
      selectedItem: productId,
    }).then(() => {
      const pdpUrl = `/${Cypress.env('BASE_SITE')}/en/USD/product/${productId}`;
      cy.location('pathname').should('contain', pdpUrl);
      cy.get('cx-add-to-cart')
        .findByText(/Add To Cart/i)
        .click();
      cy.get('.cx-dialog-buttons').within(() => {
        cy.get('button').contains(' view cart ').should('be.visible');
        cy.get('button')
          .contains(' proceed to checkout ')
          .should('not.be.visible');
      });
    });
  });
});
