import { login, register } from './auth-forms';
import { waitForPage } from './checkout-flow';
import { fillShippingAddress } from './checkout-forms';
import { generateMail, randomString } from './user';

interface TestProduct {
  code: string;
  type?: string;
  name?: string;
  price?: number;
}

const dev17 = Cypress.env('API_URL').includes('-17');

export const user = {
  user: 'standard',
  registrationData: {
    firstName: 'Winston',
    lastName: 'Rumfoord',
    password: 'Password123.',
    titleCode: 'mr',
    email: generateMail(randomString(), true),
    address: {
      city: 'Tralfamadore',
      line1: 'Chrono-Synclastic Infundibulum',
      line2: 'Betelgeuse',
      country: 'United States',
      state: 'Connecticut',
      postal: '06247',
    },
    fullName: 'Winston Rumfoord',
    payment: {
      card: 'Mastercard',
      number: '1234567890123456',
      expires: {
        month: '11',
        year: '2027',
      },
      cvv: '687',
    },
  },
};

export const shippingAddress = {
  firstName: 'Winston',
  lastName: 'Rumfoord',
  phone: '514-911-1234',
  address: user.registrationData.address,
};

export const products: TestProduct[] = [
  {
    code: '1934793',
    type: 'camera',
    name: 'PowerShot A480',
    price: dev17 ? 99.85 : 95.1,
  },
  {
    code: '300938',
    type: 'camera',
    name: 'Photosmart E317 Digital Camera',
    price: 114.12,
  },
];

export function addProductToCart(productCode: string) {
  cy.server();
  cy.route('GET', `/rest/v2/electronics-spa/cms/pages*/checkout*`).as(
    'shippingPage'
  );
  cy.get('cx-searchbox input')
    .clear()
    .type(`${productCode}{enter}`);
  cy.get('cx-product-list-item cx-add-to-cart button.btn-block')
    .first()
    .click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-code').should('contain', productCode);
    cy.getByText(/Proceed To Checkout/i).click();
  });
}

export function loginUser(testUser = null) {
  if (!testUser)
    login(user.registrationData.email, user.registrationData.password);
  else login(testUser.email, testUser.password);
  cy.url().should('not.contain', 'login');
}

export function registerUser() {
  cy.visit('/login/register');
  register({ ...user.registrationData });
  cy.url().should('not.contain', 'register');
}

export function checkTabs() {
  cy.get('cx-generic-link a')
    .contains('Order History')
    .click({ force: true });

  cy.get('cx-tab-paragraph-container > h3')
    .first()
    .should('contain', 'ALL ORDERS');

  cy.get('cx-tab-paragraph-container > h3')
    .eq(1)
    .should('contain', 'RETURNS')
    .click();
}

export function checkReturnRequestList() {
  cy.get('cx-order-return-request-list');
}

export function checkOrderNumberLink() {
  cy.get('cx-order-return-request-list a.cx-order-history-value')
    .eq(1)
    .click();

  cy.get('cx-breadcrumb h1').should('contain', 'Order Details');

  cy.get('cx-generic-link a')
    .contains('Order History')
    .click({ force: true });
}

export function checkReturnNumberLink() {
  cy.get('cx-tab-paragraph-container > h3')
    .eq(1)
    .should('contain', 'RETURNS')
    .click();

  cy.get('cx-order-return-request-list a.cx-order-history-value')
    .eq(0)
    .click({ force: true });

  cy.get('cx-breadcrumb h1').should('contain', 'Return Request Details');
}

export function addToCartAnonymous(product: TestProduct) {
  const productPage = waitForPage(product.code, 'productPage');

  registerUser();

  loginUser();

  cy.visit(`/product/${product.code}`);

  cy.wait(`@${productPage}`);

  cy.get('cx-product-intro > .code').should('contain', `${product.code}`);

  cy.get('cx-add-to-cart > button.btn-primary').click({ force: true });

  cy.get('cx-added-to-cart-dialog a.btn-secondary').click({
    force: true,
  });
}

export function fillShipping() {
  cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-row')
    .first()
    .find('.cx-summary-amount')
    .should('contain', products[0].price);
  const deliveryPage = waitForPage(
    '/checkout/delivery-mode',
    'getDeliveryPage'
  );
  fillShippingAddress(shippingAddress);
  cy.wait(`@${deliveryPage}`);
}

export function pickDeliveryMethod() {
  cy.get('.cx-checkout-title').should('contain', 'Shipping Method');
  const paymentPage = waitForPage(
    '/checkout/payment-details',
    'getPaymentPage'
  );
  cy.get('.cx-checkout-btns button.btn-primary').click();
  cy.wait(`@${paymentPage}`);
}

export function fillPaymentDetails() {
  const paymentDetails = user.registrationData;
  const reviewPage = waitForPage('/checkout/review-order', 'getReviewPage');

  cy.get('cx-payment-form').within(() => {
    cy.get('[bindValue="code"]').ngSelect(paymentDetails.payment.card);
    cy.get('[formcontrolname="accountHolderName"]')
      .clear()
      .type(paymentDetails.fullName);
    cy.get('[formcontrolname="cardNumber"]')
      .clear()
      .type(paymentDetails.payment.number);
    cy.get('[bindValue="expiryMonth"]').ngSelect(
      paymentDetails.payment.expires.month
    );
    cy.get('[bindValue="expiryYear"]').ngSelect(
      paymentDetails.payment.expires.year
    );
    cy.get('[formcontrolname="cvn"]')
      .clear()
      .type(paymentDetails.payment.cvv);
    cy.get('button.btn-primary').click();

    cy.wait(`@${reviewPage}`);
  });
}

export function placeOrder() {
  cy.get('.form-check-input').check();
  const orderConfirmationPage = waitForPage(
    '/order-confirmation',
    'getOrderConfirmationPage'
  );
  cy.get('cx-place-order button.btn-primary').click();
  cy.wait(`@${orderConfirmationPage}`);
}

export function reviewOrder() {
  const data = user.registrationData;
  cy.get('.cx-page-title').should('contain', 'Confirmation of Order');
  cy.get('h2').should('contain', 'Thank you for your order!');
  cy.get('.cx-order-review-summary .row').within(() => {
    cy.get('.col-lg-3:nth-child(1) .cx-card').within(() => {
      cy.contains(data.fullName);
      cy.contains(data.address.line1);
    });
    cy.get('.col-lg-3:nth-child(2) .cx-card').within(() => {
      cy.contains(data.fullName);
      cy.contains(data.address.line1);
    });
    cy.get('.col-lg-3:nth-child(3) .cx-card').within(() => {
      cy.contains('Standard Delivery');
    });
  });
  cy.get('cx-cart-item .cx-code').should('contain', products[0].code);
  cy.get('cx-order-summary .cx-summary-amount').should(
    'contain',
    dev17 ? '111.84' : '110.34'
  );
}

export function cancelOrder() {
  cy.get('cx-order-history a.cx-order-history-value')
    .contains('In Process')
    .click({ force: true });

  cy.get('cx-order-details-actions button.btn-primary').click({ force: true });

  cy.get('button.cx-counter-action')
    .contains('+')
    .click({ force: true });

  cy.get('button.btn-primary')
    .contains('Continue')
    .click({ force: true });

  cy.get('cx-cancel-order-confirmation button.btn-primary')
    .contains('Submit Request')
    .click({ force: true });

  cy.url().should('contain', 'my-account/orders');
}
