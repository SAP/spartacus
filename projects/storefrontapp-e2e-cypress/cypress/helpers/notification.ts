import { standardUser } from '../sample-data/shared-users';
import { generateMail, randomString } from './user';

export const configurableProductCode = '1934793';
export const variantProductCode = '1978440_red';
export const normalProductCode = '358639';

export function registerAndLogin() {
  standardUser.registrationData.email = generateMail(randomString(), true);
  cy.requireLoggedIn(standardUser);
  cy.reload();
}

export function notificationFlow(productCode) {
  navigateToNotificationPreferencePage();
  enableNotificationPreferenceChannel();
  navigateToPDP(productCode);
  subscribeStockNotification();
  navigateToMyInterestsPageThroughSuccessDialog();
  varifyCustomerInterest(productCode);
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

export function navigateToMyInterestsPageThroughSuccessDialog() {
  cy.get('.link-interests').click();
  cy.location('pathname').should('contain', '/my-account/my-interests');
}

export function navigateToNotificationPreferencePageThroughSuccessDialog() {
  cy.get('.link-prefs').click();
  cy.location('pathname').should(
    'contain',
    '/my-account/notification-preference'
  );
}

export function navigateToPDP(productCode: string) {
  cy.get('cx-searchbox input')
    .clear()
    .type(`${productCode}{enter}`);
  cy.get('.cx-product-image > img')
    .last()
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
  cy.get('cx-stock-notification > .btn')
    .should('contain', 'NOTIFY ME')
    .click();
}
export function unsubscribeStockNotification() {
  cy.get('cx-stock-notification > .btn')
    .should('contain', 'STOP NOTIFICATION')
    .click();
  cy.get('.alert');
  cy.get('cx-stock-notification > .btn').should('contain', 'NOTIFY ME');
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
export function removeCustomerInterest(productCode: string) {
  cy.get('.cx-product-interests-product-item').within(() => {
    cy.get('.cx-code').should('contain', productCode);
    cy.get('.cx-product-interests-remove-button > button').click();
  });
  cy.get('.cx-product-interests-message').should('exist');
}

export function navigateToPDPThrougnCustomerInterest(productCode: string) {
  cy.get('.cx-product-interests-product-item').within(() => {
    cy.get('.cx-code').should('contain', productCode);
    cy.get(
      '.cx-product-interests-product-image-link > .is-initialized > img'
    ).click();
  });
  cy.location('pathname').should('contain', `product/${productCode}`);
  cy.get('cx-stock-notification > .btn').should('contain', 'STOP NOTIFICATION');
}
