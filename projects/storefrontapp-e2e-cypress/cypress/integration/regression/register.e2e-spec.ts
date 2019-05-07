import * as register from '../../helpers/register';

describe('Register', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  it('should contain error when trying to register with the same email', () => {
    register.registerUser();

    register.signOut();
    register.checkTermsAndConditions();
    register.registerUser();

    register.verifyFailedRegistration();
  });
});
