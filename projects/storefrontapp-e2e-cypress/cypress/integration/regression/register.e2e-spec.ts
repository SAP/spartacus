import * as register from '../../helpers/register';
import { user } from '../../sample-data/checkout-flow';

describe('Register', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  // Behavior changed to automatic login.
  it('should login when trying to register with the same email and correct password', () => {
    register.registerUser(user);
    register.signOut();
    register.navigateToTermsAndConditions();
    register.registerUser(user);
    register.checkTermsAndConditions();
    register.signOut();
  });

  it('should contain error when trying to register with the same email and different password', () => {
    register.registerUser(user);
    register.signOut();
    register.registerUser({ ...user, password: 'Different123.' });
    register.verifyFailedRegistration();
  });
});
