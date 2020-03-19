import { apiUrl } from '../support/utils/login';
import {
  currentSpecificOrderRoute,
  waitCurrentSpecificOrder,
  waitForOrderToBePlacedRequest,
} from '../support/utils/order-placed';
import {
  addPaymentMethod,
  addShippingAddress,
  deletePaymentCard,
  deleteShippingAddress,
  verifyAndPlaceOrder,
} from './checkout-as-persistent-user';
import { waitForPage } from './checkout-flow';

export const eosCameraProductName = 'EOS450D';

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
  cy.get('cx-add-to-cart')
    .getByText(/Add To Cart/i)
    .click();
  cy.server();
  cy.route(`${apiUrl}/rest/v2/electronics-spa/users/current/carts/*`).as(
    'cart'
  );
  cy.wait(`@cart`)
    .its('status')
    .should('eq', 200);
}

export function goToCartDetailsViewFromCartDialog() {
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.getByText(/view cart/i).click();
  });
}

export function selectShippingAddress() {
  cy.getByText(/proceed to checkout/i).click();
  cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-row')
    .find('.cx-summary-amount')
    .should('not.be.empty');
  cy.get('.cx-card-title').should('contain', 'Default Shipping Address');
  cy.get('.card-header').should('contain', 'Selected');
  cy.visit(`/checkout/delivery-mode`);
}

export function selectDeliveryMethod() {
  cy.get('.cx-checkout-title').should('contain', 'Shipping Method');
  cy.get('#deliveryMode-standard-net').should('be.checked');
  cy.get('button.btn-primary').click();
  // cannot use cy.visit here, as payment details are unavailable
  cy.wait(1000);
}

export function selectPaymentMethod() {
  cy.get('.cx-checkout-title').should('contain', 'Payment');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-total')
    .find('.cx-summary-amount')
    .should('not.be.empty');
  cy.get('.cx-card-title').should('contain', 'Default Payment Method');
  cy.get('.card-header').should('contain', 'Selected');
  cy.get('button.btn-primary').click();
  // cannot use cy.visit here, as review order is unavailable
  cy.wait(1000);
}

export function goToOrderHistoryDetailsFromSummary() {
  cy.get('.cx-page-title').then(el => {
    const orderNumber = el.text().match(/\d+/)[0];

    waitForOrderToBePlacedRequest(orderNumber);

    const orderHistoryPage = waitForPage(
      '/my-account/orders',
      'getOrderHistoryPage'
    );
    cy.selectUserMenuOption({
      option: 'Order History',
    });
    cy.wait(`@${orderHistoryPage}`)
      .its('status')
      .should('eq', 200);

    currentSpecificOrderRoute(orderNumber);
    cy.get('cx-order-history .cx-order-history-code')
      .first()
      .should('contain', orderNumber)
      .click({ force: true });
    waitCurrentSpecificOrder();
  });

  // TODO: need to re-render the dom because of the `repaint` issue from cart-list-item.component.ts
  cy.wait(3000);
  cy.reload(true);
  // END TODO
}

export function checkAppliedPromotionsForLoggedUser() {
  it('should display promotions for product in modal after adding to cart', () => {
    addProductToCart();
    checkForAppliedPromotionsInCartModal(eosCameraProductName);
  });

  it('should display promotions in users cart view for added product', () => {
    goToCartDetailsViewFromCartDialog();
    checkForAppliedPromotions();
  });

  it('should go through checkout and display promotions for product in submit order', () => {
    addShippingAddress();
    addPaymentMethod();
    selectShippingAddress();
    selectDeliveryMethod();
    selectPaymentMethod();
    checkForAppliedPromotions();
  });

  it('should verify and place order, then go to order in order history', () => {
    verifyAndPlaceOrder();
    checkForAppliedPromotions();
  });

  it('should verify promotions in order confirmation details', () => {
    cy.wait(Cypress.env('ORDER_HISTORY_WAIT_TIME'));
    goToOrderHistoryDetailsFromSummary();
    checkForAppliedPromotions();
  });

  after(() => {
    deletePaymentCard();
    deleteShippingAddress();
  });
}

export function checkForAppliedCartPromotions(shouldContainPromotion) {
  if (shouldContainPromotion) {
    cy.get('.cx-promotions').should('contain', '200');
  } else {
    cy.get('.cx-promotions').should('not.contain', '200');
  }
}

export function decreaseQuantityOfCartEntry() {
  cy.get('cx-item-counter button')
    .first()
    .click();
}

export function removeCartEntry() {
  cy.get('.cx-item-list-items').within(() => {
    cy.getByText(/Remove/i).click();
  });
}

export function checkAppliedPromotionsFordifferentCartTotals() {
  const batteryProductCode = '266685';

  it('should add two products to the cart', () => {
    const productPageBattery = waitForPage(
      `ProductPage&code=${batteryProductCode}`,
      'getProductPageBattery'
    );

    cy.visit(`/product/${batteryProductCode}`);
    cy.wait(`@${productPageBattery}`)
      .its('status')
      .should('eq', 200);

    addProductToCart();

    cy.visit(`/product/${batteryProductCode}`);

    cy.wait(`@${productPageBattery}`)
      .its('status')
      .should('eq', 200);

    addProductToCart();
  });

  it('should display promotions in users cart view for added products', () => {
    goToCartDetailsViewFromCartDialog();
    checkForAppliedCartPromotions(true);
  });

  it('should not display promotions in users cart view after removing first product', () => {
    decreaseQuantityOfCartEntry();
    checkForAppliedCartPromotions(false);
  });

  after(() => {
    removeCartEntry();
  });
}
