import { waitForPage } from './checkout-flow';

export function loginUsingUserWithOrder() {
  const username = 'test-user-with-orders@ydev.hybris.com';
  const password = 'pw4all';
  cy.login(username, password);

  const homePage = waitForPage('homepage', 'getHomePage');

  cy.visit('/');

  cy.wait(`@${homePage}`).its('status').should('eq', 200);

  cy.get('.cx-login-greet').should('contain', 'Test User');
}

export function visitOrderDetailWithConsignment() {
  cy.visit('/my-account/order/100000');
  verifyTrackingBtn();
}

export function visitOrderDetailWithoutConsignment() {
  cy.visit('/my-account/order/100001');
  verifyNoTrackingBtn();
}

export function verifyTrackingBtn() {
  cy.get('.cx-list').should('have.length', 3);
  cy.get('.cx-list')
    .first()
    .within(() => {
      cy.get('.cx-code').should('contain', '300938');
      cy.get('.btn-track').click();
    });
  cy.get('.event-body').should('have.length', 3);
  cy.get('.close').click();
  cy.get('.cx-list')
    .next()
    .within(() => {
      cy.get('.cx-code').should('contain', '1992693');
      cy.get('.btn-track').click();
    });
  cy.get('.no-tracking-heading').should('have.length', 1);
  cy.get('.close').click();
  cy.get('.cx-list')
    .last()
    .within(() => {
      cy.get('.cx-code').should('contain', '1377492');
      verifyNoTrackingBtn();
    });
}

export function verifyNoTrackingBtn() {
  cy.get('.btn-track').should('have.length', 0);
}
