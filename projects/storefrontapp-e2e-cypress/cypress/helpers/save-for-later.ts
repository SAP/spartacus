import * as cart from './cart';
import * as cartCoupon from './cart-coupon';
import { cartUser } from './cart';

interface TestProduct {
  code: string;
  name?: string;
  price?: number;
}

export enum ItemList {
  Cart,
  SaveForLater,
  Order,
}

export const products: TestProduct[] = [
  {
    code: '898503',
    name: '1V',
    price: 2117.0,
  },
  {
    code: '1934793',
    name: 'PowerShot A480',
    price: 99.85,
  },

  {
    code: '1993747',
    name: 'DSC-W270',
    price: 206.88,
  },
];

export function getItem(product, position: ItemList) {
  if (position === ItemList.Cart) {
    return cy
      .get('cx-cart-details > .cart-details-wrapper > cx-cart-item-list')
      .contains('cx-cart-item', product.code);
  } else {
    return cy
      .get('cx-save-for-later > .cart-details-wrapper > cx-cart-item-list')
      .contains('cx-cart-item', product.code);
  }
}

export function stubForCartsRefresh() {
  stubForCartRefresh();
  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/*/carts/selectivecart*&lang=en&curr=USD`
  ).as('refresh_selectivecart');
}
export function stubForCartRefresh() {
  cy.server();
  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/*/carts/*?fields=*&lang=en&curr=USD`
  ).as('refresh_cart');
}

export function moveItem(
  product,
  targetPosition: ItemList,
  isAnonymous: boolean = false
) {
  stubForCartsRefresh();
  const currentPosition =
    targetPosition === ItemList.Cart ? ItemList.SaveForLater : ItemList.Cart;
  getItem(product, currentPosition).within(() => {
    cy.get('.cx-sfl-btn > .link').click();
  });
  if (!isAnonymous) {
    cy.wait(['@refresh_cart', '@refresh_selectivecart']);
  }
}

export function removeItem(product, position: ItemList) {
  stubForCartRefresh();
  getItem(product, position).within(() => {
    cy.get('.cx-remove-btn > .link')
      .should('not.be.disabled')
      .then((el) => {
        cy.wrap(el).click();
      });
  });
  cy.wait('@refresh_cart').its('status').should('eq', 200);
}

export function validateProduct(product, qty = 1, position: ItemList) {
  return getItem(product, position).within(() => {
    cy.get('cx-item-counter input').should('have.value', `${qty}`);
    cy.get('.cx-total .cx-value').should('exist');
  });
}

export function validateCartPromotion(hasPromotion: boolean) {
  cy.get('.cx-promotions > :nth-child(1)').should(
    hasPromotion ? 'exist' : 'not.exist'
  );
}

export function validateCart(qtyInCart: Number, qtyInSavedCart: Number) {
  if (qtyInCart === 0) {
    cy.getByText('Your shopping cart is empty').should('exist');
  } else {
    cy.get('cx-cart-details cx-cart-item-list .cx-item-list-row').should(
      'have.length',
      qtyInCart
    );
  }
  if (qtyInSavedCart === 0) {
    cy.get('cx-save-for-later cx-cart-item-list .cx-item-list-row').should(
      'not.exist'
    );
  } else {
    cy.get('cx-save-for-later cx-cart-item-list .cx-item-list-row').should(
      'have.length',
      qtyInSavedCart
    );
  }
}

function verifyMiniCartQty(qty: number) {
  cy.get('cx-mini-cart .count').should('contain', qty);
}

export function addProductToCart(product) {
  cy.visit(`/product/${product.code}`);

  cy.get('cx-add-to-cart')
    .getAllByText(/Add To Cart/i)
    .click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-code').should('contain', product.code);
    cy.getByText(/view cart/i).click();
  });
  validateProduct(product, 1, ItemList.Cart);
}

export function verifyAsAnonymous() {
  addProductToCart(products[0]);
  cy.visit('/cart');
  moveItem(products[0], ItemList.SaveForLater, true);
  cy.location('pathname').should('contain', '/login');
}

export function verifyWhenLogBackIn() {
  cy.register(cartUser.registrationData.email, cartUser.registrationData);
  cy.login(cartUser.registrationData.email, cartUser.registrationData.password);
  addProductToCart(products[2]);
  moveItem(products[2], ItemList.SaveForLater);
  cart.logOutAndEmptyCart();
  cy.login(cartUser.registrationData.email, cartUser.registrationData.password);
  cy.visit('/cart');
  validateProduct(products[2], 1, ItemList.SaveForLater);
}

export function verifySaveForLaterAndRemove() {
  cy.visit('/cart');
  validateCart(0, 0);

  const mergeProduct = products[0];
  addProductToCart(mergeProduct);
  addProductToCart(products[1]);
  moveItem(mergeProduct, ItemList.SaveForLater);
  validateCart(1, 1);
  verifyMiniCartQty(1);

  // validate merge from cart to save for later and back
  addProductToCart(products[0]);
  moveItem(products[0], ItemList.SaveForLater);
  validateCart(1, 1);
  moveItem(products[0], ItemList.Cart);
  validateCart(2, 0);
  verifyMiniCartQty(3); // Total number of items in cart
  cart.logOutAndEmptyCart();
}

export function verifyPlaceOrder() {
  const stateAuth = JSON.parse(localStorage.getItem('spartacus-local-data'))
    .auth;
  addProductToCart(products[0]);
  addProductToCart(products[1]);
  moveItem(products[0], ItemList.SaveForLater);
  validateCart(1, 1);
  cy.wait(1000);
  cartCoupon.placeOrder(stateAuth);
  cy.reload();
  validateCart(0, 1);
  validateProduct(products[0], 1, ItemList.SaveForLater);
}
