import { user, cart, product } from '../sample-data/big-happy-path';

context('Big happy path', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  it('should register successfully', () => {
    cy.getByText(/Sign in \/ Register/i).click();
    cy.getByText('Register').click();
    cy.register(user);
    cy.get('.cx-login-status__greet').should('contain', user.fullName);
    cy.selectUserMenuOption('Sign Out');
    cy.get('.cx-login-status__greet').should('not.contain', user.fullName);
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

  it('should add product to cart and got to checkout', () => {
    cy.get('.cx-item-counter')
      .getByText('+')
      .click();
    cy.get('cx-add-to-cart button').click();
    cy.get('cx-added-to-cart-dialog').within(() => {
      cy.get('.cx-name .cx-link').should('contain', product.name);
      cy.getByText(/proceed to checkout/i).click();
    });
    cy.login(user.email, user.password);
  });

  it('should fill in address form', () => {
    cy.get('.cx-shipping-address__title').should('contain', 'Shipping Address');
    cy.get('cx-order-summary .cx-summary-partials .cx-summary-row')
      .first()
      .find('.cx-summary-amount')
      .should('contain', '$2,623.08');

    cy.fillShippingAddress(user);
  });

  it('should choose delivery', () => {
    cy.get('.cx-delivery-mode-form__title').should(
      'contain',
      'Shipping Method'
    );
    cy.get('#deliveryMode-standard-gross').check();
    cy.get('button.btn-primary').click();
  });

  it('should fill in payment form', () => {
    cy.get('.cx-payment-title').should('contain', 'Payment');
    cy.get('cx-order-summary .cx-summary-partials .cx-summary-total')
      .find('.cx-summary-amount')
      .should('contain', cart.total);

    cy.fillPaymentDetails(user);
  });

  it('should review and place order', () => {
    cy.get('.cx-review__title').should('contain', 'Review');
    cy.get('cx-review-submit .cx-review__summary-card__address').within(() => {
      cy.getByText(user.fullName);
      cy.getByText(user.address.line1);
      cy.getByText(user.address.line2);
    });
    cy.get('cx-review-submit .cx-review__summary-card__shipping-method').within(
      () => {
        cy.getByText('standard-gross');
      }
    );
    cy.get('cx-order-summary .cx-summary-total .cx-summary-amount').should(
      'contain',
      cart.total
    );

    cy.get('.form-check-input').check();
    cy.get('.cx-multi-step-checkout__place-order button.btn-primary').click();
  });

  it('should display summary page', () => {
    cy.get('.cx-page__title').should('contain', 'Confirmation of Order');
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
    cy.get('cx-order-summary .cx-summary-amount').should('contain', cart.total);
  });

  it('should be able to check order in order history', () => {
    cy.selectUserMenuOption('Order History');
    cy.get('cx-order-history h3').should('contain', 'Order history');
    cy.get('.cx-order-history-table tr')
      .first()
      .find('.cx-order-history-total .cx-order-history-value')
      .should('contain', cart.total);
    cy.selectUserMenuOption('Sign Out');
  });
});
