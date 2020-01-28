import * as anonymousConsents from '../../../helpers/anonymous-consents';
import { navigation } from '../../../helpers/navigation';
import { cdsHelper } from '../../../helpers/vendor/cds/cds';
import { profileTagHelper } from '../../../helpers/vendor/cds/profile-tag';
import * as loginHelper from '../../../helpers/login';

describe('Profile-tag component', () => {
  beforeEach(() => {
    cy.server();
    cdsHelper.setUpMocks();
  });  
  beforeEach(() => {
    cy.server();
    cdsHelper.setUpMocks();
  });
  it('should send a Navigated event when a navigation occurs', () => {
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
  it.only('should call the login endpont of EC on a successful login', () => {
    const alias = 'loginNotification';
    cy.route('*/users/current/loginnotification').as(alias)

    waitForCMSComponents();
    loginHelper.registerUser();
    loginHelper.loginUser();

    cy.wait(`@${alias}`).then((xhr) => {
      cy.log('retreived the response');
      cy.log(JSON.stringify(xhr));
    })    

  }); 

  it('should not call the login endpont of EC on a failed login', () => {
    loginHelper.loginWithBadCredentials();
  });  

  function waitForCMSComponents(timeout=5000) {
    navigation.visitHomePage({
      options: {
        onBeforeLoad: profileTagHelper.interceptProfileTagJs,
      },
    });
    cy.get('cx-profiletag', {timeout});    
  }
});
