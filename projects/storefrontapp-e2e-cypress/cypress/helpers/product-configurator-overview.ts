const continueToCartButtonSelector =
  'cx-configurator-add-to-cart-button button';

const resolveIssuesText = ' must be resolved before checkout.  Resolve Issues';

/**
 * Verifies whether the product overview page is displayed.
 */
export function checkConfigOverviewPageDisplayed(): void {
  cy.get('cx-configurator-overview-form').should('be.visible');
}

/**
 * Verifies whether 'Continue to Cart' button is displayed.
 */
export function checkContinueToCartBtnDisplayed(): void {
  cy.get('.cx-configurator-add-to-cart-btn button.btn-primary')
    .contains('Continue to Cart')
    .should('be.visible');
}

/**
 * Clicks on 'Continue to cart' on the product overview page.
 */
export function clickContinueToCartBtnOnOP(): void {
  cy.get(continueToCartButtonSelector)
    .click()
    .then(() => {
      cy.get('h1').contains('Your Shopping Cart').should('be.visible');
      cy.get('cx-cart-details').should('be.visible');
    });
}

/**
 * Waits for the notitication banner to display the correct number of issues
 *
 * @param {number} numberOfIssues - Expected number of issues
 */
export function waitForNotificationBanner(numberOfIssues?: number): void {
  const element = cy.get('cx-configurator-overview-notification-banner');
  let numberOfIssueText;

  if (numberOfIssues > 1) {
    numberOfIssueText = numberOfIssues + ' issues' + resolveIssuesText;
  } else {
    numberOfIssueText = numberOfIssues + ' issue' + resolveIssuesText;
  }

  element.get(`.cx-error-msg:contains(${numberOfIssueText})`);
}
