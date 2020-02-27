import * as anonymousConsents from '../../../helpers/anonymous-consents';
import { waitForPage } from '../../../helpers/checkout-flow';
import { navigation } from '../../../helpers/navigation';
import { cdsHelper } from '../../../helpers/vendor/cds/cds';
import { profileTagHelper } from '../../../helpers/vendor/cds/profile-tag';
describe('Profile-tag component', () => {
  beforeEach(() => {
    cy.server();
    cdsHelper.setUpMocks();

    const homePage = waitForPage('homepage', 'getHomePage');
    navigation.visitHomePage({
      options: {
        onBeforeLoad: profileTagHelper.interceptProfileTagJs,
      },
    });
    cy.get('cx-profiletag');
    cy.wait(`@${homePage}`)
      .its('status')
      .should('eq', 200);

    profileTagHelper.triggerLoaded();
  });
  it('should send a Navigated event when a navigation occurs', () => {
    const categoryPage = waitForPage('CategoryPage', 'getCategory');
    cy.get(
      'cx-page-slot cx-banner img[alt="Save Big On Select SLR & DSLR Cameras"]'
    ).click();
    cy.wait(`@${categoryPage}`)
      .its('status')
      .should('eq', 200);
    cy.window().then(win => {
      expect((<any>win).Y_TRACKING.eventLayer[0]['name']).to.equal('Navigated');
    });
  });
  it('should wait for a user to accept consent and then send a ConsentChanged event', () => {
    anonymousConsents.clickAllowAllFromBanner();
    cy.window().then(win => {
      expect((<any>win).Y_TRACKING.eventLayer[0]).to.have.property('name');
      expect((<any>win).Y_TRACKING.eventLayer[0]['name']).to.equal(
        'ConsentChanged'
      );
    });
  });
});
