/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { addProductToCart as addToCart } from './applied-promotions';

export const summaryContainer = `cx-product-summary`;
export const infoContainer = `cx-product-intro`;
export const tabsContainer = 'cx-tab-paragraph-container';
export const tabsHeaderList = `${tabsContainer} > div > button`;
export const activeTabContainer = `${tabsContainer} .active .container`;
export const shippingTabActive = `${tabsContainer} .active cx-paragraph`;
export const reviewContainer = 'cx-product-reviews';
export const reviewList = `${reviewContainer} .review`;
export const writeAReviewButton = `${reviewContainer} .header button`;
export const writeAReviewForm = `${reviewContainer} form`;
export const addToCartButton = `cx-add-to-cart`;
export const atcModal = `cx-added-to-cart-dialog`;
export const atcModalTitle = `${atcModal} .cx-dialog-title`;
export const atcModalItem = `${atcModal} cx-cart-item`;
export const atcModalCloseButton = `${atcModal} [aria-label="Close Modal"]`;
export const header = `cx-page-layout[section="header"]`;
export const headerCartButton = `${header} cx-mini-cart .count`;
export const itemCounter = 'cx-item-counter';
export const breadcrumbContainer = 'cx-breadcrumb';
export const variantSelectorContainer = '.variant-selector';
export const variantStyleList = `${variantSelectorContainer} ul.variant-list`;

export const PRODUCT_NAME = 'Battery Video Light';

export function verifyProductDetails() {
  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/components`,
  }).as('getComponents');
  cy.wait('@getComponents').its('response.statusCode').should('eq', 200);
  cy.get(`${breadcrumbContainer} h1`).should('contain', PRODUCT_NAME);
  cy.get(`${infoContainer} .code`).should('contain', 'ID 266685');
  cy.get(`${summaryContainer} .summary`).should(
    'contain',
    '20-watt video light compatible with InfoLIYHIUM M-series batteries.'
  );
}

export function verifyCorrectTabs() {
  cy.get(tabsHeaderList).eq(0).should('contain', 'Product Details');
  cy.get(tabsHeaderList).eq(1).should('contain', 'Specs');
  cy.get(tabsHeaderList).eq(2).should('contain', 'Reviews');
  cy.get(tabsHeaderList).eq(3).should('contain', 'Shipping');
}

export function verifyShowReviewsLink() {
  cy.get(`${infoContainer} .cx-action-link`)
    .contains(/show reviews/i)
    .click();
  cy.get(`${tabsHeaderList}`)
    .contains(/reviews/i)
    .should('be.focused')
    .and('have.attr', 'aria-expanded', 'true');
}

export function verifyTextInTabs() {
  cy.get(activeTabContainer)
    .should(
      'contain',
      '20-watt video light compatible with InfoLIYHIUM M-series batteries.'
    )
    .should(
      'contain',
      'Can be switched to 10-watt or 20-watt settings (NP-FM50 batteries can only be used at 10-watt setting).'
    )
    .should('contain', 'Includes shoe adaptor for increased functionality.');
  cy.get(tabsHeaderList).eq(1).click();
  cy.get(activeTabContainer)
    .should('contain', 'Weight & dimensions')
    .should('contain', 'Colour')
    .should('contain', 'Technical details');
  cy.get(tabsHeaderList).eq(2).click();
  cy.get(activeTabContainer).should('contain', 'Overall Rating');
  cy.get(tabsHeaderList).eq(3).click();
  cy.get(shippingTabActive).should('contain', 'Lorem ipsum dolor sit amet,');
}

export function verifyContentInReviewTab() {
  cy.get(tabsHeaderList).eq(2).click();
  cy.get(reviewList).should('have.length', 5);
  cy.get(writeAReviewButton).should('be.visible');
}

export function verifyReviewForm() {
  cy.intercept({
    method: 'POST',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/products/*/reviews?lang=en&curr=USD`,
  }).as('submitReview');

  cy.get(writeAReviewButton).click();
  cy.get(writeAReviewForm).should('be.visible');
  cy.get(writeAReviewForm).findByText('Cancel').should('be.not.disabled');
  cy.get(`${writeAReviewForm} input`).eq(0).type('My review title');
  cy.get(`${writeAReviewForm} textarea`).type(
    'My best comment I have ever posted'
  );
  cy.get(`${writeAReviewForm} .star`).eq(2).click();
  cy.get(`${writeAReviewForm} input`).eq(2).type('Me');

  cy.get(writeAReviewForm).findByText('Submit').click();

  cy.wait('@submitReview');

  cy.get(reviewList).should('be.visible');
}

export function verifyQuantityInCart() {
  addToCart();
  cy.get(atcModal).should('be.visible');
  cy.get(atcModalTitle).should('contain', 'Item(s) added to your cart');
  cy.get(`${atcModalItem} .cx-name`).should('contain', PRODUCT_NAME);
  cy.get(atcModalCloseButton).click();
  cy.get(headerCartButton).should('contain', '1');
  for (let i = 0; i <= 2; i++) {
    cy.get(itemCounter).findByText('+').click();
  }
  addToCart();
  cy.get('cx-added-to-cart-dialog cx-cart-item');
  cy.get(atcModalCloseButton).click();
  cy.get(headerCartButton).should('contain', '5');
}

export function selectProductStyleVariant() {
  cy.get(`${variantStyleList} li img[alt="glacier"]`).first().click();

  cy.get(`${variantStyleList} li.selected-variant`).should('be.visible');
}

export function selectProductSizeVariant() {
  cy.get(`${variantStyleList} li img[alt="glacier"]`).first().click();

  cy.get('.variant-selector select').select('M');

  cy.get('cx-add-to-cart .quantity .info').should('contain', 'In stock');
  cy.get('cx-add-to-cart button').should('be.visible');
}

export function selectProductSizeVariantWithoutStock() {
  cy.get(`${variantStyleList} li img[alt="glacier"]`).first().click();

  cy.get('.variant-selector select').select('L');

  cy.get('cx-add-to-cart .quantity .info').should('contain', 'Out of stock');
}

export function productDetailsTest() {
  it('should contain correct product details', () => {
    verifyProductDetails();
    verifyCorrectTabs();
    verifyTextInTabs();
    verifyContentInReviewTab();
  });

  it('should jump to reviews section when Show Reviews clicked', () => {
    verifyShowReviewsLink();
  });

  it('should submit a review', () => {
    verifyReviewForm();
  });

  it('should be able to add different quantities of product to cart', () => {
    verifyQuantityInCart();
  });
}

export function apparelProductDetailsTest() {
  it('should be able to select style / size variant', () => {
    selectProductStyleVariant();
    selectProductSizeVariant();
  });

  it('should show out of stock label when size variant without stock was selected', () => {
    selectProductSizeVariantWithoutStock();
  });
}

export function configureDefaultProduct() {
  cy.window().then((win) => win.sessionStorage.clear());
  cy.cxConfig({
    context: {
      baseSite: ['electronics-spa'],
      currency: ['USD'],
    },
  });

  cy.intercept({
    method: 'GET',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/pages?pageType=ProductPage**`,
  }).as('productPage');

  cy.visit('/product/266685');

  cy.wait(`@productPage`);
}

export function configureApparelProduct() {
  cy.window().then((win) => win.sessionStorage.clear());
  cy.cxConfig({
    context: {
      baseSite: ['apparel-uk-spa'],
      currency: ['GBP'],
    },
  });
  cy.visit('/product/100191');
}
