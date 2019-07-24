import { clickHamburger, waitForHomePage } from '../../helpers/homepage';
import * as register from '../../helpers/register';
import { user } from '../../sample-data/checkout-flow';
import { formats } from '../../sample-data/viewports';
import * as login from '../../helpers/login';

describe(`${formats.mobile.width + 1}p resolution - Register`, () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.visit('/');
  });

  it('should register and redirect to login page', () => {
    waitForHomePage();
    register.registerUser(user);
    register.verifyGlobalMessageAfterRegistration();
  });

  it('should be redirect to login page when trying to register with the same email and password', () => {
    waitForHomePage();
    register.registerUser(user);
    register.verifyGlobalMessageAfterRegistration();
    login.loginUser();
    register.signOut();
    register.navigateToTermsAndConditions();
    register.checkTermsAndConditions();
    clickHamburger();
    register.registerUser(user);
    register.verifyGlobalMessageAfterRegistration();
  });
});
