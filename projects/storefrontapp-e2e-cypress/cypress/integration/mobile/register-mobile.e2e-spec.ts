import { waitForHomePage } from '../../helpers/homepage';
import * as register from '../../helpers/register';
import { user } from '../../sample-data/checkout-flow';
import { formats } from '../../sample-data/viewports';

describe(`${formats.mobile.width + 1}p resolution - Register`, () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.visit('/');
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  it('should register and redirect to login page', () => {
    waitForHomePage();
    register.registerUser(user);
    register.verifyGlobalMessageAfterRegistration();
    register.navigateToTermsAndConditions();
    register.checkTermsAndConditions();
  });
});
