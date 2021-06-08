import { standardUser } from '../sample-data/shared-users';
import { generateMail, randomString } from './user';

export function registerAndLogin() {
  standardUser.registrationData.email = generateMail(randomString(), true);
  cy.requireLoggedIn(standardUser);
}
