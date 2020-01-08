import { generateMail, randomString } from './user';
import { login } from './auth-forms';
import { standardUser } from '../sample-data/shared-users';

export const normalProductCode = '1978440_green';
export const productCodeList = [
  '553637',
  '592506',
  '932577',
  '3357724',
  '4205431',
  '358639',
  '2053266',
  '898520',
  '816379',
  '1978440_red',
  '1934793',
];
export const firstProductCodeSelector =
  'cx-my-interests .cx-product-interests-product-item:first .cx-code';
export const firstProductAscending = '4205431';
export const firstProductDescending = '898520';
// notification preference
export function navigateToNotificationPreferencePage() {
  cy.selectUserMenuOption({
    option: 'Notification Preference',
  });
}

export function verifyNotificationPrefAsAnonymous() {
  cy.visit('/my-account/notification-preference');
  cy.location('pathname').should('contain', '/login');
}

export function enableNotificationChannel() {
  navigateToNotificationPreferencePage();
  cy.get('[type="checkbox"]')
    .first()
    .check();
}

export function disableNotificationChannel() {
  navigateToNotificationPreferencePage();
  cy.get('[type="checkbox"]')
    .first()
    .uncheck();
}

export function verifyNotificationChannel() {
  enableNotificationChannel();
  verifyChannelEnabled();
  disableNotificationChannel();
  verifyChannelDisabled();
}

export function updateEmail(): String {
  const password = 'Password123.';
  const newUid = generateMail(randomString(), true);
  cy.selectUserMenuOption({
    option: 'Email Address',
  });
  cy.get('cx-update-email-form [formcontrolname="email"]').type(newUid);
  cy.get('cx-update-email-form [formcontrolname="confirmEmail"]').type(newUid);
  cy.get('cx-update-email-form [formcontrolname="password"]').type(password);
  cy.get('cx-update-email-form button[type="submit"]').click();
  login(newUid, password);
  return newUid;
}

export function verifyChannelValueUpdating() {
  verifyEmailChannel(standardUser.registrationData.email);
  const newEmail = updateEmail();
  verifyEmailChannel(newEmail);
}

export function verifyChannelDisabled() {
  cy.visit('/');
  navigateToNotificationPreferencePage();
  cy.get('[type="checkbox"]')
    .first()
    .should('not.be.checked');
}

export function verifyChannelEnabled() {
  cy.visit('/');
  navigateToNotificationPreferencePage();
  cy.get('[type="checkbox"]')
    .first()
    .should('be.checked');
}

export function verifyEmailChannel(email: String) {
  navigateToNotificationPreferencePage();
  cy.get('cx-notification-preference').within(() => {
    cy.get('.pref-channel .form-check-label').should(
      'contain',
      'Email: ' + email
    );
    cy.get('[type="checkbox"]')
      .first()
      .should('not.be.checked');
  });
}
//stock notification
export function verifyStockNotificationAsGuest() {
  navigateToPDP(normalProductCode);
  cy.get('.stock-notification-notes > label > a').click();
  cy.location('pathname').should('contain', '/login');
}

export function navigateToPDP(productCode: string) {
  cy.visit(`/electronics-spa/en/USD/product/${productCode}`);
}

export function verifyStockNotificationWithoutChannel() {
  navigateToPDP(normalProductCode);
  cy.get('.stock-notification-notes > label > a').click();
  cy.location('pathname').should('contain', '/notification-preference');
}

export function verifyCustomerInterest(productCode: string) {
  cy.get('.cx-product-interests-product-item').within(() => {
    cy.get('.cx-code').should('contain', productCode);
  });
}

export function subscribeStockNotification(productCode: string) {
  clickNotifyMeBtn(productCode);
  cy.get('.cx-dialog-actions > .btn').click();
}

export function unsubscribeStockNotification(productCode: string) {
  navigateToPDP(productCode);
  cy.get('cx-stock-notification > .btn')
    .should('contain', 'STOP NOTIFICATION')
    .click();
}

export function clickNotifyMeBtn(productCode: string) {
  navigateToPDP(productCode);
  cy.get('cx-stock-notification > .btn')
    .should('contain', 'NOTIFY ME')
    .should('not.be.disabled')
    .then(el => {
      cy.wrap(el).click();
    });
}

export function verifyStockNotification() {
  enableNotificationChannel();
  clickNotifyMeBtn(normalProductCode);
  verifyNavigateToNotificationPreferenceInDialog();
  unsubscribeStockNotification(normalProductCode);
  verifyUnsubscribe();
  clickNotifyMeBtn(normalProductCode);
  verifyNavigateToMyInterestsInDialog();
}

export function verifyUnsubscribe() {
  cy.get('.alert');
  cy.get('cx-stock-notification > .btn').should('contain', 'NOTIFY ME');
}

export function verifyNavigateToNotificationPreferenceInDialog() {
  cy.get('.link-prefs').click();
  cy.location('pathname').should(
    'contain',
    '/my-account/notification-preference'
  );
}

export function verifyNavigateToMyInterestsInDialog() {
  cy.get('.link-interests').click();
  verifyCustomerInterest(normalProductCode);
}
//Customer interest
export function verifyMyInterestsAsAnonymous() {
  cy.visit('/my-account/my-interests');
  cy.location('pathname').should('contain', '/login');
}

export function verifySubscriptionAndCustomerInterest(productCode: string) {
  subscribeStockNotification(productCode);
  navigateToMyInterestsPage();
  verifyCustomerInterest(productCode);
}

export function verifyCustomerInterests() {
  verifySubscriptionAndCustomerInterest(normalProductCode);
  removeCustomerInterest(normalProductCode);
}

export function removeCustomerInterest(productCode: string) {
  cy.get('.cx-product-interests-product-item').within(() => {
    cy.get('.cx-code').should('contain', productCode);
    cy.get('.cx-product-interests-remove-button > button').click();
  });
  cy.get('.cx-product-interests-message').should('exist');
}

export function verifyRemovingCustomerInterestInPDP() {
  subscribeStockNotification(normalProductCode);
  navigateToMyInterestsPage();
  navigateToPDPInCustomerInterest(normalProductCode);
  cy.get('cx-stock-notification > .btn')
    .should('contain', 'STOP NOTIFICATION')
    .click();
  navigateToMyInterestsPage();
  cy.get('.cx-product-interests-message').should('exist');
}

export function navigateToPDPInCustomerInterest(productCode: string) {
  cy.get('.cx-product-interests-product-item').within(() => {
    cy.get('.cx-code').should('contain', productCode);
    cy.get(
      '.cx-product-interests-product-image-link > .is-initialized > img'
    ).click();
  });
}

export function verifyPagingAndSorting() {
  navigateToMyInterestsPage();
  cy.get(firstProductCodeSelector).should('contain', firstProductAscending);
  cy.get('.top cx-sorting .ng-select').ngSelect('Name (descending)');
  cy.get(firstProductCodeSelector).should('contain', firstProductDescending);
  cy.get('.cx-product-interests-product-item').should('have.length', 10);
  cy.get('cx-pagination:first .page-link').should('have.length', 4);
}

export function navigateToMyInterestsPage() {
  cy.selectUserMenuOption({
    option: 'My Interests',
  });
}
