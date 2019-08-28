import * as register from '../../helpers/register';
import { user } from '../../sample-data/checkout-flow';
import { waitForHomePage } from '../../helpers/homepage';

describe('Register', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  it('should register and redirect to login page', () => {
    waitForHomePage();
    register.registerUser(user);
    register.verifyGlobalMessageAfterRegistration();
    register.navigateToTermsAndConditions();
    register.checkTermsAndConditions();
  });
});
