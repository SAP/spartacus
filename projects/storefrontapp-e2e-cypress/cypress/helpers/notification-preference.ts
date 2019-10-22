import { standardUser } from '../sample-data/shared-users';
import { generateMail, randomString } from './user';
import { login } from './auth-forms';

export const password = 'Password123.';
const newUid = generateMail(randomString(), true);

export function accessPageAsAnonymous() {
  cy.visit('/my-account/notification-preference');
  cy.location('pathname').should('contain', '/login');
}

export function verifyEmailChannel() {
  cy.get('cx-notification-preference').within(() => {
    cy.get('.pref-channel .form-check-label').should(
      'contain',
      'Email: ' + standardUser.registrationData.email
    );
    cy.get('[type="checkbox"]')
      .first()
      .should('not.be.checked');
  });
}

export function verifyUpdatedEmailChannel() {
  cy.get('.pref-channel .form-check-label').should(
    'contain',
    'Email: ' + newUid
  );
}

export function enableFirstChannel() {
  cy.get('[type="checkbox"]')
    .first()
    .check();
}

export function disableFirstChannel() {
  cy.get('[type="checkbox"]')
    .first()
    .uncheck();
}

export function goToHomePageAndBack() {
  cy.visit('/');
  cy.selectUserMenuOption({
    option: 'Notification Preference',
  });
}

export function verifyChannelStatus() {
  enableFirstChannel();
  goToHomePageAndBack();
  cy.get('[type="checkbox"]')
    .first()
    .should('be.checked');

  disableFirstChannel();
  goToHomePageAndBack();
  cy.get('[type="checkbox"]')
    .first()
    .should('not.be.checked');
}

export function verifyAfterUpdateEmailAddress() {
  verifyEmailChannel();
  cy.selectUserMenuOption({
    option: 'Email Address',
  });
  updateEmail();
  cy.selectUserMenuOption({
    option: 'Notification Preference',
  });
  verifyUpdatedEmailChannel();
}

export function updateEmail() {
  cy.get('cx-update-email-form [formcontrolname="email"]').type(newUid);
  cy.get('cx-update-email-form [formcontrolname="confirmEmail"]').type(newUid);
  cy.get('cx-update-email-form [formcontrolname="password"]').type(password);

  cy.get('cx-update-email-form button[type="submit"]').click();

  login(newUid, password);
}
