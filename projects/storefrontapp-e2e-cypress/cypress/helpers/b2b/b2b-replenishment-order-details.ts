import {
  b2bProduct,
  POWERTOOLS_BASESITE,
} from '../../sample-data/b2b-checkout';
import * as alerts from '../global-message';
import { doPlaceOrder } from '../order-history';
import {
  replenishmentCancelDialogSelector,
  replenishmentOrderHistorySelector,
  visitReplenishmentHistory,
} from './b2b-replenishment-order-history';

export let replenishmentOrderDetailsUrl = (replenishmentOrderCode: string) =>
  `/${POWERTOOLS_BASESITE}/en/USD/my-account/my-replenishment/${replenishmentOrderCode}`;

export const orderOverviewSelector = 'cx-order-overview';
export const cartListItemSelector = 'cx-cart-item-list';
export const orderHistorySelector = 'cx-order-history';
export const cancellationSelector = 'cx-replenishment-order-cancellation';

export function createReplenishmentDetailsRequestRoute(
  requestMethod: string,
  replenishmentOrderCode: string,
  alias: string
) {
  cy.intercept({
    method: requestMethod,
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/*/replenishmentOrders/${replenishmentOrderCode}*`,
  }).as(alias);

  return `@${alias}`;
}

export function clickReplenishmentDetails(replenishmentOrderCode: string) {
  const replenishmentDetailsAlias = createReplenishmentDetailsRequestRoute(
    'GET',
    replenishmentOrderCode,
    'replenishmentDetailsAlias'
  );

  cy.get(
    `${replenishmentOrderHistorySelector} .cx-replenishment-order-history-code a`
  )
    .click()
    .should('have.attr', 'href')
    .and('eq', replenishmentOrderDetailsUrl(replenishmentOrderCode));

  cy.wait(replenishmentDetailsAlias)
    .its('response.statusCode')
    .should('eq', 200);

  return replenishmentDetailsAlias;
}

export function cancelReplenishmentDetails() {
  doPlaceOrder(b2bProduct).then((orderData: any) => {
    cy.waitForOrderToBePlacedRequest(
      POWERTOOLS_BASESITE,
      undefined,
      orderData.body.replenishmentOrderCode
    );

    visitReplenishmentHistory();

    const replenishmentDetailsAlias = clickReplenishmentDetails(
      orderData.body.replenishmentOrderCode
    );

    cy.get(replenishmentDetailsAlias).then((xhr) => {
      const body = xhr.response.body;

      expect(body.replenishmentOrderCode).to.eq(
        orderData.body.replenishmentOrderCode
      );

      expect(body.active).to.equal(true);
    });

    verifyOrderOverviewIsNotCancelled();

    cy.get(`${cartListItemSelector} .cx-link`).should(
      'contain',
      orderData.body.entries[0].product.name
    );

    cy.get(orderHistorySelector).should('exist');

    cancellationButtons(2);

    cy.get(cancellationSelector)
      .contains('Cancel')
      .should('be.visible')
      .click();

    verifyReplenishmentIsCancelled(orderData.body.replenishmentOrderCode);

    cancellationButtons(1);

    verifyOrderOverviewIsCancelled();
  });
}

export function verifyOrderOverviewIsNotCancelled() {
  cy.get(`${orderOverviewSelector} .cx-card-title`)
    .parent()
    .find('.cx-card-label')
    .should('not.contain', 'Cancelled');
}

export function verifyOrderOverviewIsCancelled() {
  cy.get(`${orderOverviewSelector} .cx-card-title`)
    .parent()
    .find('.cx-card-label')
    .should('contain', 'Cancelled');
}

export function cancellationButtons(numberOfButton: number) {
  cy.get(`${cancellationSelector} .cx-cancel-replenishment-btns`)
    .children()
    .should('have.length', numberOfButton);
}

export function verifyReplenishmentIsCancelled(replenishmentOrderCode: string) {
  const cancelReplenishmentAlias = createReplenishmentDetailsRequestRoute(
    'PATCH',
    replenishmentOrderCode,
    'cancelReplenishmentAlias'
  );

  cy.get(`${replenishmentCancelDialogSelector}`)
    .should('exist')
    .then((_) => {
      cy.get(`${replenishmentCancelDialogSelector} .btn-primary`).click();
    });

  cy.wait(cancelReplenishmentAlias)
    .its('response.statusCode')
    .should('eq', 200);

  alerts
    .getSuccessAlert()
    .contains(
      `Replenishment order #${replenishmentOrderCode} has been successfully cancelled`
    );
}
