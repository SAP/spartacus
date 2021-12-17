import { waitForProductPage } from '../checkout-flow';
import { loginB2bUser as login } from './b2b-checkout';

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

export function addOneToCart() {
  cy.get('cx-add-to-cart form button').last().click();
}

export function addAndverifyTotal(quantity) {
  cy.intercept(
    'POST',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/orgUsers/*/carts/*/entries?*`
  ).as('totalAlias');

  cy.get('cx-add-to-cart form div cx-item-counter input')
    .type('{selectall}')
    .type(quantity);
  cy.get('cx-add-to-cart form button').last().click();

  let totalPrice: string;
  cy.wait('@totalAlias').then((xhr) => {
    totalPrice = xhr.response.body.entry.totalPrice.value;
    cy.get('cx-added-to-cart-dialog .cx-total .cx-value').should(
      'contain',
      totalPrice
    );
  });
}

export function updateAndverifyTotal(newQuantity) {
  cy.intercept(
    'PATCH',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/*/carts/*/entries/0?lang=en&curr=USD`
  ).as('newTotalAlias');

  cy.get('cx-added-to-cart-dialog cx-item-counter input')
    .type('{selectall}')
    .type(newQuantity)
    .blur();

  let newTotalPrice: string;
  cy.wait('@newTotalAlias').then((xhr) => {
    newTotalPrice = xhr.response.body.entry.totalPrice.value;
    cy.get('cx-added-to-cart-dialog .cx-total .cx-value').should(
      'contain',
      newTotalPrice
    );
  });
}

export function loginB2bUser() {
  login();
}

export function placeOrder() {
  const checkoutSelector =
    'cx-added-to-cart-dialog .cx-dialog-buttons a.btn.btn-secondary';
  cy.get(checkoutSelector).click();
  cy.get('cx-payment-type').contains(' Account ');
  cy.get('cx-payment-type').within(() => {
    cy.get('.form-control').clear().type('123');
  });
  cy.get('cx-payment-type').within(() => {
    cy.findByText('Account').click({ force: true });
  });

  cy.get('cx-payment-type .btn-primary').click();

  cy.get('cx-shipping-address').contains('Select your Shipping Address');
  cy.get('cx-shipping-address .cx-checkout-btns button.btn-primary').click();
  cy.get('cx-delivery-mode').contains('Standard Delivery');
  cy.get('cx-delivery-mode .btn-primary').click();
  cy.get('.cx-review-title').should('contain', 'Review');

  cy.get('input[formcontrolname="termsAndConditions"]').check();
  cy.get('cx-place-order button.btn-primary').click();
}
