import * as merchandisingCarousel from './merchandising-carousel';
import { ProfileTagHelper } from './profile-tag';

export const CdsHelper = {
  setUpMocks() {
    cy.route(
      'GET',
      '/strategy/*/strategies/*/products**',
      merchandisingCarousel.STRATEGY_RESPONSE
    );
    cy.route(
      'GET',
      '**/dfbb97b0-f4d7-11e9-9c99-2125ab7968c6',
      ProfileTagHelper.configResponse
    );
    cy.route(
      'POST',
      '**/consentReferences',
      ProfileTagHelper.consentReferenceResponse
    );
    cy.route('POST', '**/clickstreamEvents', {}).as(
      CdsHelper.clickstreamevents
    );
  },
  clickstreamevents: 'clickstreamevents',
};
