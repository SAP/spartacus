import * as addedToCartModal from '../../helpers/added-to-cart-modal';

describe('Added to cart modal', () => {
  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.visit(`/product/${addedToCartModal.productId}`);
  });

  it('basic modal behavior', () => {
    addedToCartModal.verifyItemCounterOnPDP();
  });

  it('adding same product twice to cart', () => {
    addedToCartModal.addSameProductTwice();
  });

  it('adding different products to cart', () => {
    addedToCartModal.addDifferentProducts();
  });

  it('refreshing page should not show modal', () => {
    addedToCartModal.refreshPage();
  });

  it('total price is correctly estimated', () => {
    addedToCartModal.increaseProductQtyOnPDP();
  });
});
