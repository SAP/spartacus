import { waitForPage } from './checkout-flow';
import { addProductFromPdp, loginRegisteredUser } from './cart';

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

export const testPaymentDetail: PaymentDetail[] = [
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

export function verifyPaymentCard(cardLength: number) {
  cy.get('.cx-payment .cx-body').then(() => {
    cy.get('cx-card').should('exist');
    cy.get('cx-card').should('have.length', cardLength);
  });
}

export function visitPaymentDetailsPage() {
  const paymentDetailPage = waitForPage(
    '/my-account/payment-details',
    'getPaymentDetail'
  );
  cy.selectUserMenuOption({ option: 'Payment Details' });
  cy.wait(`@${paymentDetailPage}`).its('response.statusCode').should('eq', 200);
}

export function addPaymentMethod(paymentDetail: PaymentDetail) {
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
            JSON.parse(localStorage.getItem('spartacus⚿⚿auth')).token
              .access_token
          }`,
        },
        body: paymentDetail,
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
}

export function testRenderEmptyPaymentDetailsPage() {
  it('should render empty payment details page', () => {
    loginRegisteredUser();
    visitPaymentDetailsPage();
    cy.get('cx-payment-methods').within(() => {
      cy.get('.cx-payment .cx-header').should('contain', 'Payment methods');
      cy.get('.cx-payment .cx-body').should(
        'contain',
        'New payment methods are added during checkout.'
      );
    });
  });
}
export function testRenderOnePaymentMethod() {
  it('should render page with only one payment methods', () => {
    addProductFromPdp();
    addPaymentMethod(testPaymentDetail[0]);
    visitPaymentDetailsPage();
    verifyPaymentCard(1);
  });
}
