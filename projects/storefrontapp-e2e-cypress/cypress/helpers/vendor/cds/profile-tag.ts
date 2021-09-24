import { clickAllowAllFromBanner } from '../../../helpers/anonymous-consents';

enum EventNames {
  KEYWORD_SEARCH = 'KeywordSearch',
  CART_SNAPSHOT = 'CartSnapshot',
  HOME_PAGE_VIEWED = 'HomePageViewed',
  PRODUCT_DETAILS_PAGE_VIEWED = 'ProductDetailsPageViewed',
  NAVIGATED = 'Navigated',
  CONSENT_CHANGED = 'ConsentChanged',
  CATEGORY_PAGE_VIEWED = 'CategoryPageViewed',
  CART_PAGE_VIEWED = 'CartPageViewed',
  ORDER_CONFIRMATION_PAGE_VIEWED = 'OrderConfirmationPageViewed',
  ADDED_TO_CART = 'AddedToCart',
  REMOVED_FROM_CART = 'RemovedFromCart',
  MODIFIED_CART = 'ModifiedCart',
}

export const profileTagHelper = {
  EventNames: EventNames,
  interceptProfileTagJs(contentWindow) {
    const oldAppendChild = contentWindow.document.head.appendChild;
    contentWindow.document.head.appendChild = function (newChild) {
      if (
        newChild &&
        (<HTMLScriptElement>(<any>newChild)).src &&
        (<HTMLScriptElement>(<any>newChild)).src.indexOf('profile-tag') !== -1
      ) {
        return newChild;
      }
      return oldAppendChild.call(this, newChild);
    };
  },
  triggerLoaded() {
    cy.window().then((win) => {
      const event = new CustomEvent('profiletag_loaded');
      win.dispatchEvent(event);
    });
  },
  triggerConsentReferenceLoaded() {
    cy.window().then((win) => {
      const event = new CustomEvent('profiletag_consentReferenceLoaded', {
        detail: { consentReference: profileTagHelper.testCr },
      });
      win.dispatchEvent(event);
    });
  },
  waitForCMSComponents(): Cypress.Chainable {
    return cy.get('cx-profiletag');
  },
  testCr: '123-1bc',
  profileTagScriptResponse: {},

  grantConsent() {
    cy.intercept({ method: 'POST', path: '/consent/*/consentReferences' }).as(
      'consentReferenceCreation'
    );
    clickAllowAllFromBanner();
    cy.wait('@consentReferenceCreation')
      .its('response.statusCode')
      .should('eq', 201);
  },
  getEvent(window: any, eventName: EventNames): any[] {
    return window.Y_TRACKING.eventLayer.filter(
      (event) => event.name === eventName
    );
  },
  eventCount(window: any, eventName: EventNames): number {
    return profileTagHelper.getEvent(window, eventName).length;
  },
};
