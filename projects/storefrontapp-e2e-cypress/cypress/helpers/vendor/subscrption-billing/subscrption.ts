export const serviceUser = {
  email: 'james.weber@harvestlive.inc',
  password: 'welcome',
  firstName: 'James',
  lastName: 'Weber',
  titleCode: 'mr',
};
export const SHOP_NAME = Cypress.env('BASE_SITE'); //Powertools-spa
export const SUBSCRIPTION_LIST_PATH = `${SHOP_NAME}/en/USD/my-account/subscriptions`;

const subscriptionSelector = '.subscription';
const statusSelector = '.subscription-status';
const manageServiceLinkSelector = '.subscription-column-2 a.cx-action-link';

/**
 * Verifies whether "Item Price" in Quote Heading is displayed.
 */
export function checkDiscountDisplayed() {
  cy.get('.cx-item-list-discount')
    .should('contain.text', 'Item Price')
    .and('be.visible');
}
/**
 * Selectors
 */

const subscrptionComponentSelector = 'cx-subscription-list';
const subscrptionDetailsComponentSelector = 'cx-subscription-details';

/**
 * Navigates to the subscription  list.
 */
export function subscriptionList() {
  cy.visit(SUBSCRIPTION_LIST_PATH).then(() => {
    cy.location('pathname').should('contain', SUBSCRIPTION_LIST_PATH);
    checkQuoteListDisplayed();
  });
}
/**
 * Verifies whether the quote list is displayed.
 */
export function checkQuoteListDisplayed() {
  log(
    'Verifies whether the quote list page is displayed',
    checkQuoteListDisplayed.name
  );
  cy.get(subscrptionComponentSelector).should('be.visible');


}
export function clickManageServiceForActiveSubscription() {
  cy.visit(SUBSCRIPTION_LIST_PATH);
  cy.get(subscrptionComponentSelector).should('be.visible');

  // Wait for subscriptions to load
  cy.get(subscriptionSelector).should('exist');

  // Loop through subscriptions to find the one with status "Active"
  cy.get(subscriptionSelector).each(($subscription, index) => {
    const $status = $subscription.find(statusSelector);

    if ($status.length && $status.text().trim().includes('Active')) {
      // Log which index is active
      cy.log(`Found Active subscription at index ${index}`);

      // Wrap the element to use Cypress commands on it
      cy.wrap($subscription)
        .find(manageServiceLinkSelector)
        .should('be.visible')
        .click({ force: true });

      // Exit loop after clicking
      return false;
    }
  });

  cy.get(subscrptionDetailsComponentSelector).should('be.visible');
}
/**
 * Attempts to cancel a subscription if the Cancel button is available.
 */
export function cancelSubscriptionIfPossible() {
  const cancelButtonSelector = '.cx-other-actions a[aria-label="Cancel"]';
  const modalSelector = 'cx-subscription-cancel';
  // const confirmButtonSelector = `${modalSelector} button.btn-primary`;

  cy.get('body').then(($body) => {
    if ($body.find(cancelButtonSelector).length > 0) {
      cy.log('Cancel button is available, proceeding to click it.');

      cy.get(cancelButtonSelector)
        .should('be.visible')
        .click({ force: true });

      // Wait for modal to appear
      cy.get(modalSelector, { timeout: 5000 }).should('be.visible');


    } else {
      cy.log('No cancel button available — skipping cancellation.');
    }
  });
}

function log(comment: string, functionName: string) {
  cy.log(`##### ${comment} <${functionName}> #####`);
}
