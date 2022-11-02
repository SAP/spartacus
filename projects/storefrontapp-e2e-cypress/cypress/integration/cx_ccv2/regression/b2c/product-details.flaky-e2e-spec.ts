import * as productDetails from '../../../../helpers/product-details';
import { formats } from '../../../../sample-data/viewports';

// TODO. Fix Priority 2. Remove this line after this spec runs successfully with CCV2.
function productDetailsTest() {
  it('should contain correct product details', () => {
    productDetails.verifyProductDetails();
    productDetails.verifyCorrectTabs();
    productDetails.verifyTextInTabs();
    productDetails.verifyContentInReviewTab();
  });

  it('should submit a review', () => {
    productDetails.verifyReviewForm();
  });

  it('should be able to add different quantities of product to cart', () => {
    productDetails.verifyQuantityInCart();
  });
}

function apparelProductDetailsTest() {
  it('should be able to select style / size variant', () => {
    productDetails.selectProductStyleVariant();
    productDetails.selectProductSizeVariant();
  });

  it('should show out of stock label when size variant without stock was selected', () => {
    productDetails.selectProductSizeVariantWithoutStock();
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

  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/pages?pageType=ProductPage**`
  ).as('productPage');

  cy.visit('/product/266685');

  cy.wait(`@productPage`);
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

context('Product details', () => {
  describe('Electronics', () => {
    before(configureDefaultProduct);

    productDetailsTest();
  });

  describe('Apparel', () => {
    before(configureApparelProduct);

    apparelProductDetailsTest();
  });
});

//TODO split this test in two files (one for mobile)
context(`${formats.mobile.width + 1}p resolution - Product details`, () => {
  before(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  describe('Electronics', () => {
    before(configureDefaultProduct);

    productDetailsTest();
  });

  describe('Apparel', () => {
    before(configureApparelProduct);

    apparelProductDetailsTest();
  });
});
