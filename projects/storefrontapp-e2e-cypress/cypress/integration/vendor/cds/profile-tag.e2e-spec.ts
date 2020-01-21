import { clickAllowAllFromBanner } from '../../../helpers/anonymous-consents';
import { navigation } from '../../../helpers/navigation';
import { cdsHelper } from '../../../helpers/vendor/cds/cds';
import * as mercahndisingCarousel from '../../../helpers/vendor/cds/merchandising-carousel';
import { profileTagHelper } from '../../../helpers/vendor/cds/profile-tag';
describe('Profile-tag component', () => {
  beforeEach(() => {
    cy.server();
    cdsHelper.setUpMocks();
  });
  it('should wait for a user to accept consent before sending an event', () => {
    navigation.visitHomePage();
    cy.wait(1000).then(() => {
      expect(navigation.requestsCount(cdsHelper.clickstreamevents)).to.eq(0);
    });
    clickAllowAllFromBanner();
    cy.wait(`@${cdsHelper.clickstreamevents}`).then(_ => {
      expect(navigation.requestsCount(cdsHelper.clickstreamevents)).to.eq(1);
    });
  });
  it('should send an event on a pageview', () => {
    navigation.visitHomePage();
    clickAllowAllFromBanner();
    cy.wait(`@${cdsHelper.clickstreamevents}`).then(xhr => {
      profileTagHelper.assertPageViewEvent(xhr);
    });
  });
  it('should send an event on a productview', () => {
    navigation.visitHomePage();
    clickAllowAllFromBanner();
    cy.wait(`@${cdsHelper.clickstreamevents}`).then(xhr => {
      profileTagHelper.assertPageViewEvent(xhr);
    });
    mercahndisingCarousel.clickOnCarouselItem('779864');
    cy.wait(`@${cdsHelper.clickstreamevents}`)
      .then(xhr => {
        profileTagHelper.assertProductViewEvent(xhr);
      })
      .then(() => {
        expect(navigation.requestsCount(cdsHelper.clickstreamevents)).to.eq(2);
      });
  });
});
