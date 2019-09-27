import {
  cart,
  cartWithCheapProduct,
  cheapProduct,
  product,
  user,
} from '../sample-data/checkout-flow';
import { login, register } from './auth-forms';
import {
  AddressData,
  fillPaymentDetails,
  fillShippingAddress,
  PaymentDetails,
} from './checkout-forms';

export function visitHomePage() {
  const homePage = waitForPage('homepage', 'getHomePage');
  cy.visit('/');
  cy.wait(`@${homePage}`);
}

export function signOut() {
  cy.selectUserMenuOption({
    option: 'Sign Out',
  });
}

export function registerUser() {
  const loginPage = waitForPage('/login', 'getLoginPage');
  cy.getByText(/Sign in \/ Register/i).click();
  cy.wait(`@${loginPage}`);
  const registerPage = waitForPage('/login/register', 'getRegisterPage');
  cy.getByText('Register').click();
  cy.wait(`@${registerPage}`);
  register(user);
  cy.get('cx-breadcrumb').contains('Login');
}

export function signOutUser() {
  const logoutPage = waitForPage('/logout', 'getLogoutPage');
  signOut();
  cy.wait(`@${logoutPage}`);
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

export function fillAddressForm(shippingAddressData: AddressData = user) {
  cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-row')
    .first()
    .find('.cx-summary-amount')
    .should('contain', cart.total);
  fillShippingAddress(shippingAddressData);
}

export function chooseDeliveryMethod() {
  cy.get('.cx-checkout-title').should('contain', 'Shipping Method');
  cy.get('#deliveryMode-standard-gross').check({ force: true });
  const paymentPage = waitForPage(
    '/checkout/payment-details',
    'getPaymentPage'
  );
  cy.get('button.btn-primary').click();
  cy.wait(`@${paymentPage}`);
}

export function fillPaymentForm(
  paymentDetailsData: PaymentDetails = user,
  billingAddress?: AddressData
) {
  cy.get('.cx-checkout-title').should('contain', 'Payment');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-total')
    .find('.cx-summary-amount')
    .should('contain', cart.totalAndShipping);
  fillPaymentDetails(paymentDetailsData, billingAddress);
}

export function verifyReviewOrderPage() {
  cy.get('.cx-review-title').should('contain', 'Review');
}

export function placeOrder() {
  verifyReviewOrderPage();
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
  cy.get('cx-order-summary .cx-summary-row .cx-summary-amount')
    .eq(0)
    .should('contain', cart.total);
  cy.get('cx-order-summary .cx-summary-row .cx-summary-amount')
    .eq(1)
    .should('contain', cart.estimatedShipping);
  cy.get('cx-order-summary .cx-summary-total .cx-summary-amount').should(
    'contain',
    cart.totalAndShipping
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
    cart.totalAndShipping
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
    .should('contain', cart.totalAndShipping);
}

export function goToPaymentDetails() {
  cy.get('cx-checkout-progress li:nth-child(3) > a').click();
}

export function clickAddNewPayment() {
  cy.getByText('Add New Payment').click();
}

export function goToCheapProductDetailsPage() {
  visitHomePage();
  const productCode = 'ProductPage&code=280916';
  const productPage = waitForPage(productCode, 'getProductPage');
  cy.get('.Section4 cx-banner')
    .first()
    .find('img')
    .click({ force: true });
  cy.wait(`@${productPage}`);
  cy.get('cx-product-intro').within(() => {
    cy.get('.code').should('contain', cheapProduct.code);
  });
  cy.get('cx-breadcrumb').within(() => {
    cy.get('h1').should('contain', cheapProduct.name);
  });
}

export function addCheapProductToCartAndLogin() {
  cy.get('cx-add-to-cart')
    .getByText(/Add To Cart/i)
    .click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-name .cx-link').should('contain', cheapProduct.name);
  });
  const loginPage = waitForPage('/login', 'getLoginPage');
  cy.getByText(/proceed to checkout/i).click();
  cy.wait(`@${loginPage}`);
  const shippingPage = waitForPage(
    '/checkout/shipping-address',
    'getShippingPage'
  );
  loginUser();
  cy.wait(`@${shippingPage}`);
}

export function addCheapProductToCartAndProceedToCheckout() {
  cy.get('cx-add-to-cart')
    .getByText(/Add To Cart/i)
    .click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-name .cx-link').should('contain', cheapProduct.name);
  });
  const loginPage = waitForPage('/login', 'getLoginPage');
  cy.getByText(/proceed to checkout/i).click();
  cy.wait(`@${loginPage}`);
}

export function fillAddressFormWithCheapProduct(
  shippingAddressData: AddressData = user
) {
  cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-row')
    .first()
    .find('.cx-summary-amount')
    .should('contain', cartWithCheapProduct.total);
  const deliveryPage = waitForPage(
    '/checkout/delivery-mode',
    'getDeliveryPage'
  );
  fillShippingAddress(shippingAddressData);
  cy.wait(`@${deliveryPage}`);
}

export function fillPaymentFormWithCheapProduct(
  paymentDetailsData: PaymentDetails = user,
  billingAddress?: AddressData
) {
  cy.get('.cx-checkout-title').should('contain', 'Payment');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-total')
    .find('.cx-summary-amount')
    .should('contain', cartWithCheapProduct.totalAndShipping);
  const reivewPage = waitForPage('/checkout/review-order', 'getReviewPage');
  fillPaymentDetails(paymentDetailsData, billingAddress);
  cy.wait(`@${reivewPage}`);
}

export function placeOrderWithCheapProduct() {
  verifyReviewOrderPage();
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
  cy.get('cx-order-summary .cx-summary-row .cx-summary-amount')
    .eq(0)
    .should('contain', cartWithCheapProduct.total);
  cy.get('cx-order-summary .cx-summary-row .cx-summary-amount')
    .eq(1)
    .should('contain', cartWithCheapProduct.estimatedShipping);
  cy.get('cx-order-summary .cx-summary-total .cx-summary-amount').should(
    'contain',
    cartWithCheapProduct.totalAndShipping
  );
  cy.getByText('Terms & Conditions')
    .should('have.attr', 'target', '_blank')
    .should(
      'have.attr',
      'href',
      '/electronics-spa/en/USD/terms-and-conditions'
    );
  cy.get('.form-check-input').check();
  const orderConfirmationPage = waitForPage(
    '/order-confirmation',
    'getOrderConfirmationPage'
  );
  cy.get('cx-place-order button.btn-primary').click();
  cy.wait(`@${orderConfirmationPage}`);
}

export function verifyOrderConfirmationPageWithCheapProduct() {
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
  cy.get('cx-cart-item .cx-code').should('contain', cheapProduct.code);
  cy.get('cx-order-summary .cx-summary-amount').should(
    'contain',
    cartWithCheapProduct.totalAndShipping
  );
}

export function viewOrderHistoryWithCheapProduct() {
  const orderHistoryPage = waitForPage(
    '/my-account/orders',
    'getOrderHistoryPage'
  );
  cy.selectUserMenuOption({
    option: 'Order History',
  });
  cy.wait(`@${orderHistoryPage}`);
  cy.get('cx-order-history h3').should('contain', 'Order history');
  cy.get('.cx-order-history-table tr')
    .first()
    .find('.cx-order-history-total .cx-order-history-value')
    .should('contain', cartWithCheapProduct.totalAndShipping);
}

export function waitForPage(page: string, alias: string): string {
  cy.server();
  cy.route('GET', `/rest/v2/electronics-spa/cms/pages?*${page}*`).as(alias);
  return alias;
}
