/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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

    // it('should see tracking package button and tracking events when consignment is shipped', () => {
    //   cy.visit('/my-account/order/100000');

    //   cy.get('.cx-list').each(($consignment) => {
    //     const status = $consignment.find('.cx-list-status span').text().trim();

    //     if (status === 'Shipped') {
    //       const hasTrackButton = $consignment.find('.btn-track').length > 0;

    //       if (hasTrackButton) {
    //         cy.wrap($consignment).find('.btn-track').click({ force: true });
    //         cy.wait(500);

    //         cy.get('cx-tracking-events').should('be.visible');

    //         cy.get('body').then(($body) => {
    //           if ($body.find('.cx-tracking-event-body').length > 0) {
    //             cy.get('.cx-tracking-event-body').should('have.length.at.least',1);
    //           } else {
    //             cy.get('.cx-no-tracking-heading').should('exist');
    //           }
    //         });
    //         cy.get('cx-tracking-events .close').click();
    //       }
    //     }
    //   });
    // });

    it('should not see tracking package button when no consignment', () => {
      cy.visit('/my-account/order/100001');
      cy.get('.btn-track').should('have.length', 0);
    });
  });
});
