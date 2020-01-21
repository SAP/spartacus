import * as merchandisingCarousel from './merchandising-carousel';
import { profileTagHelper } from './profile-tag';

export const cdsHelper = {
  setUpMocks() {
    cy.route(
      'GET',
      '/strategy/*/strategies/*/products**',
      merchandisingCarousel.STRATEGY_RESPONSE
    );
    cy.route(
      'GET',
      '**/dfbb97b0-f4d7-11e9-9c99-2125ab7968c6',
      profileTagHelper.configResponse
    );
    cy.route(
      'POST',
      '**/consentReferences',
      profileTagHelper.consentReferenceResponse
    );
    cy.route('POST', '**/clickstreamEvents', {}).as(
      cdsHelper.clickstreamevents
    );
  },
  clickstreamevents: 'clickstreamevents',
};
