import { standardUser } from '../sample-data/shared-users';
import { generateMail, randomString } from './user';
import { login } from './auth-forms';

export const configurableProductCode = '1934793';
export const variantProductCode = '1978440_red';
export const normalProductCode = '358639';
export const productCodeList = ['553637', '592506', '932577', '3357724', '4205431', '358639'
                                , '2053266', '898520', '816379', '1978440_red', '1934793'];

export const password = 'Password123.';
const newUid = generateMail(randomString(), true);

export function accessPageAsAnonymous() {
  cy.visit('/my-account/notification-preference');
  cy.location('pathname').should('contain', '/login');
}

export function verifyEmailChannel() {
  cy.get('cx-notification-preference').within(()=>{
    cy.get('.pref-channel .form-check-label').should('contain', 'Email: '+ standardUser.registrationData.email);
    cy.get('[type="checkbox"]').first().should('not.be.checked');
  }
  );
}

export function enableFirstChannel() {
  cy.get('[type="checkbox"]').first().check() 
}

export function disableFirstChannel() {
  cy.get('[type="checkbox"]').first().uncheck()
}

export function goToHomePageAndBack(){
  cy.visit('/');
  cy.selectUserMenuOption({
    option: 'Notification Preference',
  });
}

export function channelEnable(){
  enableFirstChannel();
  goToHomePageAndBack();
}

export function channelDisable(){
  disableFirstChannel()
  goToHomePageAndBack();
}

export function updateEmail() { 
  cy.selectUserMenuOption({
    option: 'Email Address',
  });
  cy.get('cx-update-email-form [formcontrolname="email"]').type(newUid);
  cy.get('cx-update-email-form [formcontrolname="confirmEmail"]').type(newUid);
  cy.get('cx-update-email-form [formcontrolname="password"]').type(password);

  cy.get('cx-update-email-form button[type="submit"]').click();

  login(newUid, password);
}

export function registerAndLogin() {
  standardUser.registrationData.email = generateMail(randomString(), true);
  cy.requireLoggedIn(standardUser);
  cy.reload();
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
  verifyMyInterestPath();
}

export function navigateToNotificationPreferencePageThroughSuccessDialog() {
  cy.get('.link-prefs').click();
  cy.location('pathname').should(
    'contain',
    '/my-account/notification-preference'
  );
}

export function navigateToPDP(productCode: string) {
  cy.get('cx-searchbox').click();
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
  navigateToNotificationPreferencePage();
  enableFirstChannel();
}
export function subscribeStockNotification() {
  cy.get('cx-stock-notification > .btn')
    .should('contain', 'NOTIFY ME')
    .click();
}

export function subscribeGotoMyInterestPage() {
  cy.get('cx-stock-notification > .btn')
    .should('contain', 'NOTIFY ME')
    .click();
  cy.get('.link-interests').click();
}

export function subscribeGotoNotificationPreferencePage() {
  cy.get('cx-stock-notification > .btn')
    .should('contain', 'NOTIFY ME')
    .click();
  cy.get('.link-prefs').click();
}

export function unsubscribeStockNotification() {
  cy.get('cx-stock-notification > .btn')
    .should('contain', 'STOP NOTIFICATION')
    .click({ force: true });
  cy.get('.alert');
  cy.get('cx-stock-notification > .btn').should('contain', 'NOTIFY ME');
}

export function subscribeStockNotificationOK(){
  cy.get('.btn-ok')
    .should('contain', 'OK')
    .click();
}
export function verifyCustomerInterest(productCode: string) {
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
}

export function navigateToPDPThrougnCustomerInterest(productCode: string) {
  cy.get('.cx-product-interests-product-item').within(() => {
    cy.get('.cx-code').should('contain', productCode);
    cy.get(
      '.cx-product-interests-product-image-link > .is-initialized > img'
    ).click();
  });
}

export function subscribeProductList(productCodesList: string[]){
  productCodesList.forEach(productCode => {
    navigateToPDP(productCode);
    subscribeStockNotification();
    cy.get('.btn-ok').click();
  });
}

export function stockNotificationGuestTests(){
  it('should login first when guest subscribing stock notification', () => {
    navigateToPDP(normalProductCode);
    guestSubscribeStockNotification();
  });
}

export function verifyPagingSort() {
  cy.get('.top cx-sorting .ng-select').ngSelect('NAME(ASCENDING)');
  cy.get('.cx-product-interests-product-item').should('have.length', 10);
}

export function verifyProductPage(productCode: string) {
  cy.location('pathname').should('contain', `product/${productCode}`);
  cy.get('cx-stock-notification > .btn').should('contain', 'STOP NOTIFICATION');
}

export function verifyUnsubscribe() {
  cy.get('.alert');
  cy.get('cx-stock-notification > .btn').should('contain', 'NOTIFY ME');
}

export function verifyChannelDisabled() {
  cy.get('[type="checkbox"]').first().should("not.be.checked");
}

export function verifyChannelEnabled() {
  cy.get('[type="checkbox"]').first().should("be.checked");
}

export function verifyUpdatedEmailChannel() {
  cy.get('.pref-channel .form-check-label').should('contain', 'Email: '+ newUid);
}

export function verifyMyInterestPath() {
  cy.location('pathname').should('contain', '/my-account/my-interests');
}