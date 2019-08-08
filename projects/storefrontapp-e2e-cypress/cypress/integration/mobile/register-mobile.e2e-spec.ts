import { clickHamburger, waitForHomePage } from '../../helpers/homepage';
import * as login from '../../helpers/login';
import * as register from '../../helpers/register';
import { user } from '../../sample-data/checkout-flow';
import { formats } from '../../sample-data/viewports';

describe(`${formats.mobile.width + 1}p resolution - Register`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
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
