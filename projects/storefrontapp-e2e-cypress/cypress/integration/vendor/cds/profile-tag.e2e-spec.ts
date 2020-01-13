import { clickAllowAllFromBanner } from '../../../helpers/anonymous-consents';
import { Navigation } from '../../../helpers/navigation';
import { ProfileTagHelper } from '../../../helpers/vendor/cds/profile-tag';
const clickstreamevents = 'clickstreamevents';
describe('Profile-tag component', () => {
  beforeEach(() => {
    cy.server();
    cy.route('POST', '**/clickstreamEvents').as(clickstreamevents);
  });
  // it('Should send an event on a pageview', () => {
  //   Navigation.visitHomePage();
  //   clickAllowAllFromBanner();
  //   cy.wait(`@${clickstreamevents}`).then(_ => {
  //     expect(true).to.equal(true);
  //   });
  // });
  it('Should send an event on a productview', async () => {
    Navigation.visitHomePage();
    clickAllowAllFromBanner();
    await Navigation.SPA.goToProduct(358639);
    cy.wait(`@${clickstreamevents}.1`).then(xhr => {
      ProfileTagHelper.assertPageViewEvent(xhr);
    });
    cy.wait(`@${clickstreamevents}.2`).then(xhr => {
      expect(xhr.requestHeaders['consent-reference']).not.be.undefined;
      expect(xhr.requestBody).not.be.undefined;
    });
    cy.get(`@${clickstreamevents}.all`).should('have.length', 3);
  });
});
