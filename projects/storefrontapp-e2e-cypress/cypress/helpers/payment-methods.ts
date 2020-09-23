import {
  addProductToCartViaAutoComplete,
  addProductToCartViaSearchPage,
  loginRegisteredUser,
} from './cart';
import { visitHomePage, waitForPage } from './checkout-flow';

interface PaymentDetail {
  accountHolderName: string;
  cardNumber: number;
  cardType: { code: string };
  expiryMonth: string;
  expiryYear: string;
  defaultPayment: boolean;
  saved: boolean;
  billingAddress: {
    firstName: string;
    lastName: string;
    titleCode: string;
    line1: string;
    line2?: string;
    town: string;
    postalCode: string;
    country: { isocode: string };
  };
}

const testPaymentDetail: PaymentDetail[] = [
  {
    accountHolderName: 'test user',
    cardNumber: 4111111111111111,
    cardType: { code: 'visa' },
    expiryMonth: '01',
    expiryYear: '2125',
    defaultPayment: true,
    saved: true,
    billingAddress: {
      firstName: 'test',
      lastName: 'user',
      titleCode: 'mr',
      line1: '999 de Maisonneuve',
      line2: '',
      town: 'Montreal',
      postalCode: 'H4B3L4',
      country: { isocode: 'US' },
    },
  },
  {
    accountHolderName: 'named user',
    cardNumber: 1234123412341234,
    cardType: { code: 'visa' },
    expiryMonth: '03',
    expiryYear: '2126',
    defaultPayment: false,
    saved: true,
    billingAddress: {
      firstName: 'named',
      lastName: 'user',
      titleCode: 'mr',
      line1: '999 de Maisonneuve',
      line2: '',
      town: 'Montreal',
      postalCode: 'H4B3L4',
      country: { isocode: 'US' },
    },
  },
];

export function checkAnonymous() {
  it('should redirect anonymous user to login page', () => {
    cy.visit('/my-account/payment-details');
    cy.location('pathname').should('contain', '/login');
  });
}

export function verifyText() {
  cy.get('cx-payment-methods').within(() => {
    cy.get('.cx-payment .cx-header').should('contain', 'Payment methods');
    cy.get('.cx-payment .cx-body').should(
      'contain',
      'New payment methods are added during checkout.'
    );
  });
}

export function verifyPaymentCard(cardLength: number) {
  cy.get('.cx-payment .cx-body').then(() => {
    cy.get('cx-card').should('exist');
    cy.get('cx-card').should('have.length', cardLength);
  });
}

export function setOtherPaymentToDefault() {
  cy.get('cx-payment-methods .cx-card-link')
    .getByText('Set as default')
    .click({ force: true });

  const firstCard = cy.get('.cx-payment-card').first();
  firstCard.should('contain', '✓ DEFAULT');
  firstCard.should('contain', '1234');
  firstCard.should('contain', `Expires: 03/2126`);
}

export function deletePayment() {
  cy.getAllByText('Delete').first().click({ force: true });

  // should see confirmation message
  cy.get('.cx-card-delete-msg').should(
    'contain',
    'Are you sure you want to delete this payment method?'
  );

  // click cancel
  cy.get('.btn-secondary').should('contain', 'Cancel');
  cy.get('.btn-secondary').click({ force: true });
  cy.get('.cx-card-body__delete-ms').should(
    'not.contain',
    'Are you sure you want to delete this payment method?'
  );

  // delete the payment
  cy.getAllByText('Delete').first().click({ force: true });
  cy.get('.btn-primary').should('contain', 'Delete');
  cy.get('.btn-primary').click({ force: true });
  cy.get('.cx-payment-card').should('have.length', 1);

  // verify remaining address is now the default one
  const defaultCard = cy.get('.cx-payment-card');
  defaultCard.should('contain', '✓ DEFAULT');
  defaultCard.should('contain', 'test user');
}

export function visitPaymentDetailsPage(isMobile: boolean = false) {
  const paymentDetailPage = waitForPage(
    '/my-account/payment-detail',
    'getPaymentDetail'
  );
  cy.selectUserMenuOption({
    option: 'Payment Details',
    isMobile,
  });
  cy.wait(`@${paymentDetailPage}`).its('status').should('eq', 200);
}

export function paymentMethodsTest(isMobile: boolean = false) {
  it('should visit payment details page', () => {
    loginRegisteredUser();
    visitPaymentDetailsPage(isMobile);
  });

  it('should render page with no payment methods', () => {
    verifyText();
  });

  it('should add product to cart via search', () => {
    addProductToCartViaAutoComplete(false);
  });

  it('should create a payment detail using POST request', () => {
    addPaymentMethod(testPaymentDetail[0]);
  });

  it('should render page with only one payment methods', () => {
    visitHomePage();
    visitPaymentDetailsPage(isMobile);
    verifyPaymentCard(1);
  });

  it('should add a second product via search', () => {
    addProductToCartViaSearchPage(false);
  });

  it('should add a second payment detail using POST request', () => {
    addPaymentMethod(testPaymentDetail[1]);
  });

  it('should render page with only two payment methods', () => {
    visitHomePage();
    visitPaymentDetailsPage(isMobile);
    verifyPaymentCard(2);
  });

  it('should set additional payment method as default', () => {
    setOtherPaymentToDefault();
  });

  it('should be able to delete payment method', () => {
    deletePayment();
  });
}

function addPaymentMethod(paymentDetail: PaymentDetail) {
  cy.get('.cx-total')
    .first()
    .then(($cart) => {
      const cartid = $cart.text().match(/[0-9]+/)[0];
      cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}/${Cypress.env(
          'OCC_PREFIX'
        )}/${Cypress.env(
          'BASE_SITE'
        )}/users/current/carts/${cartid}/paymentdetails`,
        headers: {
          Authorization: `bearer ${
            JSON.parse(localStorage.getItem('spartacus-local-data')).auth
              .userToken.token.access_token
          }`,
        },
        body: paymentDetail,
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
}
