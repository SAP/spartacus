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

function apparelProductDetailsTest() {
  it('should be able to select style variant on base product page', () => {
    productDetails.selectProductStyleVariant();
  });

  it('should be able to select size variant with selected style option', () => {
    productDetails.selectProductSizeVariant();
  });

  it('should show out of stock label when size variant without stock was selected', () => {
    productDetails.selectProductSizeVariantWithoutStock();
  });
}

function productDescriptionToggleTest() {
  it('should show a preview of the product description when description is a long', () => {
    productDetails.descriptionShowMoreShowLess();
  });
}

function configureDefaultProduct() {
  cy.window().then((win) => win.sessionStorage.clear());
  cy.cxConfig({
    context: {
      baseSite: ['electronics-spa'],
      currency: ['USD'],
    },
  });
  cy.visit('/product/266685');
}

function configureApparelProduct() {
  cy.window().then((win) => win.sessionStorage.clear());
  cy.cxConfig({
    context: {
      baseSite: ['apparel-uk-spa'],
      currency: ['GBP'],
    },
  });
  cy.visit('/product/100191');
}

function configureProductDescriptionPreview() {
  cy.window().then((win) => win.sessionStorage.clear());
  cy.cxConfig({
    context: {
      baseSite: ['electronics-spa'],
      currency: ['USD'],
    },
  });
  cy.visit('/product/553637');
}

context('Product details', () => {
  describe('Default', () => {
    before(configureDefaultProduct);

    productDetailsTest();
  });

  describe('Apparel', () => {
    before(configureApparelProduct);

    apparelProductDetailsTest();
  });

  describe('Product description toggle more/less ', () => {
    before(configureProductDescriptionPreview);
    productDescriptionToggleTest();
  });
});

context(`${formats.mobile.width + 1}p resolution - Product details`, () => {
  before(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  describe('Default', () => {
    before(configureDefaultProduct);

    productDetailsTest();
  });

  describe('Apparel', () => {
    before(configureApparelProduct);

    apparelProductDetailsTest();
  });
});
