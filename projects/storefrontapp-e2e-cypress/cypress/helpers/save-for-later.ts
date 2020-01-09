import * as cart from './cart';
import * as cartCoupon from './cart-coupon';
import { apiUrl } from '../support/utils/login';

interface TestProduct {
  code: string;
  name?: string;
  price?: number;
}

export enum Position {
  Cart,
  SaveForLater,
  Order,
}

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

export function getItem(product, position: Position) {
  if (Position.Cart === position) {
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
    `${apiUrl}/rest/v2/electronics-spa/users/*/carts/selectivecart*?fields=*&lang=en&curr=USD`
  ).as('refresh_selectivecart');
}
export function stubForCartRefresh() {
  cy.server();
  cy.route(
    'GET',
    `${apiUrl}/rest/v2/electronics-spa/users/*/carts/*?fields=*&lang=en&curr=USD`
  ).as('refresh_cart');
}

export function moveItem(
  product,
  targetPosition: Position,
  isAnonymous: boolean = false
) {
  stubForCartsRefresh();
  const currentPosition =
    Position.Cart === targetPosition ? Position.SaveForLater : Position.Cart;
  getItem(product, currentPosition).within(() => {
    cy.get('.cx-sfl-btn > .link').click();
  });
  if (!isAnonymous) {
    cy.wait(['@refresh_cart', '@refresh_selectivecart']).spread(
      (refresh_cart, refresh_selectivecart) => {
        cy.wrap(refresh_cart)
          .its('status')
          .should('eq', 200);
        cy.wrap(refresh_selectivecart)
          .its('status')
          .should('eq', 200);
      }
    );
  }
}

export function removeItem(product, position: Position) {
  stubForCartRefresh();
  getItem(product, position).within(() => {
    cy.get('.cx-remove-btn > .link')
      .should('not.be.disabled')
      .then(el => {
        cy.wrap(el).click();
      });
  });
  cy.wait('@refresh_cart')
    .its('status')
    .should('eq', 200);
}

export function validateProduct(product, qty = 1, position: Position) {
  return getItem(product, position).within(() => {
    if (Position.Cart === position) {
      cy.get('.cx-counter-value').should('have.value', `${qty}`);
    } else {
      cy.get('.cx-quantity > .cx-value').should('contain', `${qty}`);
    }
    cy.get('.cx-total > .cx-value').should('exist');
  });
}

export function validateCartPromotion(hasPromotion: boolean) {
  cy.get('.cx-promotions > :nth-child(1)').should(
    hasPromotion ? 'exist' : 'not.exist'
  );
}

export function validateCart(qtyInCart: Number, qtyInSavedCart: Number) {
  if (0 === qtyInCart) {
    cy.getByText('Your shopping cart is empty').should('exist');
  } else {
    cy.get('cx-cart-details cx-cart-item-list .cx-item-list-row').should(
      'have.length',
      qtyInCart
    );
  }
  cy.get('cx-save-for-later cx-cart-item-list .cx-item-list-row').should(
    'have.length',
    qtyInSavedCart
  );
}

function verifyMiniCartQty(qty: number) {
  cy.get('cx-mini-cart .count').should('contain', qty);
}

export function addProductToCart(product) {
  cy.get('cx-searchbox cx-icon[aria-label="search"]').click({ force: true });
  cy.get('cx-searchbox input')
    .clear()
    .type(`${product.code}{enter}`);
  cy.location('pathname').should('contain', `${product.code}`);
  cy.get('cx-add-to-cart:first')
    .getAllByText(/Add To Cart/i)
    .first()
    .click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-code').should('contain', product.code);
    cy.getByText(/view cart/i).click();
  });
  validateProduct(product, 1, Position.Cart);
}

export function verifySaveForLaterAsAnonymous() {
  addProductToCart(products[0]);
  cy.visit('/cart');
  moveItem(products[0], Position.SaveForLater, true);
  cy.location('pathname').should('contain', '/login');
}

export function verifySaveForLaterWhenRelogin() {
  cart.registerCartUser();
  cart.loginCartUser();
  addProductToCart(products[2]);
  moveItem(products[2], Position.SaveForLater);
  cart.logOutAndEmptyCart();
  cart.loginCartUser();
  cy.visit('/cart');
  validateProduct(products[2], 1, Position.SaveForLater);
}

export function verifySaveForLater() {
  cy.visit('/cart');
  validateCart(0, 0);
  addProductToCart(products[0]);
  moveItem(products[0], Position.SaveForLater);
  validateCart(0, 1);
  addProductToCart(products[1]);
  addProductToCart(products[2]);
  validateCart(2, 1);
  validateCartPromotion(true);
  moveItem(products[2], Position.SaveForLater);
  validateCart(1, 2);
  validateCartPromotion(false);
  moveItem(products[2], Position.Cart);
  validateCartPromotion(true);
  validateCart(2, 1);
  //validate merge
  addProductToCart(products[0]);
  validateCart(3, 1);
  moveItem(products[0], Position.SaveForLater);
  validateProduct(products[0], 2, Position.SaveForLater);
  validateCart(2, 1);
  addProductToCart(products[0]);
  moveItem(products[0], Position.Cart);
  validateCart(3, 0);
  verifyMiniCartQty(5); //to avoid the cart item quatity is not updated yet
  validateProduct(products[0], 3, Position.Cart);
  //remove
  moveItem(products[0], Position.SaveForLater);
  validateCart(2, 1);
  removeItem(products[0], Position.SaveForLater);
  validateCart(2, 0);
}

export function verifyGiftProduct() {
  addProductToCart(products[0]);
  addProductToCart(products[3]);
  verifyMiniCartQty(3);
  moveItem(products[3], Position.SaveForLater);
  validateCart(1, 2);
  moveItem(products[3], Position.Cart);
  validateCart(3, 0);
}

export function verifyPlaceOrder() {
  const stateAuth = JSON.parse(localStorage.getItem('spartacus-local-data'))
    .auth;
  addProductToCart(products[0]);
  addProductToCart(products[1]);
  moveItem(products[0], Position.SaveForLater);
  validateCart(1, 1);
  cartCoupon.placeOrder(stateAuth);
  cy.reload();
  validateCart(0, 1);
  validateProduct(products[0], 1, Position.SaveForLater);
}
