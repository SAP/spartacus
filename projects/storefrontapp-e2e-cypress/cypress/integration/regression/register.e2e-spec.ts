import * as register from '../../helpers/register';
import { user } from '../../sample-data/checkout-flow';

describe('Register', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.visit('/');
  });

  it('should register and redirect to login page', () => {
    register.registerUser(user);
    register.verifyGlobalMessageAfterRegistration();
    register.navigateToTermsAndConditions();
    register.checkTermsAndConditions();
  });
});
