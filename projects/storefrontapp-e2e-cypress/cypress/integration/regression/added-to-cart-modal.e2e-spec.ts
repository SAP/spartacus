import * as addedToCartModal from '../../helpers/added-to-cart-modal';
import { getProductUrl } from '../../helpers/product-details';

describe('Added to cart modal', () => {
  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.visit(getProductUrl(addedToCartModal.productId));
  });

  it('testing itemCounter on PDP', () => {
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
