import * as register from '../../helpers/register';
import * as login from '../../helpers/login';
import { user } from '../../sample-data/checkout-flow';

describe('Register', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('should register and redirect to login page', () => {
    register.registerUser(user);
    register.signOut();
    register.navigateToTermsAndConditions();
    register.registerUser(user);
    register.checkTermsAndConditions();
    register.verifyGlobalMessageAfterRegistration();
  });

  it('should be redirect to login page when trying to register with the same email and password', () => {
    register.registerUser(user);
    register.verifyGlobalMessageAfterRegistration();
    login.loginUser();
    register.signOut();
    register.navigateToTermsAndConditions();
    register.checkTermsAndConditions();
    register.registerUser(user);
    register.verifyGlobalMessageAfterRegistration();
  });
});
