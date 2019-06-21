import {
  cart,
  product,
  user,
  cartTotalAndShipping,
} from '../sample-data/checkout-flow';
import { login, register } from './auth-forms';
import { fillPaymentDetails, fillShippingAddress } from './checkout-forms';

export function signOut() {
  cy.selectUserMenuOption({
    option: 'Sign Out',
  });
}

export function registerUser() {
  cy.getByText(/Sign in \/ Register/i).click();
  cy.getByText('Register').click();
  register(user);
  cy.get('.cx-login-greet').should('contain', user.fullName);
}

export function signOutUser() {
  signOut();
  cy.get('.cx-login-greet').should('not.contain', user.fullName);
}

export function goToProductDetailsPage() {
  cy.visit('/');
  // click big banner
  cy.get('.Section1 cx-banner')
    .first()
    .find('img')
    .click({ force: true });
  // click small banner number 6 (would be good if label or alt text would be available)
  cy.get('.Section2 cx-banner:nth-of-type(6) img').click({ force: true });
  cy.get('cx-product-intro').within(() => {
    cy.get('.code').should('contain', product.code);
  });
  cy.get('cx-breadcrumb').within(() => {
    cy.get('h1').should('contain', product.name);
  });
}

export function addProductToCart() {
  cy.get('cx-item-counter')
    .getByText('+')
    .click();
  cy.get('cx-add-to-cart')
    .getByText(/Add To Cart/i)
    .click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-name .cx-link').should('contain', product.name);
    cy.getByText(/proceed to checkout/i).click();
  });
}

export function loginUser() {
  // Verify the user is prompted to login
  login(user.email, user.password);
}

export function fillAddressForm() {
  cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-row')
    .first()
    .find('.cx-summary-amount')
    .should('contain', cart.total);

  fillShippingAddress(user);
}

export function chooseDeliveryMethod() {
  cy.server();
  cy.route(
    'GET',
    '/rest/v2/electronics-spa/cms/pages?*/checkout/payment-details*'
  ).as('getPaymentPage');
  cy.get('.cx-checkout-title').should('contain', 'Shipping Method');
  cy.get('#deliveryMode-standard-gross').check({ force: true });
  cy.get('button.btn-primary').click();
  cy.wait('@getPaymentPage');
}

export function fillPaymentForm() {
  cy.get('.cx-checkout-title').should('contain', 'Payment');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-total')
    .find('.cx-summary-amount')
    .should('contain', cartTotalAndShipping);

  fillPaymentDetails(user);
}

export function placeOrder() {
  cy.get('.cx-review-title').should('contain', 'Review');
  cy.get('.cx-review-summary-card')
    .contains('cx-card', 'Ship To')
    .find('.cx-card-container')
    .within(() => {
      cy.getByText(user.fullName);
      cy.getByText(user.address.line1);
      cy.getByText(user.address.line2);
    });
  cy.get('.cx-review-summary-card')
    .contains('cx-card', 'Shipping Method')
    .find('.cx-card-container')
    .within(() => {
      cy.getByText('Standard Delivery');
    });
  cy.get('cx-order-summary .cx-summary-total .cx-summary-amount').should(
    'contain',
    cartTotalAndShipping
  );
  cy.getByText('Terms & Conditions')
    .should('have.attr', 'target', '_blank')
    .should(
      'have.attr',
      'href',
      '/electronics-spa/en/USD/terms-and-conditions'
    );
  cy.get('.form-check-input').check();
  cy.get('cx-place-order button.btn-primary').click();
}

export function verifyOrderConfirmationPage() {
  cy.get('.cx-page-title').should('contain', 'Confirmation of Order');
  cy.get('h2').should('contain', 'Thank you for your order!');
  cy.get('.cx-order-review-summary .row').within(() => {
    cy.get('.col-lg-3:nth-child(1) .cx-card').within(() => {
      cy.contains(user.fullName);
      cy.contains(user.address.line1);
    });
    cy.get('.col-lg-3:nth-child(2) .cx-card').within(() => {
      cy.contains(user.fullName);
      cy.contains(user.address.line1);
    });
    cy.get('.col-lg-3:nth-child(3) .cx-card').within(() => {
      cy.contains('Standard Delivery');
    });
  });
  cy.get('cx-cart-item .cx-code').should('contain', product.code);
  cy.get('cx-order-summary .cx-summary-amount').should(
    'contain',
    cartTotalAndShipping
  );
}

export function viewOrderHistory() {
  cy.selectUserMenuOption({
    option: 'Order History',
  });
  cy.get('cx-order-history h3').should('contain', 'Order history');
  cy.get('.cx-order-history-table tr')
    .first()
    .find('.cx-order-history-total .cx-order-history-value')
    .should('contain', cartTotalAndShipping);
}
