import {
  variantProduct,
  styleVariantProduct,
  productWithoutVariants,
} from '../sample-data/checkout-with-variants-data';
import {
  loginSuccessfully,
  addShippingAddress,
  addPaymentMethod,
  selectShippingAddress,
  selectDeliveryMethod,
  verifyAndPlaceOrder,
  selectPaymentMethod,
  deleteShippingAddress,
  deletePaymentCard,
  goToProductPageFromCategory,
  displaySummaryPage,
} from './checkout-as-persistent-user';
import { selectProductStyleVariant } from './product-details';

export function addProductVariant() {
  selectProductStyleVariant();
  cy.get('cx-add-to-cart')
    .getByText(/Add To Cart/i)
    .click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-name .cx-link').should('contain', variantProduct.name);
    cy.getByText(/view cart/i).click();
  });
  cy.get('cx-breadcrumb').should('contain', 'Your Shopping Bag');
}

export function configureApparelProduct() {
  cy.cxConfig({
    context: {
      baseSite: ['apparel-uk-spa'],
      currency: ['GBP'],
    },
    checkout: { guest: true },
  });
}

export function addTwoProductVariantsToCart() {
  selectProductStyleVariant();
  cy.get('cx-add-to-cart')
    .getByText(/Add To Cart/i)
    .click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-name .cx-link').should('contain', variantProduct.name);
    cy.get('.close').click();
  });
  cy.server();
  cy.route(
    'GET',
    `/rest/v2/apparel-uk-spa/products/${styleVariantProduct.code}/reviews*`
  ).as('getProductPage');
  cy.get(`.variant-selector ul.variant-list li img[alt="lime"]`)
    .first()
    .click();
  cy.wait('@getProductPage')
    .its('status')
    .should('eq', 200);
  cy.get(`.variant-selector ul.variant-list li.selected-variant`).should(
    'be.visible'
  );
  cy.get('cx-add-to-cart')
    .getByText(/Add To Cart/i)
    .click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-name .cx-link').should('contain', styleVariantProduct.name);
    cy.getByText(/view cart/i).click();
  });
  cy.get('cx-breadcrumb').should('contain', 'Your Shopping Bag');
}

export function visitProductWithoutVariantPage() {
  configureApparelProduct();
  cy.visit('apparel-uk-spa/en/GBP/product/300611156');
  cy.get('cx-product-intro').within(() => {
    cy.get('.code').should('contain', productWithoutVariants.code);
  });
  cy.get('cx-breadcrumb').within(() => {
    cy.get('h1').should('contain', productWithoutVariants.name);
  });
}

export function addMutipleProductWithoutVariantToCart() {
  cy.get('cx-item-counter')
    .getByText('+')
    .click();
  cy.get('cx-add-to-cart')
    .getByText(/Add To Cart/i)
    .click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-name .cx-link').should('contain', productWithoutVariants.name);
    cy.getByText(/view cart/i).click();
  });
  cy.get('cx-breadcrumb').should('contain', 'Your Shopping Bag');
}

export function displaySummaryPageForOrderWithMultipleProducts() {
  cy.get('.cx-page-title').should('contain', 'Confirmation of Order');
  cy.get('h2').should('contain', 'Thank you for your order!');
  cy.get('.cx-order-review-summary .row').within(() => {
    cy.get('.col-lg-3:nth-child(1) .cx-card').should('not.be.empty');
    cy.get('.col-lg-3:nth-child(2) .cx-card').should('not.be.empty');
    cy.get('.col-lg-3:nth-child(3) .cx-card').within(() => {
      cy.contains('Standard Delivery');
    });
  });
  cy.get('cx-cart-item .cx-code').should('contain', variantProduct.code);
  cy.get('cx-cart-item .cx-code').should('contain', styleVariantProduct.code);
  cy.get('cx-cart-item .cx-code').should(
    'contain',
    productWithoutVariants.code
  );
  cy.get('cx-order-summary .cx-summary-amount').should('not.be.empty');
}

export function checkoutWithVariantsTest() {
  it('should login successfully', () => {
    loginSuccessfully();
  });

  it('should add a shipping address', () => {
    addShippingAddress('apparel-uk-spa', 'GBP', 'GB', true);
  });

  it('should go to product page from category page', () => {
    goToProductPageFromCategory(variantProduct, '4');
  });

  it('should add product variant to cart', () => {
    addProductVariant();
  });

  it('should get cartId and add a payment method', () => {
    addPaymentMethod('apparel-uk-spa');
  });

  it('should proceed to checkout and select shipping address', () => {
    selectShippingAddress('apparel-uk-spa');
  });

  it('should choose delivery', () => {
    selectDeliveryMethod('apparel-uk-spa');
  });

  it('should select payment method', () => {
    selectPaymentMethod();
  });

  it('should review and place order', () => {
    verifyAndPlaceOrder();
  });

  it('should display summary page', () => {
    displaySummaryPage(variantProduct.code);
  });

  it('should visit the product with variants page', () => {
    cy.visit('/apparel-uk-spa/en/GBP');
    goToProductPageFromCategory(variantProduct, '4');
  });

  it('should add two variants of same product to cart', () => {
    addTwoProductVariantsToCart();
  });

  it('should visit the product without variants page', () => {
    visitProductWithoutVariantPage();
  });

  it('should add N number of SKUs to cart', () => {
    addMutipleProductWithoutVariantToCart();
  });

  it('should proceed to checkout and select shipping address', () => {
    selectShippingAddress('apparel-uk-spa');
  });

  it('should choose delivery', () => {
    selectDeliveryMethod('apparel-uk-spa');
  });

  it('should select payment method', () => {
    selectPaymentMethod();
  });

  it('should review and place order', () => {
    verifyAndPlaceOrder();
  });

  it('should display summary page for order with multiple product', () => {
    displaySummaryPageForOrderWithMultipleProducts();
  });

  it('should delete shipping address', () => {
    deleteShippingAddress('apparel-uk', 'GBP');
  });

  it('should delete payment card', () => {
    deletePaymentCard('apparel-uk', 'GBP');
  });
}
