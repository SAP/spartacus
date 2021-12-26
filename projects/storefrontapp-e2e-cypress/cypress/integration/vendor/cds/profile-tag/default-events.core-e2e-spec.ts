import * as anonymousConsents from '../../../../helpers/anonymous-consents';
import * as checkoutFlowPersistentUser from '../../../../helpers/checkout-as-persistent-user';
import * as checkoutFlow from '../../../../helpers/checkout-flow';
import * as loginHelper from '../../../../helpers/login';
import { navigation } from '../../../../helpers/navigation';
import * as productSearch from '../../../../helpers/product-search';
import {
  createProductQuery,
  QUERY_ALIAS,
} from '../../../../helpers/product-search';
import {
  cdsHelper,
  strategyRequestAlias,
} from '../../../../helpers/vendor/cds/cds';
import { profileTagHelper } from '../../../../helpers/vendor/cds/profile-tag';

describe('Profile-tag events', () => {
  beforeEach(() => {
    cdsHelper.setUpMocks(strategyRequestAlias);
    navigation.visitHomePage({
      options: {
        onBeforeLoad: profileTagHelper.interceptProfileTagJs,
      },
    });
    profileTagHelper.waitForCMSComponents();
    anonymousConsents.clickAllowAllFromBanner();
  });
  describe('cart events', () => {
    it('should send a AddedToCart event on adding an item to cart', () => {
      goToProductPage();
      cy.get('cx-add-to-cart button.btn-primary').click();
      cy.get('cx-added-to-cart-dialog .btn-primary');
      cy.window().then((win) => {
        expect(
          profileTagHelper.eventCount(
            win,
            profileTagHelper.EventNames.ADDED_TO_CART
          )
        ).to.equal(1);
        const addedToCartEvent = profileTagHelper.getEvent(
          win,
          profileTagHelper.EventNames.ADDED_TO_CART
        )[0];
        expect(addedToCartEvent.data.productQty).to.eq(1);
        expect(addedToCartEvent.data.productSku).to.eq('280916');
        expect(addedToCartEvent.data.categories).to.contain('577');
        expect(addedToCartEvent.data.categories).to.contain('brand_745');
        expect(addedToCartEvent.data.productCategory).to.eq('brand_745');
        expect(addedToCartEvent.data.productPrice).to.eq(8.2);
        expect(addedToCartEvent.data.cartId.length).to.eq(36);
        expect(addedToCartEvent.data.cartCode.length).to.eq(8);
      });
    });

    it('should send a CartModified event on modifying the cart', () => {
      goToProductPage();
      cy.intercept({
        method: 'GET',
        path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/users/anonymous/carts/*`,
      }).as('getRefreshedCart');
      cy.get('cx-add-to-cart button.btn-primary').click();
      cy.get('cx-added-to-cart-dialog .btn-primary').click();
      cy.wait(500);
      cy.get('cx-cart-item cx-item-counter')
        .get(`[aria-label="Add one more"]`)
        .first()
        .click();
      cy.wait('@getRefreshedCart');
      cy.wait(1500);
      cy.window().then((win) => {
        expect(
          profileTagHelper.eventCount(
            win,
            profileTagHelper.EventNames.MODIFIED_CART
          )
        ).to.equal(1);
        const modifiedCart = profileTagHelper.getEvent(
          win,
          profileTagHelper.EventNames.MODIFIED_CART
        )[0];
        expect(modifiedCart.data.productQty).to.eq(2);
        expect(modifiedCart.data.productSku).to.eq('280916');
        expect(modifiedCart.data.categories).to.contain('577');
        expect(modifiedCart.data.categories).to.contain('brand_745');
        expect(modifiedCart.data.productCategory).to.eq('brand_745');
        expect(modifiedCart.data.cartId.length).to.eq(36);
        expect(modifiedCart.data.cartCode.length).to.eq(8);
      });
    });

    it('should send a RemovedFromCart event on removing an item from the cart', () => {
      goToProductPage();
      cy.get('cx-add-to-cart button.btn-primary').click();
      cy.get('cx-added-to-cart-dialog .btn-primary').click();
      cy.get('cx-cart-item-list').get('.cx-remove-btn > .link').first().click();
      cy.intercept({
        method: 'GET',
        path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/users/anonymous/carts/*`,
      }).as('getRefreshedCart');
      cy.wait('@getRefreshedCart');
      cy.window().then((win) => {
        expect(
          profileTagHelper.eventCount(
            win,
            profileTagHelper.EventNames.REMOVED_FROM_CART
          )
        ).to.equal(1);
        const removedFromCart = profileTagHelper.getEvent(
          win,
          profileTagHelper.EventNames.REMOVED_FROM_CART
        )[0];
        expect(removedFromCart.data.productSku).to.eq('280916');
        expect(removedFromCart.data.categories).to.contain('577');
        expect(removedFromCart.data.categories).to.contain('brand_745');
        expect(removedFromCart.data.productCategory).to.eq('brand_745');
        expect(removedFromCart.data.cartId.length).to.eq(36);
        expect(removedFromCart.data.cartCode.length).to.eq(8);
      });
    });
  });

  it('should send a product detail page view event when viewing a product', () => {
    cy.intercept({ method: 'GET', path: `**reviews*` }).as('lastRequest');
    const productSku = 280916;
    const productName = 'Web Camera (100KpixelM CMOS, 640X480, USB 1.1) Black';
    const productPrice = 8.2;
    const productCategory = 'brand_745';
    const productCategoryName = 'Canyon';
    goToProductPage();
    cy.wait('@lastRequest');
    cy.window().then((win) => {
      expect(
        profileTagHelper.eventCount(
          win,
          profileTagHelper.EventNames.PRODUCT_DETAILS_PAGE_VIEWED
        )
      ).to.equal(1);
      const productViewedEvent = profileTagHelper.getEvent(
        win,
        profileTagHelper.EventNames.PRODUCT_DETAILS_PAGE_VIEWED
      )[0];
      expect(productViewedEvent.data.productSku).to.equal(`${productSku}`);
      expect(productViewedEvent.data.productName).to.equal(productName);
      expect(productViewedEvent.data.productPrice).to.equal(productPrice);
      expect(productViewedEvent.data.productCategory).to.equal(productCategory);
      expect(productViewedEvent.data.productCategoryName).to.equal(
        productCategoryName
      );
    });
  });

  it('should send a search page view event when viewing a search page', () => {
    createProductQuery(QUERY_ALIAS.CAMERA, 'camera', 12);
    cy.get('cx-searchbox input').type('camera{enter}');
    cy.wait(`@${QUERY_ALIAS.CAMERA}`);
    profileTagHelper.waitForCMSComponents();
    cy.window().then((win) => {
      expect(
        profileTagHelper.eventCount(
          win,
          profileTagHelper.EventNames.KEYWORD_SEARCH
        )
      ).to.equal(1);
      const keywordSearchEvent = profileTagHelper.getEvent(
        win,
        profileTagHelper.EventNames.KEYWORD_SEARCH
      )[0];
      expect(keywordSearchEvent.data.numResults).to.equal(145);
      expect(keywordSearchEvent.data.searchTerm).to.equal('camera');
    });
  });

  it('should send a CartPageViewed event when viewing the cart page', () => {
    goToProductPage();
    cy.get('cx-add-to-cart button.btn-primary').click();
    cy.get('cx-added-to-cart-dialog .btn-primary').click();
    cy.location('pathname', { timeout: 10000 }).should(
      'include',
      `/electronics-spa/en/USD/cart`
    );
    cy.window().then((win) => {
      expect(
        profileTagHelper.eventCount(
          win,
          profileTagHelper.EventNames.CART_PAGE_VIEWED
        )
      ).to.equal(1);
    });
  });

  it('should send an OrderConfirmation event when viewing the order confirmation page', () => {
    loginHelper.loginAsDefaultUser();
    checkoutFlowPersistentUser.goToProductPageFromCategory();
    checkoutFlowPersistentUser.addProductToCart();
    checkoutFlowPersistentUser.addPaymentMethod();
    cy.wait(0).then(() => {
      checkoutFlowPersistentUser.addShippingAddress();
    });
    checkoutFlowPersistentUser.selectShippingAddress();
    checkoutFlowPersistentUser.selectDeliveryMethod();
    checkoutFlowPersistentUser.selectPaymentMethod();
    cy.location('pathname', { timeout: 10000 }).should(
      'include',
      `checkout/review-order`
    );
    checkoutFlowPersistentUser.verifyAndPlaceOrder();
    cy.location('pathname', { timeout: 10000 }).should(
      'include',
      `order-confirmation`
    );
    cy.window().then((win) => {
      expect(
        profileTagHelper.eventCount(
          win,
          profileTagHelper.EventNames.ORDER_CONFIRMATION_PAGE_VIEWED
        )
      ).to.equal(1);
    });
  });

  it('should send a Category View event when a Category View occurs', () => {
    cy.intercept({ method: 'GET', path: `**/products/search**` }).as(
      'lastRequest'
    );
    const productCategory = '575';
    const productCategoryName = 'Digital Cameras';
    cy.get('cx-category-navigation cx-generic-link a')
      .contains('Cameras')
      .click({ force: true });
    cy.location('pathname', { timeout: 10000 }).should('include', `c/575`);
    cy.wait('@lastRequest');
    cy.window().then((win) => {
      expect(
        profileTagHelper.eventCount(
          win,
          profileTagHelper.EventNames.CATEGORY_PAGE_VIEWED
        )
      ).to.equal(1);
      const categoryViewedEvent = profileTagHelper.getEvent(
        win,
        profileTagHelper.EventNames.CATEGORY_PAGE_VIEWED
      )[0];
      expect(categoryViewedEvent.data.productCategory).to.equal(
        productCategory
      );
      expect(categoryViewedEvent.data.productCategoryName).to.equal(
        productCategoryName
      );
    });
  });

  it('should send 2 Category Views event when going to a Category, going to a different page type, and then back to the same category', () => {
    cy.intercept({ method: 'GET', path: `**/products/search**` }).as(
      'lastRequest'
    );
    createProductQuery(QUERY_ALIAS.CAMERA, 'camera', 12);
    cy.get('cx-category-navigation cx-generic-link a')
      .contains('Cameras')
      .click({ force: true });
    cy.location('pathname', { timeout: 10000 }).should('include', `c/575`);
    cy.wait('@lastRequest');
    cy.window().then((win) => {
      expect(
        profileTagHelper.eventCount(
          win,
          profileTagHelper.EventNames.CATEGORY_PAGE_VIEWED
        )
      ).to.equal(1);
    });
    cy.get('cx-searchbox input').type('camera{enter}');
    cy.wait(`@${QUERY_ALIAS.CAMERA}`);

    cy.intercept({ method: 'GET', path: `**/products/search**` }).as(
      'lastRequest2'
    ); //waiting for the same request a 2nd time doesn't work
    cy.get('cx-category-navigation cx-generic-link a')
      .contains('Cameras')
      .click({ force: true });
    cy.location('pathname', { timeout: 10000 }).should('include', `c/575`);
    cy.wait('@lastRequest2');
    cy.window().then((win2) => {
      expect(
        profileTagHelper.eventCount(
          win2,
          profileTagHelper.EventNames.CATEGORY_PAGE_VIEWED
        )
      ).to.equal(2);
    });
  });

  it('should send 1 Category View event when going to a Category and clicking a facet', () => {
    cy.intercept({ method: 'GET', path: `**/products/search**` }).as(
      'lastRequest'
    );

    cy.get('cx-category-navigation cx-generic-link a')
      .contains('Cameras')
      .click({ force: true });
    cy.location('pathname', { timeout: 10000 }).should('include', `c/575`);
    cy.wait('@lastRequest');
    cy.window().then((win) => {
      expect(
        profileTagHelper.eventCount(
          win,
          profileTagHelper.EventNames.CATEGORY_PAGE_VIEWED
        )
      ).to.equal(1);
    });
    productSearch.clickFacet('Stores');

    cy.window().then((win2) => {
      expect(
        profileTagHelper.eventCount(
          win2,
          profileTagHelper.EventNames.CATEGORY_PAGE_VIEWED
        )
      ).to.equal(1);
    });
  });

  it('should send a Navigated event when a navigation to product page occurs', () => {
    goToProductPage();
    cy.get('cx-add-to-cart button.btn-primary').click();
    cy.window().then((win) => {
      expect(
        profileTagHelper.eventCount(win, profileTagHelper.EventNames.NAVIGATED)
      ).to.equal(1);
    });
  });

  it('should not send a Navigated event when merchandising banner is clicked', () => {
    const categoryPage = checkoutFlow.waitForCategoryPage('578', 'getCategory');
    cy.get(
      'cx-page-slot cx-banner img[alt="Save Big On Select SLR & DSLR Cameras"]'
    ).click();
    cy.wait(`@${categoryPage}`).its('response.statusCode').should('eq', 200);
    cy.window().then((win) => {
      expect(
        profileTagHelper.eventCount(win, profileTagHelper.EventNames.NAVIGATED)
      ).to.equal(0);
    });
  });
});

// For some reason these two events interfere with eachother. Only 1 needs to click the allow all banner
// and the next will then have consent granted
describe('Consent Changed', () => {
  beforeEach(() => {
    cdsHelper.setUpMocks(strategyRequestAlias);
    navigation.visitHomePage({
      options: {
        onBeforeLoad: profileTagHelper.interceptProfileTagJs,
      },
    });
    profileTagHelper.waitForCMSComponents();
  });
  it('should send a consentGranted = false before accepting consent, and a consentGranted=true after accepting', () => {
    cy.wait(2000);
    cy.window()
      .then((win) => {
        expect(
          profileTagHelper.eventCount(
            win,
            profileTagHelper.EventNames.CONSENT_CHANGED
          )
        ).to.equal(1);
        const consentRejected = profileTagHelper.getEvent(
          win,
          profileTagHelper.EventNames.CONSENT_CHANGED
        )[0];
        expect(consentRejected.data.granted).to.eq(false);
      })
      .then(() => {
        anonymousConsents.clickAllowAllFromBanner();
      });
    cy.window().then((win) => {
      expect(
        profileTagHelper.eventCount(
          win,
          profileTagHelper.EventNames.CONSENT_CHANGED
        )
      ).to.equal(2);
      const consentAccepted = profileTagHelper.getEvent(
        win,
        profileTagHelper.EventNames.CONSENT_CHANGED
      )[1];
      expect(consentAccepted.data.granted).to.eq(true);
    });
  });

  it('should not send a consentgranted=false event on a page refresh', () => {
    anonymousConsents.clickAllowAllFromBanner();
    cy.reload();
    cy.window().then((win) => {
      const consentAccepted = profileTagHelper.getEvent(
        win,
        profileTagHelper.EventNames.CONSENT_CHANGED
      );
      expect(consentAccepted.length).to.equal(1);
      expect(consentAccepted[0].data.granted).to.eq(true);
    });
  });
  it('should send a HomePageViewed event when viewing the homepage', () => {
    anonymousConsents.clickAllowAllFromBanner();
    cy.reload();
    profileTagHelper.waitForCMSComponents().then(() => {
      cy.window().then((win) => {
        expect(
          profileTagHelper.eventCount(
            win,
            profileTagHelper.EventNames.HOME_PAGE_VIEWED
          )
        ).to.equal(1);
      });
    });
  });
});

describe('verifying X-Consent-Reference header addition to occ calls', () => {
  const X_CONSENT_REFERENCE_HEADER = 'x-consent-reference';
  let productPage;

  beforeEach(() => {
    cdsHelper.setUpMocks(strategyRequestAlias);
    navigation.visitHomePage({
      options: {
        onBeforeLoad: profileTagHelper.interceptProfileTagJs,
      },
    });
    profileTagHelper.waitForCMSComponents();
    productPage = checkoutFlow.waitForProductPage('280916', 'getProductPage');
  });

  it('should not send CR header when consent is not granted initially', () => {
    cy.get('.Section4 cx-banner').first().find('img').click({ force: true });
    cy.wait(`@${productPage}`)
      .its('request.headers')
      .should('not.have.deep.property', X_CONSENT_REFERENCE_HEADER);
  });

  it('should send CR header when consent is granted and skip it once its revoked', () => {
    // grant consent
    anonymousConsents.clickAllowAllFromBanner();
    profileTagHelper.triggerLoaded();
    profileTagHelper.triggerConsentReferenceLoaded();
    cy.window().then((win) => {
      const consentAccepted = profileTagHelper.getEvent(
        win,
        profileTagHelper.EventNames.CONSENT_CHANGED
      );
      expect(consentAccepted.length).to.equal(2);
      expect(consentAccepted[1].data.granted).to.eq(true);
    });
    cy.get('.Section4 cx-banner').first().find('img').click({ force: true });
    cy.wait(`@${productPage}`)
      .its('request.headers')
      .should('have.deep.property', X_CONSENT_REFERENCE_HEADER);
    // withdraw consent
    cy.get('button.btn.btn-link').contains('Consent Preferences').click();
    cy.get('input.form-check-input').uncheck();
    cy.get('button.close').click();
    navigation.visitHomePage({
      options: {
        onBeforeLoad: profileTagHelper.interceptProfileTagJs,
      },
    });
    cy.get('.Section4 cx-banner').first().find('img').click({ force: true });
    cy.wait(`@${productPage}`)
      .its('request.headers')
      .should('not.have.deep.property', X_CONSENT_REFERENCE_HEADER);
  });
});

function goToProductPage(): Cypress.Chainable<number> {
  const productCode = '280916';
  const productPage = checkoutFlow.waitForProductPage(
    productCode,
    'getProductPage'
  );
  cy.get('.Section4 cx-banner').first().find('img').click({ force: true });
  return cy
    .wait(`@${productPage}`)
    .its('response.statusCode')
    .should('eq', 200);
}
