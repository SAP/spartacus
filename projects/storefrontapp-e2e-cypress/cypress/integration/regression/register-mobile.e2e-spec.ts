import * as register from '../../helpers/register';
import { formats } from '../../sample-data/viewports';

function clickHamburger() {
  cy.get('cx-header [aria-label="Menu"]').click();
}

function waitForHomePage() {
  cy.get('cx-dynamic-slot .ElectronicsHompageSplashBannerComponent').should(
    'exist'
  );
  clickHamburger();
}

describe(`${formats.mobile.width + 1}p resolution - Register`, () => {
  before(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  it('should contain error when trying to register with the same email', () => {
    waitForHomePage();

    register.loginPageAndRegister();

    waitForHomePage();

    register.signOut();

    clickHamburger();
    register.loginPageAndRegister();

    register.verifyFailedRegistration();
  });
});
