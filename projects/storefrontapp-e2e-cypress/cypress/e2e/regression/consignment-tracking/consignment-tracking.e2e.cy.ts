/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as orderDetail from '../../../helpers/consignment-tracking';
import { viewportContext } from '../../../helpers/viewport-context';

describe('consignment tracking', () => {
  viewportContext(['desktop', 'mobile'], () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      orderDetail.loginUsingUserWithOrder();
    });

    it('should display tracking button and details for shipped consignments', () => {
      cy.visit('/my-account/order/100000');
      cy.get('.cx-list')
        .filter(':has(.cx-list-status span:contains("Shipped"))')
        .each(($consignment) => {
          cy.wrap($consignment).within(() => {
            cy.get('.cx-code').should('not.be.empty');
            cy.get('.btn-track')
              .should('exist')
              .should('be.visible')
              .scrollIntoView()
              .click();
          });

          cy.get('cx-tracking-events').should('be.visible');

          cy.get('cx-tracking-events').within(() => {
            cy.get('.cx-tracking-event-body, .cx-no-tracking-heading').should(
              'exist'
            );
            cy.get('.close').click();
          });
        });
    });

    it('should not see tracking button for waiting consignment', () => {
      cy.visit('/my-account/order/100000');
      cy.get('.cx-list')
        .filter(':has(.cx-list-status span:contains("Waiting"))')
        .each(($consignment) => {
          cy.wrap($consignment).within(() => {
            cy.get('.cx-code').should('not.be.empty');
            cy.get('.btn-track').should('not.exist');
          });
        });
    });

    it('should not see tracking package button when no consignment', () => {
      cy.visit('/my-account/order/100001');
      cy.get('.btn-track').should('have.length', 0);
    });
  });
});
