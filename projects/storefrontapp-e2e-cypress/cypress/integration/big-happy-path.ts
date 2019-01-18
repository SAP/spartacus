/// <reference types="Cypress" />

context('Big happy path', () => {
  let userEmail;
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('http://localhost:4200');
  });

  it('should register successfully', () => {
    // Go to login page
    cy.get('.SiteLogin > a').click();
    // Go to register page
    cy.get(':nth-child(2) > .btn').click();
    // open title select
    cy.get(':nth-child(1) > label > .form-control').select('mr');
    cy.get(':nth-child(2) > label > .form-control').type('Winston');
    cy.get(':nth-child(3) > label > .form-control').type('Rumfoord');
    const testUserId = Date.now() - 1535535333333;
    userEmail = `user${testUserId}@ydev.hybris.com`;
    cy.get(':nth-child(4) > label > .form-control').type(userEmail);
    cy.get(':nth-child(5) > label > .form-control').type('Password123.');
    cy.get(':nth-child(6) > label > .form-control').type('Password123.');
    cy.get(':nth-child(8) > .form-check > label > .ng-untouched').check();
    cy.get('form.ng-dirty > .btn').click();
    cy.get('.cx-login-status__greet').should('contain', 'Winston Rumfoord');
    // log out
    cy.get('cx-login span').click();
    cy.get(':nth-child(10) > .cx-navigation__child-link').click();
    cy.get('.cx-login-status__greet').should('not.contain', 'Winston Rumfoord');
  });

  it('should go to product page from category page', () => {
    cy.get(
      '.Section1 > :nth-child(1) > cx-generic-link.link > .link > .responsive-banner > img'
    ).click();
    cy.get(
      ':nth-child(6) > cx-generic-link.link > .link > .responsive-banner > img'
    ).click();
    cy.get('cx-product-summary.container > .name').should(
      'contain',
      'Alpha 350'
    );
    cy.get('.code').should('contain', '1446509');
  });

  it('should add product to cart and got to checkout', () => {
    cy.get('.cx-item-counter > :nth-child(3)').click();
    cy.get('cx-add-to-cart > .btn').click();
    cy.get('.cx-cart-item__name--link').should('contain', 'Alpha 350');
    cy.get('.btn-secondary').click();
    cy.get(':nth-child(1) > label > .form-control').type(userEmail);
    cy.get(':nth-child(2) > label > .form-control').type('Password123.');
    cy.get('form.ng-dirty > .btn').click();
  });

  it('should fill in address form', () => {
    cy.get('.cx-shipping-address__title').should('contain', 'Shipping Address');
    cy.get(':nth-child(1) > .cx-order-summary__amount').should(
      'contain',
      '$2,623.08'
    );
    cy.get(
      ':nth-child(1) > div[_ngcontent-c54=""] > label > .ng-select > .ng-select-container'
    ).click();

    cy.get('.ng-dropdown-panel-items')
      .contains('Mr.')
      .click();
    cy.get(':nth-child(2) > label > .form-control').type('Winstoon');
    cy.get(':nth-child(3) > label > .form-control')
      .first()
      .type('Rumfoord');
    cy.get(':nth-child(4) > label > .form-control').type(
      'Chrono-Synclastic Infundibulum'
    );
    cy.get(':nth-child(5) > label > .form-control').type('Betelgeuse');
    cy.get('.country-select > .ng-select-container').click();
    cy.get('.ng-dropdown-panel-items')
      .contains('United States')
      .click();
    cy.get(':nth-child(1) > label > .form-control').type('Tralfamadore');
    cy.get('.region-select > .ng-select-container').click();
    cy.get('.ng-dropdown-panel-items')
      .contains('Connecticut')
      .click();
    cy.get(':nth-child(7) > :nth-child(3) > label > .form-control').type(
      '06247'
    );
    cy.get(':nth-child(8) > label > .form-control').type('555 555 555');
    cy.get(':nth-child(2) > .btn').click();
  });

  it('should choose delivery', () => {
    cy.get('.cx-delivery-mode-form__title').should(
      'contain',
      'Shipping Method'
    );
    cy.get(
      ':nth-child(1) > .cx-delivery-mode-form__label > .cx-delivery-mode-form__label--shipping-mode'
    ).click();
    cy.get(':nth-child(2) > .btn').click();
  });

  it('should fill in payment form', () => {
    cy.get('.cx-payment-method__title').should('contain', 'Payment');
    cy.get('.cx-order-summary__total-final > .cx-order-summary__amount').should(
      'contain',
      '$2,635.07'
    );
    cy.get('label > .ng-select > .ng-select-container').click();
    cy.get('.ng-dropdown-panel-items')
      .contains('Visa')
      .click();
    cy.get('div.ng-untouched > :nth-child(2) > label > .form-control').type(
      'Winston Rumfoord'
    );
    cy.get(':nth-child(3) > label > .form-control').type('4111111111111111');
    cy.get('.col-md-5 > .ng-select > .ng-select-container').click();
    cy.get('.ng-dropdown-panel-items')
      .contains('07')
      .click();
    cy.get('.col-md-7 > .ng-select > .ng-select-container').click();
    cy.get('.ng-dropdown-panel-items')
      .contains('2020')
      .click();
    cy.get('#cVVNumber').type('123');
    cy.get(':nth-child(2) > .btn').click();
  });

  it('should review and place order', () => {
    cy.get('.cx-review__title').should('contain', 'Review');
    cy.get(
      ':nth-child(1) > .cx-review__summary-card > cx-card > .cx-card > .card-body > .cx-card-body__container > .cx-card-body__label-container > .card__label--bold'
    ).should('contain', 'Winstoon Rumfoord');
    cy.get(
      ':nth-child(1) > .cx-review__summary-card > cx-card > .cx-card > .card-body > .cx-card-body__container > .cx-card-body__label-container > :nth-child(2) > .card__label'
    ).should('contain', 'Chrono-Synclastic Infundibulum');
    cy.get(
      ':nth-child(1) > .cx-review__summary-card > cx-card > .cx-card > .card-body > .cx-card-body__container > .cx-card-body__label-container > :nth-child(3) > .card__label'
    ).should('contain', 'Betelgeuse');
    cy.get(
      ':nth-child(2) > .cx-review__summary-card > cx-card > .cx-card > .card-body > .cx-card-body__container > .cx-card-body__label-container > .card__label--bold'
    ).should('contain', 'standard-gross');
    cy.get('.cx-order-summary__total-final > .cx-order-summary__amount').should(
      'contain',
      '$2,635.07'
    );
    cy.get('.form-check-input').click();
    cy.get('.cx-multi-step-checkout__place-order > .btn-primary').click();
    cy.get('.cx-page__title').should('contain', 'Confirmation of Order');
    cy.get('h2').should('contain', 'Thank you for your order!');
    cy.get(
      ':nth-child(1) > .cx-order-confirmation__review-summary-card > cx-card > .cx-card > .card-body > .cx-card-body__container > .cx-card-body__label-container > .card__label--bold'
    ).should('contain', 'Winstoon Rumfoord');
    cy.get(
      ':nth-child(1) > .cx-order-confirmation__review-summary-card > cx-card > .cx-card > .card-body > .cx-card-body__container > .cx-card-body__label-container > :nth-child(2) > .card__label'
    ).should('contain', 'Chrono-Synclastic Infundibulum');
    cy.get(
      ':nth-child(3) > .cx-order-confirmation__review-summary-card > cx-card > .cx-card > .card-body > .cx-card-body__container > .cx-card-body__label-container > .card__label--bold'
    ).should('contain', 'Standard Delivery');
    cy.get(
      ':nth-child(2) > .cx-order-confirmation__review-summary-card > cx-card > .cx-card > .card-body > .cx-card-body__container > .cx-card-body__label-container > .card__label--bold'
    ).should('contain', 'Winstoon Rumfoord');
    cy.get(
      ':nth-child(2) > .cx-order-confirmation__review-summary-card > cx-card > .cx-card > .card-body > .cx-card-body__container > .cx-card-body__label-container > :nth-child(2) > .card__label'
    ).should('contain', 'Chrono-Synclastic Infundibulum');
    cy.get('.cx-cart-item__code').should('contain', '1446509');
    cy.get('.cx-order-summary__total-final > .cx-order-summary__amount').should(
      'contain',
      '$2,635.07'
    );
  });

  it('should be able to check order in order history', () => {
    cy.get('cx-login span').click();
    cy.get(':nth-child(5) > .cx-navigation__child-link').click();
    cy.get('h3').should('contain', 'Order history');
    cy.get('.cx-order-history__total > .cx-order-history__value').should(
      'contain',
      '$2,635.07'
    );
    cy.get('cx-login span').click();
    cy.get(':nth-child(10) > .cx-navigation__child-link').click();
  });
});
