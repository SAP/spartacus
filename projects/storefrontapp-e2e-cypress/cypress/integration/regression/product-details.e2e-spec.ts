import * as productDetails from '../../helpers/product-details';
import { viewportContext } from '../../helpers/viewport-context';

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
  viewportContext(['desktop', 'mobile'], () => {
    describe('Electronics', () => {
      before(configureDefaultProduct);

      productDetailsTest();

      it('should check keyboard accessibility', () => {
        cy.tabScreenshot({ container: 'main', scenario: 'electronics' });
      });
    });

    describe('Apparel', () => {
      before(configureApparelProduct);

      apparelProductDetailsTest();

      it('should check keyboard accessibility', () => {
        cy.tabScreenshot({ container: 'main', scenario: 'apparel' });
      });
    });
  });
});
