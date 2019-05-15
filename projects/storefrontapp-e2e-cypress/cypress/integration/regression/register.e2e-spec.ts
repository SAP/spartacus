import * as register from '../../helpers/register';
import { checkBanner } from '../../helpers/homepage';
import { user } from '../../sample-data/checkout-flow';

describe('Register', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/');
  });

  // Behavior changed to automatic login. LOL
  it('should login when trying to register with the same email and correct password', () => {
    register.registerUser(user);
    register.signOut();
    register.checkTermsAndConditions();
    register.registerUser(user);
    checkBanner();
  });

  it('should contain error when trying to register with the same email and different password', () => {
    register.registerUser(user);
    register.signOut();
    register.checkTermsAndConditions();
    register.registerUser({ ...user, password: 'Different123.' });
    register.verifyFailedRegistration();
  });
});
