import { tabbingOrderConfig as config } from '../../helpers/accessibility/b2b/tabbing-order.config';
import {
  b2bAccountShipToUser,
  b2bProduct,
  b2bUnit,
  b2bUser,
  costCenter,
  order_type,
  poNumber,
  POWERTOOLS_BASESITE,
  products,
  recurrencePeriod,
  recurrencePeriodMap,
  replenishmentDate,
  replenishmentDay,
} from '../../sample-data/b2b-checkout';
import {
  SampleCartProduct,
  SampleProduct,
  SampleUser,
  user,
} from '../../sample-data/checkout-flow';
import { verifyTabbingOrder } from '../accessibility/tabbing-order';
import {
  addCheapProductToCart,
  visitHomePage,
  waitForPage,
  waitForProductPage,
} from '../checkout-flow';
import { generateMail, randomString } from '../user';

export function loginB2bUser() {
  b2bUser.registrationData.email = generateMail(randomString(), true);
  cy.requireLoggedIn(b2bUser);
  visitHomePage();
  cy.get('.cx-login-greet').should('contain', user.fullName);
}

export function addB2bProductToCartAndCheckout() {
  const code = products[0].code;
  const productPage = waitForProductPage(code, 'getProductPage');

  cy.visit(`${POWERTOOLS_BASESITE}/en/USD/product/${code}`);
  cy.wait(`@${productPage}`).its('response.statusCode').should('eq', 200);

  cy.get('cx-product-intro').within(() => {
    cy.get('.code').should('contain', products[0].code);
  });
  cy.get('cx-breadcrumb').within(() => {
    cy.get('h1').should('contain', products[0].name);
  });

  addCheapProductToCart(products[0]);

  const paymentTypePage = waitForPage(
    '/checkout/payment-type',
    'getPaymentType'
  );
  cy.findByText(/proceed to checkout/i).click();
  cy.wait(`@${paymentTypePage}`).its('response.statusCode').should('eq', 200);
}

export function enterPONumber() {
  cy.get('cx-payment-type .cx-payment-type-container').should(
    'contain',
    'Payment method'
  );
  cy.get('cx-payment-type').within(() => {
    cy.get('.form-control').clear().type(poNumber);
  });

  // Accessibility
  verifyTabbingOrder(
    'cx-page-layout.MultiStepCheckoutSummaryPageTemplate',
    config.paymentMethod
  );
}

export function selectAccountPayment() {
  cy.get('cx-payment-type').within(() => {
    cy.findByText('Account').click({ force: true });
  });

  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/carts/*?fields=DEFAULT*`
  ).as('getCart');

  const shippingPage = waitForPage(
    '/checkout/shipping-address',
    'getShippingPage'
  );
  cy.get('button.btn-primary').click({ force: true });
  cy.wait(`@${shippingPage}`).its('response.statusCode').should('eq', 200);
  cy.wait('@getCart').its('response.statusCode').should('eq', 200);
}

export function selectCreditCardPayment() {
  cy.get('cx-payment-type').within(() => {
    cy.findByText('Credit Card').click({ force: true });
  });

  const shippingPage = waitForPage(
    '/checkout/shipping-address',
    'getShippingPage'
  );
  cy.get('button.btn-primary').click({ force: true });
  cy.wait(`@${shippingPage}`).its('response.statusCode').should('eq', 200);
}

export function selectAccountShippingAddress() {
  cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-row')
    .first()
    .find('.cx-summary-amount')
    .should('not.be.empty');

  cy.intercept(
    'PUT',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/orgUsers/current/carts/**/addresses/delivery?addressId=*`
  ).as('updateAddress');

  cy.get('cx-card').within(() => {
    cy.get('.cx-card-label-bold').should('not.be.empty');
    cy.get('.cx-card-actions .cx-card-link').click({ force: true });
  });

  cy.wait('@updateAddress').its('response.statusCode').should('eq', 200);
  cy.get('cx-card .card-header').should('contain', 'Selected');

  const deliveryPage = waitForPage(
    '/checkout/delivery-mode',
    'getDeliveryPage'
  );

  // Accessibility
  verifyTabbingOrder(
    'cx-page-layout.MultiStepCheckoutSummaryPageTemplate',
    config.shippingAddressAccount
  );

  cy.get('button.btn-primary').click();
  cy.wait(`@${deliveryPage}`).its('response.statusCode').should('eq', 200);
}

export function selectAccountDeliveryMode() {
  cy.intercept({
    method: 'PUT',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/**/deliverymode?*`,
  }).as('putDeliveryMode');

  cy.get('.cx-checkout-title').should('contain', 'Shipping Method');
  cy.get('cx-delivery-mode input').first().should('be.checked');
  const orderReview = waitForPage('/checkout/review-order', 'getReviewOrder');

  // Accessibility
  verifyTabbingOrder(
    'cx-page-layout.MultiStepCheckoutSummaryPageTemplate',
    config.deliveryMode
  );

  cy.get('.cx-checkout-btns button.btn-primary').click();

  cy.wait('@putDeliveryMode').its('response.statusCode').should('eq', 200);
  cy.wait(`@${orderReview}`, { timeout: 30000 })
    .its('response.statusCode')
    .should('eq', 200);
}

export function reviewB2bReviewOrderPage(
  sampleUser: SampleUser = b2bAccountShipToUser,
  cartData: SampleCartProduct,
  isAccount: boolean,
  orderType: string
) {
  cy.get('.cx-review-title').should('contain', 'Review');

  if (isAccount) {
    cy.get('.cx-review-summary-card')
      .contains('cx-card', 'Purchase Order Number')
      .find('.cx-card-container')
      .within(() => {
        cy.findByText(poNumber);
      });

    cy.get('.cx-review-summary-card')
      .contains('cx-card', 'Method of Payment')
      .find('.cx-card-container')
      .within(() => {
        cy.findByText('Account');
      });

    cy.get('.cx-review-summary-card')
      .contains('cx-card', 'Cost Center')
      .find('.cx-card-container')
      .within(() => {
        cy.findByText(costCenter);
        cy.findByText(`(${b2bUnit})`);
      });
  }

  cy.get('.cx-review-summary-card')
    .contains('cx-card', 'Ship To')
    .find('.cx-card-container')
    .within(() => {
      cy.findByText(sampleUser.fullName);
      cy.findByText(sampleUser.address.line1);
    });

  cy.get('.cx-review-summary-card')
    .contains('cx-card', 'Shipping Method')
    .find('.cx-card-container')
    .within(() => {
      cy.findByText('Standard Delivery');
    });

  cy.get('cx-order-summary .cx-summary-row .cx-summary-amount')
    .eq(0)
    .should('contain', cartData.total);

  cy.get('cx-order-summary .cx-summary-row .cx-summary-amount')
    .eq(1)
    .should('contain', cartData.estimatedShipping);

  cy.get('cx-order-summary .cx-summary-total .cx-summary-amount').should(
    'contain',
    cartData.totalAndShipping
  );

  cy.get('cx-schedule-replenishment-order [type="radio"]')
    .check(orderType)
    .should('be.checked');

  cy.findByText('Terms & Conditions')
    .should('have.attr', 'target', '_blank')
    .should(
      'have.attr',
      'href',
      `/${Cypress.env('BASE_SITE')}/en/USD/terms-and-conditions`
    );

  cy.get('input[formcontrolname="termsAndConditions"]').check();

  // Accessibility
  if (orderType === order_type.SCHEDULE_REPLENISHMENT) {
    verifyTabbingOrder(
      'cx-page-layout.MultiStepCheckoutSummaryPageTemplate',
      config.replenishmentOrderAccountCheckoutReviewOrder
    );
  } else {
    verifyTabbingOrder(
      'cx-page-layout.MultiStepCheckoutSummaryPageTemplate',
      isAccount ? config.checkoutReviewOrderAccount : config.checkoutReviewOrder
    );
  }
}

export function completeReplenishmentForm(replenishmentPeriod: string) {
  cy.get('cx-schedule-replenishment-order .cx-month select')
    .select(replenishmentPeriod)
    .should('have.value', replenishmentPeriod);

  if (
    replenishmentPeriod === recurrencePeriod.DAILY ||
    replenishmentPeriod === recurrencePeriod.WEEKLY
  ) {
    cy.get('cx-schedule-replenishment-order .cx-days select')
      .select(replenishmentDay)
      .should('have.value', replenishmentDay);
  }

  if (replenishmentPeriod === recurrencePeriod.WEEKLY) {
    cy.get(
      'cx-schedule-replenishment-order .cx-repeat-days-container [type="checkbox"]'
    ).check();
  }

  if (replenishmentPeriod === recurrencePeriod.MONTHLY) {
    cy.get('cx-schedule-replenishment-order .cx-day-of-month select')
      .select(replenishmentDay)
      .should('have.value', replenishmentDay);
  }

  cy.get('cx-schedule-replenishment-order .cx-replenishment-date input').type(
    `${replenishmentDate}`
  );
}

export function placeOrder(orderUrl: string) {
  const orderConfirmationPage = waitForPage(
    orderUrl,
    'getOrderConfirmationPage'
  );

  cy.get('cx-place-order button.btn-primary').click();
  // temporary solution for very slow backend response while placing order
  cy.wait(`@${orderConfirmationPage}`, { timeout: 60000 })
    .its('response.statusCode')
    .should('eq', 200);
}

export function reviewB2bOrderConfirmation(
  sampleUser: SampleUser = b2bAccountShipToUser,
  sampleProduct: SampleProduct = b2bProduct,
  cartData: SampleCartProduct,
  isAccount: boolean = true,
  replenishment?: string
) {
  cy.get('.cx-page-title').should('contain', 'Confirmation of Order');

  cy.get('h2').should('contain', 'Thank you for your order!');

  cy.get('cx-order-overview .container').within(() => {
    cy.get('.cx-summary-card:nth-child(1)').within(() => {
      cy.get('cx-card:nth-child(1)').within(() => {
        if (!replenishment) {
          cy.get('.cx-card-title').should('contain', 'Order Number');
        } else {
          cy.get('.cx-card-title').should('contain', 'Replenishment #');
        }
        cy.get('.cx-card-label').should('not.be.empty');
      });
      if (!replenishment) {
        cy.get('cx-card:nth-child(2)').within(() => {
          cy.get('.cx-card-title').should('contain', 'Placed on');
          cy.get('.cx-card-label').should('not.be.empty');
        });
        cy.get('cx-card:nth-child(3)').within(() => {
          cy.get('.cx-card-title').should('contain', 'Status');
          cy.get('.cx-card-label').should('not.be.empty');
        });
      } else {
        cy.get('cx-card:nth-child(2)').within(() => {
          cy.get('.cx-card-title').should('contain', 'Status');
          cy.get('.cx-card-label').should('not.be.empty');
        });
      }
    });

    if (!replenishment) {
      cy.get('.cx-summary-card:nth-child(2) .cx-card').within(() => {
        cy.contains(poNumber);
        if (isAccount) {
          cy.contains('Account');
          cy.contains(costCenter);
          cy.contains(`(${b2bUnit})`);
        } else {
          cy.contains('Credit Card');
        }
      });
    } else {
      cy.get('.cx-summary-card:nth-child(2) .cx-card').within(() => {
        cy.contains('Frequency');
        cy.contains(recurrencePeriodMap.get(replenishment));
      });

      cy.get('.cx-summary-card:nth-child(3) .cx-card').within(() => {
        cy.contains(poNumber);
        if (isAccount) {
          cy.contains('Account');
          cy.contains(costCenter);
          cy.contains(`(${b2bUnit})`);
        } else {
          cy.contains('Credit Card');
        }
      });
    }

    if (!replenishment) {
      cy.get('.cx-summary-card:nth-child(3) .cx-card').within(() => {
        cy.contains(sampleUser.fullName);
        cy.contains(sampleUser.address.line1);
        cy.contains('Standard Delivery');
      });
    } else {
      cy.get('.cx-summary-card:nth-child(4) .cx-card').within(() => {
        cy.contains(sampleUser.fullName);
        cy.contains(sampleUser.address.line1);
        cy.contains('Standard Delivery');
      });
    }

    if (!isAccount) {
      cy.get('.cx-summary-card:nth-child(4) .cx-card').within(() => {
        cy.contains('Payment');
        cy.contains(sampleUser.fullName);
        cy.contains(sampleUser.address.line1);
      });
    }
  });

  cy.get('cx-cart-item .cx-code').should('contain', sampleProduct.code);

  cy.get('cx-order-summary .cx-summary-amount').should(
    'contain',
    cartData.totalAndShipping
  );
}
