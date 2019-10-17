import { standardUser } from '../sample-data/shared-users';
import { generateMail, randomString } from './user';

export function logout() {
  cy.selectUserMenuOption({
    option: 'Sign Out',
  });
}
export function navigateToNotificationPreferencePage() {
  cy.selectUserMenuOption({
    option: 'Notification Preference',
  });
}

export function navigateToMyInterestsPage() {
  cy.selectUserMenuOption({
    option: 'My Interests',
  });
}

export function registerAndLogin() {
  standardUser.registrationData.email = generateMail(randomString(), true);
  cy.requireLoggedIn(standardUser);
  cy.reload();
}
export function navigateToPDP(productCode: string) {
  cy.get('cx-searchbox input')
    .clear()
    .type(`${productCode}{enter}`);
  cy.get('.cx-product-image > img')
    .first()
    .click();
  cy.location('pathname').should('contain', `product/${productCode}`);
}

export function guestSubscribeStockNotification() {
  cy.get('.stock-notification-notes > label > a').click();
  cy.location('pathname').should('contain', '/login');
}

export function enableNotificationPreferenceChannel() {
  cy.get('.form-check-input')
    .first()
    .click();

  cy.get('.form-check-input')
    .first()
    .should('be.checked');
}
export function subscribeStockNotification() {
  cy.get('cx-stock-notification > .btn').click();
}

export function navigateToMyInterestsPageThroughSuccessDialog() {
  cy.get('.link-interests').click();
  cy.location('pathname').should('contain', '/my-account/my-interests');
}

export function varifyCustomerInterest(productCode: string) {
  cy.get('.cx-product-interests-product-item').within(() => {
    cy.get('.cx-code').should('contain', productCode);
    cy.get('.cx-product-interests-product-price > div').should(
      'contain',
      'PRICE'
    );
    cy.get(
      '.cx-product-interests-notification > .cx-product-interests-type'
    ).should('contain', 'Back In Stock');
    cy.get('.cx-product-interests-remove-button > button').should('exist');
  });
}
