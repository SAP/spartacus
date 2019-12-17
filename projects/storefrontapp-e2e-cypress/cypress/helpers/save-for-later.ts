import * as cart from './cart';
import * as cartCoupon from './cart-coupon';
import { apiUrl } from '../support/utils/login';
import { user } from '../sample-data/checkout-flow';

interface TestProduct {
  code: string;
  name?: string;
  price?: number;
}

enum Position {
  Cart,
  SaveForLater,
  Order,
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price);

export const products: TestProduct[] = [
  {
    code: '300938',
    name: 'Photosmart E317 Digital Camera',
    price: 114.12,
  },
  {
    code: '1934793',
    name: 'PowerShot A480',
    price: 99.85,
  },

  {
    code: '1978440_red',
    name: 'DSC-H20 Red',
    price: 558.4,
  },
  {
    code: '1934796',
    name: 'PowerShot A480',
    price: 110.88,
  },
  {
    code: '137220',
    name: 'Camcordertape DV 60min (2)',
    price: 0,
  },
];

export function addProduct(product, mobile: boolean) {
  goToFirstProductFromSearch(product.code, mobile);
  cart.addToCart();
  cart.closeAddedToCartDialog();
  validateMiniCartCount().click({ force: true });
  validateProduct(product, 1, Position.Cart);
}

export function getItem(product, position: Position) {
  if (Position.Cart === position) {
    return cy
      .get('cx-cart-details > .cart-details-wrapper > cx-cart-item-list')
      .contains('cx-cart-item', product.name);
  } else {
    return cy
      .get('cx-save-for-later > .cart-details-wrapper > cx-cart-item-list')
      .contains('cx-cart-item', product.name);
  }
}

export function waitForCartRefresh() {
  cy.server();

  cy.route(
    'GET',
    `${apiUrl}/rest/v2/electronics-spa/users/*/carts/*?fields=*&lang=en&curr=USD`
  ).as('refresh_cart');
}
export function waitForAddToCart() {
  cy.server();

  cy.route(
    'POST',
    `${apiUrl}/rest/v2/electronics-spa/users/*/carts/*/entries?code=*&qty=*&lang=en&curr=USD`
  ).as('add_to_cart');
}

export function moveItem(
  product,
  qty: number,
  targetPosition: Position,
  isAnonymous: boolean = false
) {
  waitForCartRefresh();
  const currentPosition =
    Position.Cart === targetPosition ? Position.SaveForLater : Position.Cart;
  getItem(product, currentPosition).within(() => {
    cy.get('.cx-slf-btn > .link').click();
  });

  if (!isAnonymous) {
    cy.wait('@refresh_cart')
      .its('status')
      .should('eq', 200);
    cy.reload();
    validateProduct(product, qty, targetPosition);
  } else {
    cy.wait(500);
  }
}

export function removeItem(product, position: Position) {
  waitForCartRefresh();
  getItem(product, position).within(() => {
    cy.get('.cx-remove-btn > .link')
      .should('not.be.disabled')
      .then(el => {
        cy.wrap(el).click();
      });
  });

  cy.wait('@refresh_cart');
}

export function validateProduct(product, qty = 1, position: Position) {
  return getItem(product, position).within(() => {
    cy.get('.cx-price>.cx-value').should('contain', formatPrice(product.price));
    if (Position.Cart === position) {
      cy.get('.cx-counter-value').should('have.value', `${qty}`);
    } else {
      cy.get('.cx-quantity > .cx-value').should('contain', `${qty}`);
    }
    cy.get('.cx-total > .cx-value').should('exist');
  });
}

function goToFirstProductFromSearch(id: string, mobile: boolean) {
  cy.get('cx-storefront.stop-navigating');
  if (mobile) {
    cy.get('cx-searchbox cx-icon[aria-label="search"]').click();
    cy.get('cx-searchbox input')
      .clear({ force: true })
      .type(id, { force: true })
      .type('{enter}', { force: true });
    cy.get('cx-product-list-item')
      .first()
      .get('.cx-product-name')
      .first()
      .click();
  } else {
    cy.get('cx-searchbox input')
      .clear({ force: true })
      .type(id, { force: true });
    cy.get('cx-searchbox')
      .get('.results .products .name')
      .first()
      .click({ force: true });
  }
}

export function validateMiniCartCount() {
  return cy.get('cx-mini-cart').within(() => {
    cy.get('.count').should('not.be', 0);
  });
}

export function validateCartPromotion(hasPromotion: boolean) {
  cy.get('.cx-promotions > :nth-child(1)').should(
    hasPromotion ? 'exist' : 'not.exist'
  );
}

export function validateEmptyCart(hasSaveForLater: boolean) {
  if (hasSaveForLater) {
    cy.get('cx-save-for-later').should('exist');
  }
  cy.get('cx-breadcrumb h1').should('contain', 'Your Shopping Cart');
  if (hasSaveForLater) {
    cy.get('cx-save-for-later').should(
      'contain',
      'Your shopping cart is empty'
    );
  } else {
    cy.get('.EmptyCartMiddleContent').should(
      'contain',
      'Your shopping cart is empty'
    );
  }
}

export function verifyOrderHistory() {
  cy.get('cx-order-summary > cx-applied-coupons').should('not.exist');
  cy.get('.cx-summary-partials > .cx-summary-row').should('have.length', 4);
  cy.get('.cx-summary-partials').within(() => {
    cy.get(':nth-child(4)').should('not.contain', 'You saved');
  });
}
export function placeOrder() {
  cy.window().then(win => {
    const stateAuth = JSON.parse(localStorage.getItem('spartacus-local-data'))
      .auth;
    cy.get('cx-cart-details > .cart-details-wrapper > .cx-total')
      .first()
      .then($cart => {
        const cartId = $cart.text().match(/[0-9]+/)[0];
        console.log('cartId: ' + cartId);
        console.log('stateAuth: ' + JSON.stringify(stateAuth));
        cy.requireShippingAddressAdded(user.address, stateAuth);
        cy.requireShippingMethodSelected(stateAuth);
        cy.requirePaymentDone(stateAuth);
        return cy.requirePlacedOrder(stateAuth, cartId);
      });
  });
}

export function verifySaveForLaterAsAnonymous() {
  addProduct(products[0], false);
  cart.registerCartUser();
  cy.visit('/cart');
  moveItem(products[0], 1, Position.SaveForLater, true);
  cy.location('pathname').should('contain', '/login');
  cart.loginCartUser();
  cy.visit('/cart');
  validateProduct(products[0], 1, Position.Cart);
  moveItem(products[0], 1, Position.SaveForLater);
  moveItem(products[0], 1, Position.Cart);
}

export function verifySaveForLaterWhenRelogin() {
  cart.registerCartUser();
  cart.loginCartUser();
  addProduct(products[0], false);
  moveItem(products[0], 1, Position.SaveForLater);
  cart.logOutAndEmptyCart();
  addProduct(products[0], false);
  cart.loginCartUser();
  cy.visit('/cart');
  validateProduct(products[0], 1, Position.Cart);
  validateProduct(products[0], 1, Position.SaveForLater);

  moveItem(products[0], 2, Position.SaveForLater);
}

// export function verifySaveForLater() {
//   validateCartPromotion(true);
//   //Move p0 p1 to SFL
//   moveItem(products[0], 1, Position.SaveForLater);
//   moveItem(products[1], 1, Position.SaveForLater);

//   //Move p0 to cart and p2 to SFL
//   moveItem(products[0], 1, Position.Cart);
//   moveItem(products[2], 1, Position.SaveForLater);

//   validateCartPromotion(false);
//   //TODO: validate promotion()
//   //TODO: validate Empty cart

//   //Remove 0 form cart and move 1 to cart
//   removeItem(products[0], Position.Cart);
//   moveItem(products[1], 1, Position.Cart);

//   //Remove 1 form cart and 2 from SFL
//   removeItem(products[1], Position.Cart);
//   validateEmptyCart(true);
//   removeItem(products[2], Position.SaveForLater);
//   validateEmptyCart(false);
// }

export function verifySaveForLater() {
  addProduct(products[0], false);
  addProduct(products[1], false);
  validateCartPromotion(true);
  moveItem(products[1], 1, Position.SaveForLater);
  validateCartPromotion(false);
  removeItem(products[0], Position.Cart);
  validateEmptyCart(true);
}

export function verifyMergeCartIntoSaveForLater() {
  addProduct(products[0], false);
  moveItem(products[0], 1, Position.SaveForLater);
  addProduct(products[0], false);
  validateProduct(products[0], 1, Position.Cart);
  validateProduct(products[0], 1, Position.SaveForLater);
  moveItem(products[0], 2, Position.SaveForLater);
  validateEmptyCart(true);
}

export function verifyMergeSaveForLaterIntoCart() {
  addProduct(products[0], false);
  moveItem(products[0], 1, Position.SaveForLater);
  addProduct(products[0], false);
  validateProduct(products[0], 1, Position.Cart);
  validateProduct(products[0], 1, Position.SaveForLater);
  moveItem(products[0], 2, Position.Cart);
}

export function verifyGiftProductAndPlaceOrdr() {
  addProduct(products[3], false);
  moveItem(products[3], 1, Position.SaveForLater);
  validateProduct(products[4], 1, Position.SaveForLater);
  addProduct(products[0], false);
  placeOrder();
  cy.reload();
  validateEmptyCart(true);
  validateProduct(products[3], 1, Position.SaveForLater);
  validateProduct(products[4], 1, Position.SaveForLater);
}
