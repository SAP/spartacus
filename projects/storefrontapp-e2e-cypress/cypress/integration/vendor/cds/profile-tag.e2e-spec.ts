import * as anonymousConsents from '../../../helpers/anonymous-consents';
import { navigation } from '../../../helpers/navigation';
import { cdsHelper } from '../../../helpers/vendor/cds/cds';
import { profileTagHelper } from '../../../helpers/vendor/cds/profile-tag';
describe('Profile-tag component', () => {
  beforeEach(() => {
    cy.server();
    cdsHelper.setUpMocks();
    cy.on('uncaught:exception', err => {
      cy.log(`message: ${err.message}
      stack: ${err.stack}`);
      return false;
    });
  });
  it('should send a Navigated event when a navigation occurs', () => {
    // navigation.visitHomePage({});
    navigation.visitHomePage({
      options: {
        onBeforeLoad: profileTagHelper.interceptProfileTagJs,
      },
    });
    cy.get('cx-profiletag');
    profileTagHelper.triggerLoaded();
    cy.get('.Section1.has-components')
      .first()
      .click();
    cy.location('pathname', { timeout: 2000 }).should(
      'include',
      '/OpenCatalogue'
    );
    cy.window().then(win => {
      expect((<any>win).Y_TRACKING.eventLayer[0]['name']).to.equal('Navigated');
    });
  });
  it('should wait for a user to accept consent and then send a ConsentChanged event', () => {
    // navigation.visitHomePage({});
    navigation.visitHomePage({
      options: {
        onBeforeLoad: profileTagHelper.interceptProfileTagJs,
      },
    });
    cy.get('cx-profiletag');
    profileTagHelper.triggerLoaded();
    anonymousConsents.clickAllowAllFromBanner();
    cy.window().then(win => {
      expect((<any>win).Y_TRACKING.eventLayer[0]).to.have.property('name');
      expect((<any>win).Y_TRACKING.eventLayer[0]['name']).to.equal(
        'ConsentChanged'
      );
    });
  });
});
