import * as anonymousConsents from '../../../helpers/anonymous-consents';
import { waitForPage } from '../../../helpers/checkout-flow';
import { navigation } from '../../../helpers/navigation';
import { cdsHelper } from '../../../helpers/vendor/cds/cds';
import { profileTagHelper } from '../../../helpers/vendor/cds/profile-tag';
describe('Profile-tag events', () => {
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
    cy.wait(`@${homePage}`).its('status').should('eq', 200);
  });
  it('should send a CartChanged event on adding an item to cart', () => {
    goToProductPage();
    cy.get('cx-add-to-cart button.btn-primary').click();
    cy.get('cx-added-to-cart-dialog .btn-primary');
    cy.window().then((win) => {
      expect((<any>win).Y_TRACKING.eventLayer.length).to.equal(2);
      expect((<any>win).Y_TRACKING.eventLayer[1]['name']).to.equal(
        'CartSnapshot'
      );
      const cartPayload = JSON.stringify(
        (<any>win).Y_TRACKING.eventLayer[1]['data']
      );
      expect(cartPayload).to.include('cart');
      expect(cartPayload).to.include('code');
    });
  });
  it('should send an additional CartChanged event on modifying the cart', () => {
    goToProductPage();
    cy.get('cx-add-to-cart button.btn-primary').click();
    cy.get('cx-added-to-cart-dialog .btn-primary').click();
    cy.get('cx-cart-item cx-item-counter').getByText('+').click();
    cy.route(
      'GET',
      `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/anonymous/carts/*`
    ).as('getRefreshedCart');
    cy.wait('@getRefreshedCart');
    cy.window().then((win) => {
      expect((<any>win).Y_TRACKING.eventLayer.length).to.equal(4);
      expect(
        (<any>win).Y_TRACKING.eventLayer.filter(
          (event) => event.name === 'CartSnapshot'
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
      expect((<any>win).Y_TRACKING.eventLayer.length).to.equal(4);
      expect(
        (<any>win).Y_TRACKING.eventLayer.filter(
          (event) => event.name === 'CartSnapshot'
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

function goToProductPage() {
  const productPagePath = 'ProductPage';
  const productPage = waitForPage(productPagePath, 'getProductPage');
  cy.get('.Section4 cx-banner').first().find('img').click({ force: true });
  cy.wait(`@${productPage}`).its('status').should('eq', 200);
}
