import { product } from '../../sample-data/big-happy-path';

context('Check login', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.login('test-user-cypress@ydev.hybris.com', 'Password123.');
    cy.visit('/');
  });

  it('should login successfully', () => {
    cy.get('.cx-login-status__greet').should('contain', 'Test User');
  });

  it('should add a shipping address', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env(
        'API_URL'
      )}/rest/v2/electronics/users/test-user-cypress@ydev.hybris.com/addresses?lang=en&curr=USD`,
      headers: {
        Authorization: `bearer ${
          JSON.parse(sessionStorage.getItem('auth')).userToken.token[
            'access_token'
          ]
        }`
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
        phone: ''
      }
    }).then(response => {
      expect(response.status).to.eq(201);
    });
  });

  it('should go to product page from category page', () => {
    // click big banner
    cy.get('.Section1 cx-responsive-banner')
      .first()
      .find('img')
      .click();
    // click small banner number 6 (would be good if label or alt text would be available)
    cy.get('.Section2 cx-responsive-banner:nth-of-type(6) img').click();
    cy.get('cx-product-summary').within(() => {
      cy.get('.name').should('contain', product.name);
      cy.get('.code').should('contain', product.code);
    });
  });

  it('should add product to cart', () => {
    cy.get('.cx-item-counter')
      .getByText('+')
      .click();
    cy.get('cx-add-to-cart button').click();
    cy.get('cx-added-to-cart-dialog').within(() => {
      cy.get('.cx-name .cx-link').should('contain', product.name);
      cy.getByText(/view cart/i).click();
    });
  });

  it('should get cartId and add a payment method', () => {
    cy.get('cx-cart-details h1').then($cart => {
      const cartid = $cart.text().slice(18, 26);
      cy.request({
        method: 'POST',
        url: `${Cypress.env(
          'API_URL'
        )}/rest/v2/electronics/users/test-user-cypress@ydev.hybris.com/carts/${cartid}/paymentdetails`,
        headers: {
          Authorization: `bearer ${
            JSON.parse(sessionStorage.getItem('auth')).userToken.token[
              'access_token'
            ]
          }`
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
            country: { isocode: 'US' }
          }
        }
      }).then(response => {
        expect(response.status).to.eq(201);
      });
    });
  });

  it('should proceed to checkout and select shipping address', () => {
    cy.getByText(/proceed to checkout/i).click();
    cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
    cy.get('cx-order-summary .cx-summary-partials .cx-summary-row')
      .first()
      .find('.cx-summary-amount')
      .should('not.be.empty');
    cy.get('.cx-card-body__title').contains(' Default Shipping Address ');
    cy.getByText(/Ship to this address/i).click();
    cy.get('.card-header').should('contain', ' SELECTED ');
    cy.get('button.btn-primary').click();
  });

  it('should choose delivery', () => {
    cy.get('.cx-checkout-title').should('contain', 'Shipping Method');
    cy.get('#deliveryMode-standard-gross').check();
    cy.get('button.btn-primary').click();
  });

  it('should select payment method', () => {
    cy.get('.cx-checkout-title').should('contain', 'Payment');
    cy.get('cx-order-summary .cx-summary-partials .cx-summary-total')
      .find('.cx-summary-amount')
      .should('not.be.empty');
    cy.get('.cx-card-body__title').contains(' Default Payment Method ');
    cy.getByText(/Use this payment/i).click();
    cy.get('.card-header').should('contain', ' SELECTED ');
    cy.get('button.btn-primary').click();
  });

  it('should review and place order', () => {
    cy.get('.cx-review-title').should('contain', 'Review');
    cy.get('.cx-review-summary-card')
      .contains('cx-card', 'Ship To')
      .find('.cx-card-body__container')
      .should('not.be.empty');
    cy.get('.cx-review-summary-card')
      .contains('cx-card', 'Shipping Method')
      .find('.cx-card-body__container')
      .within(() => {
        cy.getByText('standard-gross');
      });
    cy.get('cx-order-summary .cx-summary-total .cx-summary-amount').should(
      'not.be.empty'
    );

    cy.get('.form-check-input').check();
    cy.get('.cx-place-order button.btn-primary').click();
  });

  it('should display summary page', () => {
    cy.get('.cx-page__title').should('contain', 'Confirmation of Order');
    cy.get('h2').should('contain', 'Thank you for your order!');
    cy.get('.cx-order-review-summary .row').within(() => {
      cy.get('.col-lg-3:nth-child(1) .cx-card').should('not.be.empty');
      cy.get('.col-lg-3:nth-child(2) .cx-card').should('not.be.empty');
      cy.get('.col-lg-3:nth-child(3) .cx-card').within(() => {
        cy.contains('Standard Delivery');
      });
    });
    cy.get('cx-cart-item .cx-code').should('contain', product.code);
    cy.get('cx-order-summary .cx-summary-amount').should('not.be.empty');
  });

  it('should delete shipping address', () => {
    cy.visit('/my-account/address-book');
    cy.getByText('delete')
      .first()
      .click();
    cy.get('.cx-address-card--delete-mode button.btn-primary').click();
    cy.get('cx-global-message').contains('Address deleted successfully!');
  });

  it('should delete payment method', () => {
    cy.visit('/my-account/payment-details');
    cy.getByText('Delete')
      .first()
      .click();
    cy.get('.btn-primary').should('contain', 'delete');
    cy.get('.btn-primary').click();
    cy.get('.cx-payment .cx-body').then(() => {
      cy.get('cx-card').should('not.exist');
    });
  });
});
