import {
  b2bProduct,
  POWERTOOLS_BASESITE,
} from '../../sample-data/b2b-checkout';
import * as alerts from '../global-message';
import { doPlaceOrder } from '../order-history';

export const replenishmentOrderHistoryUrl = `${POWERTOOLS_BASESITE}/en/USD/my-account/my-replenishments`;
export const replenishmentCancelDialogSelector =
  'cx-replenishment-order-cancellation-dialog';
export const replenishmentOrderHistorySelector =
  'cx-replenishment-order-history';

export function waitForReplenishmentRequest(requestMethod: string) {
  const replenishmentAlias = 'replenishmentAlias';

  cy.server();

  cy.route(
    requestMethod,
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/*/replenishmentOrders*`
  ).as(replenishmentAlias);

  return `@${replenishmentAlias}`;
}

export function visitReplenishmentHistory() {
  const replenishmentHistory = waitForReplenishmentRequest('GET');

  cy.visit(replenishmentOrderHistoryUrl);
  cy.wait(replenishmentHistory).its('status').should('eq', 200);

  return replenishmentHistory;
}

export function waitForReplenishmentOrders() {
  doPlaceOrder(b2bProduct).then(() => {
    doPlaceOrder(b2bProduct).then((orderData: any) => {
      cy.waitForOrderToBePlacedRequest(
        POWERTOOLS_BASESITE,
        undefined,
        orderData.body.replenishmentOrderCode
      );

      const replenishmentHistory = visitReplenishmentHistory();

      cy.get(replenishmentHistory).should((xhr) => {
        const body = xhr.response.body;

        expect(body.replenishmentOrders).to.have.length(2);

        body.replenishmentOrders.forEach((replenishmentOrder) => {
          expect(replenishmentOrder.active).to.equal(true);
        });
      });

      cy.get(
        `${replenishmentOrderHistorySelector} .cx-replenishment-order-history-header h3`
      ).should('contain', 'Replenishment Order History');
      cy.get(
        `${replenishmentOrderHistorySelector} .cx-replenishment-order-history-code > .cx-replenishment-order-history-value`
      ).should('contain', orderData.body.replenishmentOrderCode);
      cy.get(
        `${replenishmentOrderHistorySelector} .cx-replenishment-order-history-total > .cx-replenishment-order-history-value`
      ).should('contain', orderData.body.totalPriceWithTax.formattedValue);
    });
  });
}

export function verifySorting() {
  visitReplenishmentHistory();

  cy.server();
  cy.route('GET', /sort=byReplenishmentNumber/).as('query_order_asc');

  cy.get('.top cx-sorting .ng-select').ngSelect('Replenishment Number');

  cy.wait('@query_order_asc').its('status').should('eq', 200);

  cy.get(
    `${replenishmentOrderHistorySelector} .cx-replenishment-order-history-code > .cx-replenishment-order-history-value`
  ).then(($orders) => {
    expect(
      $orders[0].textContent
        .toString()
        .localeCompare($orders[1].textContent.toString())
    ).to.equal(-1);
  });
}

export function cancelReplenishmentInHistory() {
  const replenishmentHistory = visitReplenishmentHistory();

  cy.get(replenishmentHistory).should((xhr) => {
    const body = xhr.response.body;
    expect(body.replenishmentOrders[0].active).to.equal(true);
  });

  verifyFirstRowReplenishmentIsNotCancelled();
  cy.get(
    `${replenishmentOrderHistorySelector} .cx-replenishment-order-history-cancel:first button`
  )
    .should('exist')
    .click();

  cy.get(`${replenishmentCancelDialogSelector}`)
    .should('exist')
    .then((_) => {
      cy.get(`${replenishmentCancelDialogSelector} .btn-primary`).click();
    });

  alerts.getSuccessAlert().contains('cancelled');
  verifyFirstRowReplenishmentIsCancelled();

  cy.get(
    `${replenishmentOrderHistorySelector} tr:first .cx-replenishment-order-history-cancel button`
  ).should('not.exist');
}

export function verifyFirstRowReplenishmentIsCancelled() {
  cy.get(
    `${replenishmentOrderHistorySelector} tr:first .cx-replenishment-order-history-value`
  )
    .eq(4)
    .should('contain', 'Cancelled');
}

export function verifyFirstRowReplenishmentIsNotCancelled() {
  cy.get(
    `${replenishmentOrderHistorySelector} tr:first .cx-replenishment-order-history-value`
  )
    .eq(4)

    .should('not.contain', 'Cancelled');
}
