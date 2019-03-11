import { user } from '../sample-data/big-happy-path';
import { register } from '../helpers/auth-forms';
import { formats } from '../sample-data/viewports';

describe(`${formats.mobile.width + 1}p resolution - Register`, () => {
  const loginLink = 'cx-login [role="link"]';
  before(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  it('should contain error when trying to register with the same email', () => {
    cy.get('cx-dynamic-slot .ElectronicsHompageSplashBannerComponent').should(
      'exist'
    );
    cy.get('cx-header [aria-label="Menu"]').click();
    cy.get(loginLink).click();
    cy.get('cx-page-layout')
      .getByText('Register')
      .click();
    register(user);
    cy.get('cx-dynamic-slot .ElectronicsHompageSplashBannerComponent').should(
      'exist'
    );

    cy.get('cx-header [aria-label="Menu"]').click();
    cy.selectUserMenuOption('Sign Out');

    // attempt to register the same user again
    cy.visit('/');
    cy.get('cx-header [aria-label="Menu"]').click();
    cy.get(loginLink).click();
    cy.get('cx-page-layout')
      .getByText('Register')
      .click();
    register(user);

    cy.get('cx-global-message .alert-danger').should('contain', user.email);

    // the url should be still the same
    cy.url().should('match', /\/register/);
  });
});
