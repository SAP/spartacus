/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as orderDetail from '../../../helpers/consignment-tracking';
import { viewportContext } from '../../../helpers/viewport-context';

describe('consignment tracking', () => {
  viewportContext(['desktop', 'mobile'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      orderDetail.loginUsingUserWithOrder();
    });

    it('should see tracking package button and tracking events when consignment is shipped', () => {
      cy.visit('/my-account/order/100000');
      cy.get('.cx-list').should('have.length', 3);
      cy.get('.cx-list')
        .contains('.cx-code', '300938').parents('.cx-list')
        .within(() => {
          cy.get('.btn-track').click();
        });
      cy.get('.cx-tracking-event-body').should('have.length', 3);

      cy.get('cx-tracking-events .close').click();
      cy.get('.cx-list')
        .contains('.cx-code', '1992693').parents('.cx-list')
        .within(() => {
          cy.get('.btn-track').click();
        });
      cy.get('.cx-no-tracking-heading').should('have.length', 1);
      cy.get('cx-tracking-events .close').click();
      cy.get('.cx-list')
        .contains('.cx-code', '1377492').parents('.cx-list')
        .within(() => {
          cy.get('.btn-track').should('have.length', 0);
        });
    });

    it('should not see tracking package button when no consignment', () => {
      cy.visit('/my-account/order/100001');
      cy.get('.btn-track').should('have.length', 0);
    });
  });
});
