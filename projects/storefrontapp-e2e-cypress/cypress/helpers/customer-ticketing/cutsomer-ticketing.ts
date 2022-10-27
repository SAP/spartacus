import { standardUser } from '../../sample-data/shared-users';
import { generateMail, randomString } from '../user';
import { clickHamburger } from '../checkout-flow';

export function loginRegisteredUser() {
  standardUser.registrationData.email = generateMail(randomString(), true);
  cy.requireLoggedIn(standardUser);
  cy.reload();
}

export function clickMyAccountMenuOption(){
  cy.visit('/');
  cy.get('#cx-header', { timeout: 10000 }).should('be.visible');
  cy.onMobile(() => {
    clickHamburger();
  });
  cy.get('.accNavComponent button').click();
}

export function clickCustomerSupportMenuOption(){
  cy.get('.accNavComponent li:nth-child(14)').should('contain.text', 'Customer Service');
  cy.get('.accNavComponent li:nth-child(14) a').click();
}

export function verifyTicketListingPageVisit(){
  cy.url().should('include','/my-account/support-tickets');
  cy.get('cx-customer-ticketing-list').should('exist');
}

export function clickFirstTicketFromTicketListing(){
  cy.get('#ticketing-list-table tbody tr:nth-child(1) .cx-ticketing-list-data:nth-child(1) a.cx-ticketing-list-value').should('exist');
  cy.get('#ticketing-list-table tbody tr:nth-child(1) .cx-ticketing-list-data:nth-child(1) a.cx-ticketing-list-value').click();
}

export function verifyTicketDetailsPageVisit(){
  cy.url().should('match',/http:\/\/.+\/my\-account\/support\-ticket\/[0-9]+/);
  cy.get('cx-customer-ticketing-messages').should('exist');
}
