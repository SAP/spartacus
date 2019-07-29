import * as register from '../../helpers/register';
import { formats } from '../../sample-data/viewports';
import { waitForHomePage, clickHamburger } from '../../helpers/homepage';
import { user } from '../../sample-data/checkout-flow';
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
    waitForHomePage();
    register.signOut();
    register.navigateToTermsAndConditions();
    register.checkTermsAndConditions();
    clickHamburger();
    register.registerUser(user);
    register.checkTermsAndConditions();
    register.verifyGlobalMessageAfterRegistration();
  });

  it('should contain error when trying to register with the same email and different password', () => {
    cy.visit('/');
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
