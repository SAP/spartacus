import {
  b2bProduct,
  POWERTOOLS_BASESITE,
} from '../../sample-data/b2b-checkout';
import { doPlaceOrder } from '../order-history';
import { verifyReplenishmentIsCancelled } from './b2b-replenishment-order-details';

export const replenishmentOrderHistoryUrl = `${POWERTOOLS_BASESITE}/en/USD/my-account/my-replenishments`;
export const replenishmentCancelDialogSelector =
  'cx-replenishment-order-cancellation-dialog';
export const replenishmentOrderHistorySelector =
  'cx-replenishment-order-history';
export const replenishmentOrderHistoryHeaderValue =
  'Replenishment Order History';

export function createReplenishmentRequestRoute(requestMethod: string) {
  const replenishmentAlias = 'replenishmentAlias';

  cy.intercept({
    method: requestMethod,
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/*/replenishmentOrders*`,
  }).as(replenishmentAlias);

  return `@${replenishmentAlias}`;
}

export function visitReplenishmentHistory() {
  const replenishmentHistoryAlias = createReplenishmentRequestRoute('GET');

  cy.visit(replenishmentOrderHistoryUrl);
  cy.wait(replenishmentHistoryAlias)
    .its('response.statusCode')
    .should('eq', 200);

  return replenishmentHistoryAlias;
}

export function waitForReplenishmentOrders() {
  doPlaceOrder(b2bProduct).then(() => {
    doPlaceOrder(b2bProduct).then((orderData: any) => {
      cy.waitForOrderToBePlacedRequest(
        POWERTOOLS_BASESITE,
        undefined,
        orderData.body.replenishmentOrderCode
      );

      const replenishmentHistoryAlias = visitReplenishmentHistory();

      cy.get(replenishmentHistoryAlias).should((xhr) => {
        const body = xhr.response.body;

        expect(body.replenishmentOrders).to.have.length(2);

        body.replenishmentOrders.forEach((replenishmentOrder) => {
          expect(replenishmentOrder.active).to.equal(true);
        });
      });

      cy.get(
        `${replenishmentOrderHistorySelector} .cx-replenishment-order-history-header h3`
      ).should('contain', replenishmentOrderHistoryHeaderValue);
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

  cy.intercept({ method: 'GET', query: { sort: 'byReplenishmentNumber' } }).as(
    'query_order_asc'
  );

  cy.get('.top cx-sorting .ng-select').ngSelect('Replenishment Number');

  cy.wait('@query_order_asc').its('response.statusCode').should('eq', 200);

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
  const replenishmentHistoryAlias = visitReplenishmentHistory();

  cy.get(replenishmentHistoryAlias).should((xhr) => {
    const body = xhr.response.body;
    expect(body.replenishmentOrders[0].active).to.equal(true);

    verifyFirstRowReplenishmentIsNotCancelled();

    cy.get(
      `${replenishmentOrderHistorySelector} .cx-replenishment-order-history-cancel:first button`
    )
      .should('exist')
      .click();

    verifyReplenishmentIsCancelled(
      body.replenishmentOrders[0].replenishmentOrderCode
    );

    verifyFirstRowReplenishmentIsCancelled();

    cy.get(
      `${replenishmentOrderHistorySelector} tr:first .cx-replenishment-order-history-cancel button`
    ).should('not.exist');
  });
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
