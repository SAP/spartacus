import { waitForPage } from './checkout-flow';
import { login } from './auth-forms';
import * as cart from './cart';

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
  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/*/carts/selectivecart*?fields=*&lang=en&curr=USD`
  ).as('refresh_selectivecart');
}
export function stubForCartRefresh() {
  cy.intercept(
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
  cy.wait('@refresh_cart').its('response.statusCode').should('eq', 200);
}

export function validateProduct(product, qty = 1, position: ItemList) {
  return getItem(product, position)
    .wait(2000)
    .within(() => {
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

export function verifyMiniCartQty(qty: number) {
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

export function testAnonymousUserSaveForLater() {
  context('Guest', () => {
    it('should register and login first for anonymous user', () => {
      addProductToCart(products[0]);
      cy.visit('/cart');
      moveItem(products[0], ItemList.SaveForLater, true);
      cy.location('pathname').should('contain', '/login');
    });
  });
}

export function testLoggedInUserSaveForLater() {
  context('Re-login customer', () => {
    it('Should save items in saved for later list when logout', () => {
      const alias = waitForPage('/cart', 'cartPage');
      cy.requireLoggedIn().then((account) => {
        addProductToCart(products[2]);
        moveItem(products[2], ItemList.SaveForLater);
        validateCart(0, 1);
        cart.logOutAndEmptyCart();
        const loginPage = waitForPage('/login', 'getLoginPage');
        cy.visit('/login');
        cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);
        login(account.username, account.password);
        cy.url().should('not.contain', 'login');
      });
      cy.visit(`/cart`);
      cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);

      verifyMiniCartQty(0);
      validateProduct(products[2], 1, ItemList.SaveForLater);
      removeItem(products[2], ItemList.SaveForLater);
    });
  });
}
