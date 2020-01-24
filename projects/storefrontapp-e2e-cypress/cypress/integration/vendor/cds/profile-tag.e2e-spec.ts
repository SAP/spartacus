import { clickAllowAllFromBanner } from '../../../helpers/anonymous-consents';
import * as checkout from '../../../helpers/checkout-flow';
import { navigation } from '../../../helpers/navigation';
import { cdsHelper } from '../../../helpers/vendor/cds/cds';
import { profileTagHelper } from '../../../helpers/vendor/cds/profile-tag';
describe('Profile-tag component', () => {
  beforeEach(() => {
    cy.server();
    cdsHelper.setUpMocks();
  });
  it('should wait for a user to accept consent and then send a ConsentChanged event', () => {
    const homePage = checkout.waitForPage('homepage', 'getHomePage');
    navigation.visitHomePage({
      options: {
        onBeforeLoad: profileTagHelper.interceptProfileTagJs,
      },
    });
    cy.wait(`@${homePage}`);
    profileTagHelper.triggerLoaded();
    cy.window().then(win => {
      const event = new CustomEvent('profiletag_loaded');
      win.dispatchEvent(event);
    });
    clickAllowAllFromBanner();
    cy.window().then(win => {
      expect((<any>win).Y_TRACKING.eventLayer[0]).to.have.property('name');
      expect((<any>win).Y_TRACKING.eventLayer[0]['name']).to.equal(
        'ConsentChanged'
      );
    });
  });
  it('should send a Navigated event when a navigation occurs', () => {
    const homePage = checkout.waitForPage('homepage', 'getHomePage');
    navigation.visitHomePage({
      options: {
        onBeforeLoad: profileTagHelper.interceptProfileTagJs,
      },
    });
    cy.wait(`@${homePage}`);
    profileTagHelper.triggerLoaded();
    cy.get('.item.active')
      .first()
      .click();
    cy.location('pathname', { timeout: 1000 }).should('include', '/product');
    cy.window().then(win => {
      expect((<any>win).Y_TRACKING.eventLayer[0]['name']).to.equal('Navigated');
    });
  });
});
