import { addProductToCart } from './checkout-as-persistent-user';

export function loginSuccessfully() {
  cy.login('test-user-cypress@ydev.hybris.com', 'Password123.');
  cy.visit('/');
  cy.get('.cx-login-greet').should('contain', 'Test User');
}

context('Checkout with product variants', () => {
  describe('Apparel', () => {
    before(configureApparelProduct);
    checkoutWithVariants();
  });
});

function configureApparelProduct() {
  cy.window().then(win => win.sessionStorage.clear());
  cy.cxConfig({
    context: {
      baseSite: ['apparel-uk-spa'],
      currency: ['GBP'],
    },
  });
  cy.visit('/product/100191');
}

export function addProductVariantToCart() {
  // cy.visit('/product/100191');
}

export function checkoutWithVariants() {
  it('should login successfully', () => {
    loginSuccessfully();
  });
  it('should visit product variant page', () => {
    addProductVariantToCart();
  });
}
