import * as productDetails from '../../helpers/product-details';
import { formats } from '../../sample-data/viewports';

function productDetailsTest() {
  it('should contain correct product details', () => {
    productDetails.verifyProductDetails();
  });

  it('should contain correct tabs', () => {
    productDetails.verifyCorrectTabs();
  });

  it('should contain tabs with correct text', () => {
    productDetails.verifyTextInTabs();
  });

  it('should contain correct review tab', () => {
    productDetails.verifyContentInReviewTab();
  });

  it('should contain correct review form', () => {
    productDetails.verifyReviewForm();
  });

  it('should be able to add different quantities of product to cart', () => {
    productDetails.verifyQuantityInCart();
  });
}

context('Product details', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/product/266685');
  });

  productDetailsTest();
});

context(`${formats.mobile.width + 1}p resolution - Product details`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.visit('/product/266685');
  });
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  productDetailsTest();
});
