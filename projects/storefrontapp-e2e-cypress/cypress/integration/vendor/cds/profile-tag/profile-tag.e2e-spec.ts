import * as anonymousConsents from '../../../../helpers/anonymous-consents';
import { waitForPage } from '../../../../helpers/checkout-flow';
import * as loginHelper from '../../../../helpers/login';
import { navigation } from '../../../../helpers/navigation';
import {
  cdsHelper,
  strategyRequestAlias,
} from '../../../../helpers/vendor/cds/cds';
import { profileTagHelper } from '../../../../helpers/vendor/cds/profile-tag';

const cartSnapshotEventName = 'CartSnapshot';

describe('Profile-tag events', () => {
  beforeEach(() => {
    cy.server();
    cdsHelper.setUpMocks(strategyRequestAlias);
    navigation.visitHomePage({
      options: {
        onBeforeLoad: profileTagHelper.interceptProfileTagJs,
      },
    });
    profileTagHelper.waitForCMSComponents();
  });

  it('should send a CartChanged event on adding an item to cart', () => {
    goToProductPage();
    cy.get('cx-add-to-cart button.btn-primary').click();
    cy.get('cx-added-to-cart-dialog .btn-primary');
    cy.window().then((win) => {
      expect(
        (<any>win).Y_TRACKING.eventLayer.filter(
          (event) => event.name === cartSnapshotEventName
        ).length
      ).to.equal(1);

      const cartSnapshotEvent = (<any>win).Y_TRACKING.eventLayer.filter(
        (event) => event.name === cartSnapshotEventName
      )[0];
      const cartPayload = JSON.stringify(cartSnapshotEvent.data);

      expect(cartPayload).to.include('cart');
      expect(cartPayload).to.include('code');
    });
  });

  it('should send an additional CartChanged event on modifying the cart', () => {
    goToProductPage();
    cy.get('cx-add-to-cart button.btn-primary').click();
    cy.get('cx-added-to-cart-dialog .btn-primary').click();
    cy.get('cx-cart-item cx-item-counter').findByText('+').click();
    cy.route(
      'GET',
      `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/anonymous/carts/*`
    ).as('getRefreshedCart');
    cy.wait('@getRefreshedCart');
    cy.window().then((win) => {
      expect(
        (<any>win).Y_TRACKING.eventLayer.filter(
          (event) => event.name === cartSnapshotEventName
        ).length
      ).to.equal(2);
    });
  });

  it('should send an additional CartChanged event on emptying the cart', () => {
    goToProductPage();
    cy.get('cx-add-to-cart button.btn-primary').click();
    cy.get('cx-added-to-cart-dialog .btn-primary').click();
    cy.get('cx-cart-item-list').get('.cx-remove-btn > .link').click();
    cy.route(
      'GET',
      `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/anonymous/carts/*`
    ).as('getRefreshedCart');
    cy.wait('@getRefreshedCart');
    cy.window().then((win) => {
      expect(
        (<any>win).Y_TRACKING.eventLayer.filter(
          (event) => event.name === cartSnapshotEventName
        ).length
      ).to.equal(2);
    });
  });

  it('should send a Navigated event when a navigation occurs', () => {
    const categoryPage = waitForPage('CategoryPage', 'getCategory');
    cy.get(
      'cx-page-slot cx-banner img[alt="Save Big On Select SLR & DSLR Cameras"]'
    ).click();
    cy.wait(`@${categoryPage}`).its('status').should('eq', 200);
    cy.window().then((win) => {
      expect((<any>win).Y_TRACKING.eventLayer[0]['name']).to.equal('Navigated');
    });
  });

  it('should wait for a user to accept consent and then send a ConsentChanged event', () => {
    anonymousConsents.clickAllowAllFromBanner();
    cy.window().then((win) => {
      expect((<any>win).Y_TRACKING.eventLayer[0]).to.have.property('name');
      expect((<any>win).Y_TRACKING.eventLayer[0]['name']).to.equal(
        'ConsentChanged'
      );
    });
  });
});
describe('login notification', () => {
  const loginAlias = 'loginNotification';
  beforeEach(() => {
    cy.server();
    cdsHelper.setUpMocks(strategyRequestAlias);
    cy.route('POST', '**/users/current/loginnotification**').as(loginAlias);
    navigation.visitHomePage({
      options: {
        onBeforeLoad: profileTagHelper.interceptProfileTagJs,
      },
    });
    profileTagHelper.waitForCMSComponents();
    profileTagHelper.triggerLoaded();
    profileTagHelper.triggerConsentReferenceLoaded();
  });
  it('should not call the login endpont of EC on a failed login', () => {
    loginHelper.loginWithBadCredentials();
    navigation
      .visitHomePage({
        options: {
          onBeforeLoad: profileTagHelper.interceptProfileTagJs,
        },
      })
      .then(() => {
        expect(navigation.requestsCount(loginAlias)).eq(0);
      });
  });
  it('should call the login endpont of EC on a successful login', () => {
    loginHelper.loginAsDefaultUser();
    cy.wait(`@${loginAlias}`).then((xhr) => {
      expect(xhr.request.headers['X-Consent-Reference']).to.eq(
        profileTagHelper.testCr
      );
    });
  });
});

function goToProductPage() {
  const productPagePath = 'ProductPage';
  const productPage = waitForPage(productPagePath, 'getProductPage');
  cy.get('.Section4 cx-banner').first().find('img').click({ force: true });
  cy.wait(`@${productPage}`).its('status').should('eq', 200);
}
