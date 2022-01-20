import { user } from '../sample-data/checkout-flow';
import { switchSiteContext } from '../support/utils/switch-site-context';
import { waitForPage } from './checkout-flow';
import { waitForOrderToBePlacedRequest } from '../support/utils/order-placed';

export const LANGUAGES = 'languages';
export const CURRENCIES = 'currencies';
export const PAGES = 'pages';
export const TITLES = 'titles';
export const CART = 'cart';

export const LANGUAGE_LABEL = 'Language';
export const CURRENCY_LABEL = 'Currency';

export const BASE_URL = Cypress.config().baseUrl;
export const CONTENT_CATALOG = Cypress.env('BASE_SITE');
export const CURRENCY_USD = 'USD';
export const CURRENCY_JPY = 'JPY';
export const LANGUAGE_EN = 'en';
export const LANGUAGE_DE = 'de';
export const CART_REQUEST_ALIAS = 'cart_request_alias';

export const LANGUAGE_REQUEST = `${Cypress.env(
  'OCC_PREFIX'
)}/${CONTENT_CATALOG}/languages?lang=${LANGUAGE_EN}&curr=${CURRENCY_USD}`;
export const CURRENCY_REQUEST = `${Cypress.env(
  'OCC_PREFIX'
)}/${CONTENT_CATALOG}/currencies?lang=${LANGUAGE_EN}&curr=${CURRENCY_USD}`;

export const CART_REQUEST = `${Cypress.env(
  'OCC_PREFIX'
)}/${CONTENT_CATALOG}/users/current/carts/*`;

export const PAGE_REQUEST = `${Cypress.env(
  'OCC_PREFIX'
)}/${CONTENT_CATALOG}/cms/pages?fields=DEFAULT&pageType=CategoryPage&code=574&lang=${LANGUAGE_DE}&curr=${CURRENCY_USD}`;

export const TITLE_REQUEST = `${Cypress.env(
  'OCC_PREFIX'
)}/${CONTENT_CATALOG}/titles?lang=${LANGUAGE_EN}&curr=${CURRENCY_USD}`;

export const FULL_BASE_URL_EN_USD = `${BASE_URL}/${CONTENT_CATALOG}/${LANGUAGE_EN}/${CURRENCY_USD}`;
export const FULL_BASE_URL_EN_JPY = `${BASE_URL}/${CONTENT_CATALOG}/${LANGUAGE_EN}/${CURRENCY_JPY}`;
export const FULL_BASE_URL_DE_USD = `${BASE_URL}/${CONTENT_CATALOG}/${LANGUAGE_DE}/${CURRENCY_USD}`;

const PRODUCT_ID_1 = '280916';
const PRODUCT_ID_2 = '1687508';
export const PRODUCT_NAME_CART_DE = 'Digitalkamera';
export const PRODUCT_NAME_DETAILS_DE = 'Stativ mit Fernbedienung';
export const PRODUCT_NAME_SEARCH_DE =
  'FUN Einwegkamera mit Blitz, 27+12 Bilder';
export const TITLE_DE = 'Herr';
export const MONTH_DE = new Date().toLocaleDateString('de-DE', {
  month: 'long',
});

export const PRODUCT_PATH_1 = `/product/${PRODUCT_ID_1}`;
export const PRODUCT_PATH_2 = `/product/${PRODUCT_ID_2}`;
export const CART_PATH = '/cart';
const myAccount = 'my-account';
export const ADDRESS_BOOK_PATH = `/${myAccount}/address-book`;
export const CLOSE_ACCOUNT_PATH = `/${myAccount}/close-account`;
export const CONSENT_MANAGEMENT_PATH = `/${myAccount}/consents`;
export const ORDER_PATH = `/${myAccount}/orders`;
export const PAYMENT_DETAILS_PATH = `/${myAccount}/payment-details`;
export const PERSONAL_DETAILS_PATH = `/${myAccount}/update-profile`;
export const UPDATE_EMAIL_PATH = `/${myAccount}/update-email`;
export const UPDATE_PASSWORD_PATH = `/${myAccount}/update-password`;
export const PRODUCT_SEARCH_PATH =
  '/Open-Catalogue/Cameras/Film-Cameras/c/574?pageSize=10&categoryCode=574&query=:relevance:category:574';
export const REGISTRATION_PATH = '/login/register';
export const CHECKOUT_SHIPPING_ADDRESS_PATH = '/checkout/shipping-address';
export const CHECKOUT_DELIVERY_MODE_PATH = '/checkout/delivery-mode';
export const CHECKOUT_PAYMENT_DETAILS_PATH = '/checkout/payment-details';
export const CHECKOUT_REVIEW_ORDER_PATH = '/checkout/review-order';

export function doPlaceOrder() {
  cy.window().then((win) => {
    const savedState = JSON.parse(win.localStorage.getItem('spartacus⚿⚿auth'));
    cy.requireProductAddedToCart(savedState.token).then((resp) => {
      cy.requireShippingAddressAdded(user.address, savedState.token);
      cy.requireShippingMethodSelected(savedState.token);
      cy.requirePaymentDone(savedState.token);
      cy.requirePlacedOrder(savedState.token, resp.cartId);
    });
  });
}

export function addressBookNextStep() {
  cy.get('cx-shipping-address .link').click({ force: true });

  const deliveryPage = waitForPage(
    CHECKOUT_DELIVERY_MODE_PATH,
    'getDeliveryPage'
  );

  cy.get('cx-shipping-address .btn-primary').click();

  cy.wait(`@${deliveryPage}`).its('response.statusCode').should('eq', 200);
}

export function deliveryModeNextStep() {
  cy.get('cx-delivery-mode input').first().click({
    force: true,
  });

  const paymentPage = waitForPage(
    CHECKOUT_PAYMENT_DETAILS_PATH,
    'getPaymentPage'
  );

  cy.get('cx-delivery-mode .btn-primary').click();

  cy.wait(`@${paymentPage}`).its('response.statusCode').should('eq', 200);
}

export function paymentDetailsNextStep() {
  cy.get('cx-payment-method .link').click({
    force: true,
  });

  const reviewPage = waitForPage(CHECKOUT_REVIEW_ORDER_PATH, 'getReviewPage');

  cy.get('cx-payment-method .btn-primary').click();

  cy.wait(`@${reviewPage}`).its('response.statusCode').should('eq', 200);
}

export function stub(request: string, alias: string): void {
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.intercept(request).as(alias);
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
}

export function assertSiteContextChange(testPath: string): void {
  cy.url().should('eq', testPath);
}

export function siteContextChange(
  pagePath: string,
  alias: string,
  selectedOption: string,
  label: string
): void {
  if (pagePath !== null) {
    let page = waitForPage(pagePath, 'pageForSitContextChange');
    if (
      pagePath.startsWith('/product') ||
      pagePath.startsWith('/Open-Catalogue')
    ) {
      page = waitForPage('', 'pageForSitContextChange');
    }
    cy.visit(FULL_BASE_URL_EN_USD + pagePath);
    cy.wait(`@${page}`).its('response.statusCode').should('eq', 200);
  }

  let contextParam: string;

  switch (label) {
    case LANGUAGE_LABEL: {
      contextParam = 'lang';
      break;
    }
    case CURRENCY_LABEL: {
      contextParam = 'curr';
      break;
    }
    default: {
      throw new Error(`Unsupported context label : ${label}`);
    }
  }
  cy.wait(`@${alias}`);

  cy.intercept({
    method: 'GET',
    query: {
      [contextParam]: selectedOption,
    },
  }).as('switchedContext');
  switchSiteContext(selectedOption, label);
  cy.wait('@switchedContext').its('response.statusCode').should('eq', 200);
}

export function verifySiteContextChangeUrl(
  pagePath: string,
  alias: string,
  selectedOption: string,
  label: string,
  testPath: string
): void {
  siteContextChange(pagePath, alias, selectedOption, label);
  assertSiteContextChange(testPath);
}

export function testLangSwitchOrderPage() {
  describe('order page', () => {
    const orderPath = ORDER_PATH;
    const deutschName = MONTH_DE;

    before(() => {
      doPlaceOrder();
      waitForOrderToBePlacedRequest();
    });

    it('should change language in the url', () => {
      verifySiteContextChangeUrl(
        orderPath,
        LANGUAGES,
        LANGUAGE_DE,
        LANGUAGE_LABEL,
        FULL_BASE_URL_DE_USD + orderPath
      );
    });

    it('should change language in the page', () => {
      siteContextChange(orderPath, LANGUAGES, LANGUAGE_DE, LANGUAGE_LABEL);

      cy.get(
        'cx-order-history .cx-order-history-placed .cx-order-history-value'
      ).should('contain', deutschName);
    });
  });
}

export function testPersonalDetailsPage() {
  describe('personal details page', () => {
    const personalDetailsPath = PERSONAL_DETAILS_PATH;
    const deutschName = TITLE_DE;

    it('should change language in the url', () => {
      verifySiteContextChangeUrl(
        personalDetailsPath,
        LANGUAGES,
        LANGUAGE_DE,
        LANGUAGE_LABEL,
        FULL_BASE_URL_DE_USD + personalDetailsPath
      );
    });

    it('should change language in the page', () => {
      siteContextChange(
        personalDetailsPath,
        TITLES,
        LANGUAGE_DE,
        LANGUAGE_LABEL
      );

      cy.get('cx-update-profile form select')
        .select(deutschName)
        .should('have.value', 'mr');
    });
  });
}
