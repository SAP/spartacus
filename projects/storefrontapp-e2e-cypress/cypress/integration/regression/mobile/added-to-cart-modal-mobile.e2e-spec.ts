import { formats } from '../../../sample-data/viewports';
import * as addedToCartModal from '../../../helpers/added-to-cart-modal';

describe(`${formats.mobile.width +
  1}p resolution - Added to cart modal`, () => {
  before(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.visit(`/product/${addedToCartModal.productId}`);
  });
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });
  it('basic modal behavior', () => {
    addedToCartModal.verifyItemCounterOnPDP();
  });

  it('adding same product twice to cart', () => {
    addedToCartModal.addSameProductTwice();
  });

  it('adding different products to cart', () => {
    cy.get('cx-searchbox [aria-label="Search "]').click();
    addedToCartModal.addDifferentProducts();
  });

  it('refreshing page should not show modal', () => {
    addedToCartModal.refreshPage();
  });

  it('total price is correctly estimated', () => {
    addedToCartModal.increaseProductQtyOnPDP();
  });
});
