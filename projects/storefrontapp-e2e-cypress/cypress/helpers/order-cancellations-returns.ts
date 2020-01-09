export function checkTabs() {
  cy.get('cx-tab-paragraph-container > h3')
    .eq(1)
    .should('contain', 'RETURNS')
    .click();

  cy.get('cx-tab-paragraph-container > h3')
    .first()
    .should('contain', 'ALL ORDERS')
    .click();
}

export function cancelOrder() {
  cy.get('cx-order-history a.cx-order-history-value')
    .contains('In Process')
    .click({ force: true });

  cy.get('cx-order-details-actions button.btn-primary').click({ force: true });

  cy.get('button.cx-counter-action')
    .contains('+')
    .click({ force: true });

  cy.get('button.btn-primary')
    .contains('Continue')
    .click({ force: true });

  cy.get('cx-cancel-order-confirmation button.btn-primary')
    .contains('Submit Request')
    .click({ force: true });

  cy.url().should('contain', 'my-account/orders');
}
