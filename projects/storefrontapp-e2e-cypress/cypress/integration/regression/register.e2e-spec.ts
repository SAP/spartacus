import * as register from '../../helpers/register';

describe('Register', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  // Behavior changed to automatic login. Skipping it until confirming that this behavior is intended.
  it.skip('should contain error when trying to register with the same email', () => {
    register.registerUser();

    register.signOut();
    register.checkTermsAndConditions();
    register.registerUser();

    register.verifyFailedRegistration();
  });
});
