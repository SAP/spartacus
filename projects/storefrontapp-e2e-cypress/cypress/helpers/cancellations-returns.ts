import { login, register, RegisterUser } from './auth-forms';

const user: RegisterUser = {
  firstName: 'Intern',
  lastName: 'Tester',
  email: 'test@sap.com',
  password: 'Test123$',
};

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

export function signIn() {
  cy.server();
  cy.visit('/login');
  cy.route('GET', '/rest/v2/electronics-spa/products/932577*').as('homepage');
  login(user.email, user.password);
  cy.wait('@homepage');
}

export function registerUser() {
  cy.visit('/login');
  cy.get('a.btn')
    .contains('Register')
    .click();
  register(user);
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
  cy.server();
  cy.route('GET', '/rest/v2/electronics-spa/users/current/orders/*').as(
    'orderDetailPage'
  );

  cy.get('cx-order-return-request-list a.cx-order-history-value')
    .eq(1)
    .click();

  cy.wait('@orderDetailPage');

  cy.get('cx-generic-link a')
    .contains('Order History')
    .click({ force: true });
}

export function checkReturnNumberLink() {
  cy.server();
  cy.route('GET', '/rest/v2/electronics-spa/users/current/orderReturns*').as(
    'returnDetailPage'
  );

  cy.get('cx-tab-paragraph-container > h3')
    .eq(1)
    .should('contain', 'RETURNS')
    .click();

  cy.get('cx-order-return-request-list a.cx-order-history-value')
    .eq(0)
    .click({ force: true });

  cy.wait('@returnDetailPage');
}
