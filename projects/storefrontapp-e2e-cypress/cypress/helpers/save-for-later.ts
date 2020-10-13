import * as cart from './cart';
import * as cartCoupon from './cart-coupon';

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
    )}/users/*/carts/selectivecart*?fields=*&lang=en&curr=USD`
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
    cy.findByText('Your shopping cart is empty').should('exist');
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
    .findAllByText(/Add To Cart/i)
    .click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-code').should('contain', product.code);
    cy.findByText(/view cart/i).click();
  });
  validateProduct(product, 1, ItemList.Cart);
}

export function verifySaveForLaterAsAnonymous() {
  addProductToCart(products[0]);
  cy.visit('/cart');
  moveItem(products[0], ItemList.SaveForLater, true);
  cy.location('pathname').should('contain', '/login');
}

export function verifySaveForLaterWhenRelogin() {
  cart.registerCartUser();
  cart.loginCartUser();
  addProductToCart(products[2]);
  moveItem(products[2], ItemList.SaveForLater);
  cart.logOutAndEmptyCart();
  cart.loginCartUser();
  cy.visit('/cart');
  validateProduct(products[2], 1, ItemList.SaveForLater);
}

export function verifySaveForLater() {
  cy.visit('/cart');
  validateCart(0, 0);
  addProductToCart(products[0]);
  moveItem(products[0], ItemList.SaveForLater);
  validateCart(0, 1);
  addProductToCart(products[1]);
  addProductToCart(products[2]);
  validateCart(2, 1);
  validateCartPromotion(true);
  moveItem(products[1], ItemList.SaveForLater);
  validateCart(1, 2);
  validateCartPromotion(true);
  moveItem(products[1], ItemList.Cart);
  validateCartPromotion(true);
  validateCart(2, 1);
  // validate merge
  addProductToCart(products[0]);
  validateCart(3, 1);
  moveItem(products[0], ItemList.SaveForLater);
  validateCart(2, 1);
  addProductToCart(products[0]);
  moveItem(products[0], ItemList.Cart);
  validateCart(3, 0);
  verifyMiniCartQty(5); //to avoid the cart item quatity is not updated yet
  //remove
  moveItem(products[0], ItemList.SaveForLater);
  validateCart(2, 1);
  removeItem(products[0], ItemList.SaveForLater);
  validateCart(2, 0);
}

export function verifyGiftProduct() {
  addProductToCart(products[0]);
  addProductToCart(products[3]);
  verifyMiniCartQty(3);
  moveItem(products[3], ItemList.SaveForLater);
  validateCart(1, 2);
  moveItem(products[3], ItemList.Cart);
  validateCart(3, 0);
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
