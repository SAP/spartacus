import { clickAllowAllFromBanner } from '../../../helpers/anonymous-consents';
import { Navigation } from '../../../helpers/navigation';
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
    cy.wait(`@${clickstreamevents}`).then(xhr => {
      console.log(xhr.requestHeaders);
      console.log('called');
      expect(xhr.requestHeaders['consent-reference']).not.be.undefined;
      expect(xhr.requestBody).not.be.undefined;
    });
    cy.wait(`@${clickstreamevents}`).then(xhr => {
      console.log(xhr.requestHeaders);
      console.log('called');
      expect(xhr.requestHeaders['consent-reference']).not.be.undefined;
      expect(xhr.requestBody).not.be.undefined;
    });
    cy.get(`@${clickstreamevents}.all`).should('have.length', 3);
  });
});
