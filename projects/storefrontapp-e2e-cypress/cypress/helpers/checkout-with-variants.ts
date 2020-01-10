import { user } from '../sample-data/checkout-flow';
import { waitForPage } from './checkout-flow';
import { fillPaymentDetails, fillShippingAddress } from './checkout-forms';

export function loginSuccessfully() {
  cy.login('test-user-cypress@ydev.hybris.com', 'Password123.');
  cy.visit('/');
  cy.get('.cx-login-greet').should('contain', 'Test User');
}

context('Checkout with product variants', () => {
  describe('Apparel', () => {
    before(configureApparelProduct);
    checkoutWithVariants();
  });
});

function configureApparelProduct() {
  cy.window().then(win => win.sessionStorage.clear());
  cy.cxConfig({
    context: {
      baseSite: ['apparel-uk-spa'],
      currency: ['GBP'],
    },
  });
  cy.visit('/product/100191');
}

export function addProductVariantToCart() {
  const request = requestPages();

  // go to product page
  const productId = '100191';
  cy.visit(`/product/${productId}`);

  // add product to cart and go to checkout
  cy.get('cx-add-to-cart')
    .getByText(/Add To Cart/i)
    .click({ force: true });
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.getByText(/proceed to checkout/i).click({ force: true });
  });

  cy.wait(`@${request.shippingPage}`)
    .its('status')
    .should('eq', 200);

  // go to shipping address
  fillShippingAddress(user);

  cy.wait(`@${request.deliveryPage}`)
    .its('status')
    .should('eq', 200);

  // set delivery method
  cy.get('#deliveryMode-standard-gross').check({ force: true });
  cy.get('button.btn-primary').click({ force: true });

  cy.wait(`@${request.paymentPage}`)
    .its('status')
    .should('eq', 200);

  // fill in payment method
  fillPaymentDetails(user);

  // go to payment details page
  cy.get('cx-review-submit').should('exist');

  cy.visit('/my-account/payment-details');
  cy.get('.cx-payment .cx-body').then(() => {
    cy.get('cx-card').should('exist');
  });
}

export function checkoutWithVariants() {
  it('should login successfully', () => {
    loginSuccessfully();
  });
  it('should visit product variant page', () => {
    addProductVariantToCart();
  });
}

function requestPages() {
  const shippingPage = waitForPage(
    '/checkout/shipping-address',
    'getShippingPage'
  );

  const deliveryPage = waitForPage(
    '/checkout/delivery-mode',
    'getDeliveryPage'
  );

  const paymentPage = waitForPage(
    '/checkout/payment-details',
    'getPaymentPage'
  );

  return { shippingPage, deliveryPage, paymentPage };
}
