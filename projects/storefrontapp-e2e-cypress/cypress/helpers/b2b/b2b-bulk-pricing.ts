import { waitForProductPage } from '../checkout-flow';
import { COMBINED_TOTAL } from '../../sample-data/b2b-bulk-pricing';

export function visitProduct(productCode) {
  const page = `/product/${productCode}`;
  const bulkPricingAlias = 'bulkPrices';
  const productPageAlias = 'productPage';

  waitForProductPage(productCode, productPageAlias);

  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/orgProducts/${productCode}*`
  ).as(bulkPricingAlias);

  cy.visit(page);

  cy.wait(`@${productPageAlias}`);
  cy.wait(`@${bulkPricingAlias}`).its('response.statusCode').should('eq', 200);
}

export function addItemToCart(quantity) {
  cy.get('cx-add-to-cart form div cx-item-counter input').type('{selectall}').type(quantity);
  cy.get('cx-add-to-cart form button').last().click();
}

export function addOneToCart() {
  cy.get('cx-add-to-cart form button').last().click();
}

export function updateQuantity(newQuantity) {
  cy.get('cx-added-to-cart-dialog cx-item-counter input').type('{selectall}').type(newQuantity).blur();
}

export function addOneMore() {
  cy.get('cx-added-to-cart-dialog .cx-value button[aria-label="Add one more"]').click();
}

export function verifyTotal(total) {
  cy.get('cx-added-to-cart-dialog .cx-dialog-total').contains(total);
}

export function placeOrder() {
  const checkoutSelector = 'cx-added-to-cart-dialog .cx-dialog-buttons a.btn.btn-secondary';
  cy.get(checkoutSelector).click();
  cy.get('cx-payment-type').within(() => {
    cy.get('.form-control').clear().type('123');
  });
  cy.get('cx-payment-type').within(() => {
    cy.findByText('Account').click({ force: true });
  });
  cy.get('cx-payment-type .btn-primary').click();
  cy.wait(2000);
  cy.get('cx-shipping-address .cx-checkout-btns button.btn-primary').click();
  cy.wait(2000);
  cy.get('cx-delivery-mode .btn-primary').click();
  const totalSelector = 'cx-order-summary .cx-summary-row .cx-summary-amount';
  cy.get('.cx-review-title').should('contain', 'Review');
  cy.get(totalSelector).contains(COMBINED_TOTAL);
  cy.get('input[formcontrolname="termsAndConditions"]').check();
  cy.get('cx-place-order button.btn-primary').click();
  cy.wait(2000);
  cy.get(totalSelector).should('contain', COMBINED_TOTAL);

}
