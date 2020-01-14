import { clickAllowAllFromBanner } from '../../../helpers/anonymous-consents';
import { Navigation } from '../../../helpers/navigation';
import { CdsHelper } from '../../../helpers/vendor/cds/cds';
import * as MercahndisingCarousel from '../../../helpers/vendor/cds/merchandising-carousel';
import { ProfileTagHelper } from '../../../helpers/vendor/cds/profile-tag';
describe('Profile-tag component', () => {
  beforeEach(() => {
    cy.server();
    CdsHelper.setUpMocks();
  });
  it('Should wait for a user to accept consent before sending an event', () => {
    Navigation.visitHomePage();
    cy.wait(1000);
    cy.wait(1).then(() => {
      expect(Navigation.requestsCount(CdsHelper.clickstreamevents)).to.eq(0);
    });
    clickAllowAllFromBanner();
    cy.wait(`@${CdsHelper.clickstreamevents}`).then(_ => {
      expect(Navigation.requestsCount(CdsHelper.clickstreamevents)).to.eq(1);
    });
  });
  it('Should send an event on a pageview', () => {
    Navigation.visitHomePage();
    clickAllowAllFromBanner();
    cy.wait(`@${CdsHelper.clickstreamevents}`).then(xhr => {
      ProfileTagHelper.assertPageViewEvent(xhr);
    });
  });
  it('Should send an event on a productview', () => {
    Navigation.visitHomePage();
    clickAllowAllFromBanner();
    cy.wait(500);
    MercahndisingCarousel.clickOnCarouselItem('779864');
    cy.wait(`@${CdsHelper.clickstreamevents}`).then(xhr => {
      ProfileTagHelper.assertPageViewEvent(xhr);
    });
    cy.wait(`@${CdsHelper.clickstreamevents}`).then(xhr => {
      ProfileTagHelper.assertProductViewEvent(xhr);
    });
    cy.wait(1).then(() => {
      expect(Navigation.requestsCount(CdsHelper.clickstreamevents)).to.eq(2);
    });
  });
});
