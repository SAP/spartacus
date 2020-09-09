import { product } from '../sample-data/checkout-flow';
import { config, login, setSessionData } from '../support/utils/login';

export const username = 'test-user-cypress@ydev.hybris.com';
export const password = 'Password123.';
export const firstName = 'Test';
export const lastName = 'User';
export const titleCode = 'mr';

export function retrieveTokenAndLogin() {
  function retrieveAuthToken() {
    return cy.request({
      method: 'POST',
      url: config.tokenUrl,
      body: {
        ...config.client,
        grant_type: 'client_credentials',
      },
      form: true,
    });
  }

  login(username, password, false).then((res) => {
    if (res.status === 200) {
      // User is already registered - only set session in localStorage
      setSessionData({ ...res.body, userId: username });
    } else {
      // User needs to be registered
      retrieveAuthToken().then((response) =>
        cy.request({
          method: 'POST',
          url: config.newUserUrl,
          body: {
            firstName: firstName,
            lastName: lastName,
            password: password,
            titleCode: titleCode,
            uid: username,
          },
          headers: {
            Authorization: `bearer ` + response.body.access_token,
          },
        })
      );
    }
  });
}

export function loginSuccessfully() {
  cy.login('test-user-cypress@ydev.hybris.com', 'Password123.');
  cy.visit('/');
  cy.get('.cx-login-greet').should('contain', 'Test User');
}

export function addShippingAddress() {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/test-user-cypress@ydev.hybris.com/addresses?lang=en&curr=USD`,
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('spartacus-local-data')).auth.userToken
          .token.access_token
      }`,
    },
    body: {
      defaultAddress: false,
      titleCode: 'mr',
      firstName: 'Test',
      lastName: 'User',
      line1: '999 de Maisonneuve',
      line2: '',
      town: 'Montreal',
      region: { isocode: 'US-AK' },
      country: { isocode: 'US' },
      postalCode: 'H4B3L4',
      phone: '',
    },
  }).then((response) => {
    expect(response.status).to.eq(201);
  });
}

export function goToProductPageFromCategory() {
  // click big banner
  cy.get('.Section1 cx-banner cx-generic-link')
    .first()
    .find('cx-media')
    .click();
  // click small banner number 6 (would be good if label or alt text would be available)
  cy.get('.Section2 cx-banner:nth-of-type(6) a cx-media').click();
  cy.get('cx-product-intro').within(() => {
    cy.get('.code').should('contain', product.code);
  });
  cy.get('cx-breadcrumb').within(() => {
    cy.get('h1').should('contain', product.name);
  });
}

export function addProductToCart() {
  cy.get('cx-item-counter').getByText('+').click();
  cy.get('cx-add-to-cart')
    .getByText(/Add To Cart/i)
    .click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-name .cx-link').should('contain', product.name);
    cy.getByText(/view cart/i).click();
  });
  cy.get('cx-breadcrumb').should('contain', 'Your Shopping Cart');
}

export function addPaymentMethod() {
  cy.get('.cx-total')
    .first()
    .then(($cart) => {
      const cartid = $cart.text().match(/[0-9]+/)[0];
      cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}/${Cypress.env(
          'OCC_PREFIX'
        )}/${Cypress.env(
          'BASE_SITE'
        )}/users/test-user-cypress@ydev.hybris.com/carts/${cartid}/paymentdetails`,
        headers: {
          Authorization: `bearer ${
            JSON.parse(localStorage.getItem('spartacus-local-data')).auth
              .userToken.token.access_token
          }`,
        },
        body: {
          accountHolderName: 'test user',
          cardNumber: '4111111111111111',
          cardType: { code: 'visa' },
          expiryMonth: '01',
          expiryYear: '2125',
          defaultPayment: true,
          saved: true,
          billingAddress: {
            firstName: 'test',
            lastName: 'user',
            titleCode: 'mr',
            line1: '999 de Maisonneuve',
            line2: '',
            town: 'Montreal',
            postalCode: 'H4B3L4',
            country: { isocode: 'US' },
          },
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
}

export function selectShippingAddress() {
  cy.server();

  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/pages?*/checkout/shipping-address*`
  ).as('getShippingPage');
  cy.getByText(/proceed to checkout/i).click();
  cy.wait('@getShippingPage');

  cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-row')
    .first()
    .find('.cx-summary-amount')
    .should('not.be.empty');
  cy.get('.cx-card-title').should('contain', 'Default Shipping Address');
  cy.get('.card-header').should('contain', 'Selected');

  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/pages?*/checkout/delivery-mode*`
  ).as('getDeliveryPage');
  cy.get('button.btn-primary').click();
  cy.wait('@getDeliveryPage').its('status').should('eq', 200);
}

export function selectDeliveryMethod() {
  cy.server();
  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/pages?*/checkout/payment-details*`
  ).as('getPaymentPage');
  cy.get('.cx-checkout-title').should('contain', 'Shipping Method');
  cy.get('#deliveryMode-standard-net').should('be.checked');
  cy.get('button.btn-primary').click();
  cy.wait('@getPaymentPage').its('status').should('eq', 200);
}

export function selectPaymentMethod() {
  cy.get('.cx-checkout-title').should('contain', 'Payment');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-total')
    .find('.cx-summary-amount')
    .should('not.be.empty');
  cy.get('.cx-card-title').should('contain', '✓ DEFAULT');
  cy.get('.card-header').should('contain', 'Selected');
  cy.get('button.btn-primary').click();
}

export function verifyAndPlaceOrder() {
  cy.get('.cx-review-title').should('contain', 'Review');
  cy.get('.cx-review-summary-card')
    .contains('cx-card', 'Ship To')
    .find('.cx-card-container')
    .should('not.be.empty');
  cy.get('.cx-review-summary-card')
    .contains('cx-card', 'Shipping Method')
    .find('.cx-card-label-bold')
    .should('contain', 'Standard Delivery');
  cy.get('cx-order-summary .cx-summary-total .cx-summary-amount').should(
    'not.be.empty'
  );

  cy.get('.form-check-input').check();
  cy.get('button.btn-primary').click();
}

export function displaySummaryPage() {
  cy.get('.cx-page-title').should('contain', 'Confirmation of Order');
  cy.get('h2').should('contain', 'Thank you for your order!');
  cy.get('.cx-order-review-summary .container').within(() => {
    cy.get('.summary-card:nth-child(1) .cx-card').should('not.be.empty');
    cy.get('.summary-card:nth-child(2) .cx-card').within(() => {
      cy.contains('Standard Delivery');
    });
    cy.get('.summary-card:nth-child(3) .cx-card').should('not.be.empty');
  });
  cy.get('cx-cart-item .cx-code').should('contain', product.code);
  cy.get('cx-order-summary .cx-summary-amount').should('not.be.empty');
}

export function deleteShippingAddress() {
  // Retrieve the address ID
  cy.request({
    method: 'GET',
    url: `${Cypress.env('API_URL')}/${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/test-user-cypress@ydev.hybris.com/addresses?lang=en&curr=USD`,
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('spartacus-local-data')).auth.userToken
          .token.access_token
      }`,
    },
  })
    .then((response) => {
      const addressResp = response.body.addresses;
      expect(addressResp[0]).to.have.property('id');
      return addressResp[0].id;
    })
    .then((id) => {
      // Delete the address
      cy.request({
        method: 'DELETE',
        url: `${Cypress.env('API_URL')}/${Cypress.env(
          'OCC_PREFIX'
        )}/${Cypress.env(
          'BASE_SITE'
        )}/users/test-user-cypress@ydev.hybris.com/addresses/${id}?lang=en&curr=USD`,
        headers: {
          Authorization: `bearer ${
            JSON.parse(localStorage.getItem('spartacus-local-data')).auth
              .userToken.token.access_token
          }`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
}
export function deletePaymentCard() {
  // Retrieve the payment ID
  cy.request({
    method: 'GET',
    url: `${Cypress.env('API_URL')}/${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/test-user-cypress@ydev.hybris.com/paymentdetails?saved=true&lang=en&curr=USD`,
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('spartacus-local-data')).auth.userToken
          .token.access_token
      }`,
    },
  })
    .then((response) => {
      const paymentResp = response.body.payments;
      expect(paymentResp[0]).to.have.property('id');
      return paymentResp[0].id;
    })
    .then((id) => {
      // Delete the payment
      cy.request({
        method: 'DELETE',
        url: `${Cypress.env('API_URL')}/${Cypress.env(
          'OCC_PREFIX'
        )}/${Cypress.env(
          'BASE_SITE'
        )}/users/test-user-cypress@ydev.hybris.com/paymentdetails/${id}?lang=en&curr=USD`,
        headers: {
          Authorization: `bearer ${
            JSON.parse(localStorage.getItem('spartacus-local-data')).auth
              .userToken.token.access_token
          }`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
}

export function checkoutAsPersistentUserTest() {
  it('should login successfully', () => {
    loginSuccessfully();
  });

  it('should add a shipping address', () => {
    addShippingAddress();
  });

  it('should go to product page from category page', () => {
    goToProductPageFromCategory();
  });

  it('should add product to cart', () => {
    addProductToCart();
  });

  it('should get cartId and add a payment method', () => {
    addPaymentMethod();
  });

  it('should proceed to checkout and select shipping address', () => {
    selectShippingAddress();
  });

  it('should choose delivery', () => {
    selectDeliveryMethod();
  });

  it('should select payment method', () => {
    selectPaymentMethod();
  });

  it('should review and place order', () => {
    verifyAndPlaceOrder();
  });

  it('should display summary page', () => {
    displaySummaryPage();
  });

  it('should delete shipping address', () => {
    deleteShippingAddress();
  });

  it('should delete payment card', () => {
    deletePaymentCard();
  });
}
