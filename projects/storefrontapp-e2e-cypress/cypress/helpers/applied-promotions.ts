import { waitForOrderToBePlacedRequest } from '../support/utils/order-placed';
import { registerCartPageRoute } from './cart';
import { verifyAndPlaceOrder } from './checkout-as-persistent-user';
import { waitForPage } from './checkout-flow';

export const eosCameraProductName = 'EOS450D';

export const defaultAddress = {
  defaultAddress: false,
  titleCode: 'mr',
  firstName: 'Cypress',
  lastName: 'Customer',
  line1: '10 Fifth Avenue',
  line2: '',
  city: 'New York',
  region: { isocode: 'US-NY' },
  country: { isocode: 'US' },
  postal: '10001',
  phone: '917-123-0000',
};

export function checkForAppliedPromotionsInCartModal(productName: string) {
  cy.get('.cx-promotions').should('contain', productName);
}

export function checkForAppliedPromotions() {
  cy.get('.cx-item-list-row')
    .should('contain', eosCameraProductName)
    .within(() => {
      checkForAppliedPromotionsInCartModal(eosCameraProductName);
    });
}

export function addProductToCart() {
  cy.intercept(
    `${Cypress.env('API_URL')}${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/carts/*`
  ).as('addToCart');
  cy.get('cx-add-to-cart')
    .findByText(/Add To Cart/i)
    .click();
  cy.wait(`@addToCart`);
}

export function goToCartDetailsViewFromCartDialog() {
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.findByText(/view cart/i).click();
  });
}

export function selectShippingAddress() {
  cy.findByText(/proceed to checkout/i).click();
  cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-row')
    .find('.cx-summary-amount')
    .should('not.be.empty');
  cy.get('.cx-card-title').should('contain', 'Default Shipping Address');
  cy.get('.card-header').should('contain', 'Selected');
  cy.get('button.btn-primary').click();
}

export function selectDeliveryMethod() {
  cy.get('.cx-checkout-title').should('contain', 'Shipping Method');
  cy.get('cx-delivery-mode input').first().should('be.checked');
  cy.get('button.btn-primary').click();
}

export function selectPaymentMethod() {
  cy.get('.cx-checkout-title').should('contain', 'Payment');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-total')
    .find('.cx-summary-amount')
    .should('not.be.empty');
  cy.get('.cx-card-title').should('contain', '✓ DEFAULT');
  cy.get('.card-header').should('contain', 'Selected');
  const reviewOrderAlias = waitForPage('/checkout/review-order', 'reviewOrder');
  cy.get('button.btn-primary').click();
  cy.wait(`@${reviewOrderAlias}`);
}

export function goToOrderHistoryDetailsFromSummary() {
  cy.get('.cx-page-title').then((el) => {
    const orderNumber = el.text().match(/\d+/)[0];
    waitForOrderToBePlacedRequest(orderNumber);
    cy.visit(`/my-account/order/${orderNumber}`);
  });
}

export function checkAppliedPromotions() {
  it('Should display promotions for product in cart and checkout', () => {
    addProductToCart();
    checkForAppliedPromotionsInCartModal(eosCameraProductName);
    goToCartDetailsViewFromCartDialog();
    checkForAppliedPromotions();

    cy.get('.cart-details-wrapper > .cx-total').then(($cart) => {
      const cartId = $cart.text().match(/[0-9]+/)[0];
      cy.log(`CartId: ${cartId}`);
      cy.window()
        .then((win) => JSON.parse(win.localStorage.getItem('spartacus⚿⚿auth')))
        .then(({ token }) => {
          const stateAuth = token;
          cy.requireShippingAddressAdded(defaultAddress, stateAuth, cartId);
          cy.requirePaymentMethodAdded(cartId);
        });
      selectShippingAddress();
      selectDeliveryMethod();
      selectPaymentMethod();
      checkForAppliedPromotions();
    });
  });

  it('Should verify and place order, then go to order in order history', () => {
    verifyAndPlaceOrder();
    checkForAppliedPromotions();
  });

  it('Should verify promotions in order confirmation details', () => {
    goToOrderHistoryDetailsFromSummary();
    checkForAppliedPromotions();
  });
}

export function decreaseQuantityOfCartEntry() {
  cy.get('cx-item-counter button').first().click();
}

export function removeCartEntry() {
  cy.get('.cx-item-list-items').within(() => {
    cy.findByText(/Remove/i).click();
  });
}

export function checkAppliedPromotionsFordifferentCartTotals() {
  const batteryProductCode = '266685';

  it('Should display promotions for cart quantities increase/decrease', () => {
    cy.visit(`/product/${batteryProductCode}`);
    addProductToCart();
    cy.visit(`/product/${batteryProductCode}`);
    addProductToCart();

    registerCartPageRoute();
    cy.intercept({
      method: 'GET',
      pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/*/customercoupons`,
    }).as('customer_coupons');

    goToCartDetailsViewFromCartDialog();
    cy.wait('@cart_page');
    cy.wait('@customer_coupons');
    cy.get('.cx-promotions').should('contain', '200');

    decreaseQuantityOfCartEntry();
    cy.get('.cx-promotions').should('not.contain', '200');
  });
}
