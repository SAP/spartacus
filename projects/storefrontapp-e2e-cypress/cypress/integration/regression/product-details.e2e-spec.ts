import * as productDetails from '../../helpers/product-details';
import { formats } from '../../sample-data/viewports';

const electronicSPAProduct = 'electronics-spa/en/USD/product/266685';
const apparelSPAProduct = 'apparel-uk-spa/en/GBP/product/100191';

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

  it('should be able to select style variant on base product page', () => {
    cy.visit(apparelSPAProduct);
    productDetails.selectProductStyleVariant();
  });

  it('should be able to select size variant with selected style option', () => {
    cy.visit(apparelSPAProduct);
    productDetails.selectProductSizeVariant();
  });

  it('should show out of stock label when size variant without stock was selected', () => {
    cy.visit(apparelSPAProduct);
    productDetails.selectProductSizeVariantWithoutStock();
  });

}

context('Product details', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit(electronicSPAProduct);
  });

  productDetailsTest();
});

context(`${formats.mobile.width + 1}p resolution - Product details`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.visit(electronicSPAProduct);
  });
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  productDetailsTest();
});
