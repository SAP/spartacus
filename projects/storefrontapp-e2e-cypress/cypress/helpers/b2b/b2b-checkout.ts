/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { tabbingOrderConfig as config } from '../../helpers/accessibility/b2b/tabbing-order.config';
import {
  b2bAccountShipToUser,
  b2bDeliveryAddress,
  b2bDeliveryAddressStub,
  b2bDeliveryModeStub,
  b2bProduct,
  b2bUnit,
  b2bUser,
  cartWithB2bProductAndPremiumShipping,
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
  getSampleUser,
  SampleCartProduct,
  SampleProduct,
  SampleUser,
} from '../../sample-data/checkout-flow';
import { myCompanyAdminUser } from '../../sample-data/shared-users';
import { login } from '../../support/utils/login';
import { verifyTabbingOrder } from '../accessibility/tabbing-order';
import { TabbingOrderConfig } from '../accessibility/tabbing-order.model';
import {
  addCheapProductToCart,
  verifyReviewOrderPage,
  visitHomePage,
  waitForPage,
  waitForProductPage,
} from '../checkout-flow';

export function loginB2bUser() {
  let adminToken;
  let user = getSampleUser();

  login(
    myCompanyAdminUser.registrationData.email,
    myCompanyAdminUser.registrationData.password
  )
    .then((result) => {
      expect(result.status).to.eq(200);
      adminToken = result?.body?.access_token;
      return addB2bUser(adminToken, user);
    })
    .then((result) => {
      expect(result.status).to.eq(201);
      return setB2bPassword(result.body.customerId, user.password, adminToken);
    })
    .then((result: any) => {
      expect(result.status).to.eq(204);
      b2bUser.registrationData.email = user.email;
      b2bUser.registrationData.password = user.password;

      return cy.requireLoggedIn(b2bUser);
    })
    .then(() => {
      visitHomePage();
      cy.get('.cx-login-greet').should('contain', user.fullName);
    });
}

function addB2bUser(access_token: string, user: any) {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orgCustomers?lang=en&curr=USD`,
    headers: {
      Authorization: `bearer ${access_token}`,
    },
    body: {
      titleCode: 'mr',
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      orgUnit: {
        uid: b2bUnit,
      },
      roles: ['b2bcustomergroup'],
    },
  });
}

function setB2bPassword(
  customerId: string,
  password: string,
  access_token: string
) {
  return cy.request({
    method: 'PATCH',
    url: `${Cypress.env('API_URL')}/${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orgCustomers/${customerId}?lang=en&curr=USD`,
    headers: {
      Authorization: `bearer ${access_token}`,
    },
    body: {
      customerId,
      password,
      confirmPassword: password,
    },
  });
}

export function addB2bProductToCartAndCheckout() {
  const code = products[0].code;
  const productPage = waitForProductPage(code, 'getProductPage');
  const getPaymentTypes = interceptPaymentTypesEndpoint();

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
  cy.wait(`@${getPaymentTypes}`).its('response.statusCode').should('eq', 200);
}

export function addB2bProductToCart() {
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
}

export function enterPONumber(poNum: string = poNumber) {
  cy.get('cx-payment-type .cx-payment-type-container').should(
    'contain',
    'Payment method'
  );

  cy.get('cx-payment-type').within(() => {
    cy.get('.form-control').clear().type(poNum);
  });

  // Accessibility
  verifyTabbingOrder(
    'cx-page-layout.MultiStepCheckoutSummaryPageTemplate',
    config.paymentMethod
  );
}

export function selectAccountPayment() {
  const getCostCenters = interceptCostCenterEndpoint();

  cy.get('cx-payment-type').within(() => {
    cy.findByText('Account').click({ force: true });
  });

  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/carts/*?fields=DEFAULT*`
  ).as('getCart');
  const deliveryAddressPage = waitForPage(
    '/checkout/delivery-address',
    'getDeliveryPage'
  );
  cy.get('button.btn-primary').should('be.enabled').click({ force: true });
  cy.wait(`@${deliveryAddressPage}`)
    .its('response.statusCode')
    .should('eq', 200);

  cy.wait('@getCart').its('response.statusCode').should('eq', 200);

  // intercept costCenter list to get Rustic address Id which will be use in delivery addr/mode stubs
  cy.wait(`@${getCostCenters}`).then((xhr) => {
    if (
      !b2bDeliveryAddress.id &&
      xhr?.response?.body?.costCenters[0].unit.addresses[0].id
    ) {
      // first element of Cost Center is the default one, always match the combo-box selection
      b2bDeliveryAddress.id =
        xhr.response.body.costCenters[0].unit.addresses[0].id;
    }
  });
}

export function selectCreditCardPayment() {
  cy.get('cx-payment-type').within(() => {
    cy.findByText('Credit Card').click({ force: true });
  });

  const deliveryAddressPage = waitForPage(
    '/checkout/delivery-address',
    'getDeliveryPage'
  );
  cy.get('button.btn-primary').click({ force: true });
  cy.wait(`@${deliveryAddressPage}`)
    .its('response.statusCode')
    .should('eq', 200);
}

export function selectAccountShippingAddress() {
  const getCheckoutDetails = interceptCheckoutB2BDetailsEndpoint(
    b2bDeliveryAddressStub,
    b2bDeliveryAddress.id
  );
  const putDeliveryMode = interceptPutDeliveryModeEndpoint();

  cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-row')
    .first()
    .find('.cx-summary-amount')
    .should('not.be.empty');

  cy.wait(`@${getCheckoutDetails}`)
    .its('response.statusCode')
    .should('eq', 200);

  cy.get('cx-card').within(() => {
    cy.get('.cx-card-label-bold').should('not.be.empty');
  });

  cy.get('cx-card .card-header').should('contain', 'Selected');

  /**
   * Delivery mode PUT intercept is not in selectAccountDeliveryMode()
   * because it doesn't choose a delivery mode and the intercept might have missed timing depending on cypress's performance
   */

  const deliveryPage = waitForPage(
    '/checkout/delivery-mode',
    'getDeliveryPage'
  );

  // Accessibility
  verifyTabbingOrder(
    'cx-page-layout.MultiStepCheckoutSummaryPageTemplate',
    config.shippingAddressAccount
  );

  cy.get('button.btn-primary').should('be.enabled').click();
  cy.wait(`@${deliveryPage}`).its('response.statusCode').should('eq', 200);
  cy.wait(`@${putDeliveryMode}`).its('response.statusCode').should('eq', 200);

  cy.wait(`@${getCheckoutDetails}`)
    .its('response.statusCode')
    .should('eq', 200);
}

export function selectAccountDeliveryMode() {
  const getCheckoutDetails = interceptCheckoutB2BDetailsEndpoint(
    b2bDeliveryModeStub,
    b2bDeliveryAddress.id
  );
  const putDeliveryMode = interceptPutDeliveryModeEndpoint();

  cy.get('.cx-checkout-title').should('contain', 'Delivery Method');

  cy.get('cx-delivery-mode input').first().should('be.checked');
  cy.get('cx-delivery-mode input').eq(1).click();

  cy.wait(`@${putDeliveryMode}`).its('response.statusCode').should('eq', 200);
  cy.wait(`@${getCheckoutDetails}`)
    .its('response.statusCode')
    .should('eq', 200);

  cy.get('cx-delivery-mode input').first().should('not.be.checked');

  cy.get(
    'input[type=radio][formcontrolname=deliveryModeId]:not(:disabled)'
  ).then(() => {
    // Accessibility
    verifyTabbingOrder(
      'cx-page-layout.MultiStepCheckoutSummaryPageTemplate',
      config.deliveryMode
    );
  });

  const orderReview = waitForPage('/checkout/review-order', 'getReviewOrder');

  cy.get('.cx-checkout-btns button.btn-primary')
    .should('be.enabled')
    .click({ force: true });

  cy.wait(`@${orderReview}`, { timeout: 30000 })
    .its('response.statusCode')
    .should('eq', 200);
}

export function reviewB2bReviewOrderPage(
  sampleUser: SampleUser = b2bAccountShipToUser,
  cartData: SampleCartProduct,
  isAccount: boolean,
  orderType: string,
  conf: TabbingOrderConfig = config,
  poNum: string = poNumber,
  costCtr: string = costCenter,
  b2bUnt: string = b2bUnit
) {
  verifyReviewOrderPage();

  if (isAccount) {
    cy.get('.cx-review-summary-card')
      .contains('cx-card', 'Purchase Order Number')
      .find('.cx-card-container')
      .within(() => {
        cy.findByText(poNum);
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
        cy.findByText(costCtr);
        cy.findByText(`(${b2bUnt})`);
      });
  }

  cy.get('.cx-review-summary-card')
    .contains('cx-card', 'Ship To')
    .find('.cx-card-container')
    .within(() => {
      cy.findByText(sampleUser.fullName);
      cy.findByText(sampleUser.address.line1);
    });

  if (isAccount) {
    cy.get('.cx-review-summary-card')
      .contains('cx-card', 'Delivery Method')
      .find('.cx-card-container')
      .within(() => {
        cy.findByText('Premium Delivery');
      });
  } else {
    cy.get('.cx-review-summary-card')
      .contains('cx-card', 'Delivery Method')
      .find('.cx-card-container')
      .within(() => {
        cy.findByText('Standard Delivery');
      });
  }

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
      conf.replenishmentOrderAccountCheckoutReviewOrder
    );
  } else {
    verifyTabbingOrder(
      'cx-page-layout.MultiStepCheckoutSummaryPageTemplate',
      isAccount ? conf.checkoutReviewOrderAccount : conf.checkoutReviewOrder
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

  cy.get('cx-place-order button.btn-primary').should('be.enabled').click();
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
      cy.get('.cx-summary-card:nth-child(2)').within(() => {
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
      cy.get('.cx-summary-card:nth-child(2)').within(() => {
        cy.contains('Frequency');
        cy.contains(recurrencePeriodMap.get(replenishment));
      });

      cy.get('.cx-summary-card:nth-child(3)').within(() => {
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
      cy.get('.cx-summary-card:nth-child(3)').within(() => {
        cy.contains(sampleUser.fullName);
        cy.contains(sampleUser.address.line1);

        if (
          cartData.estimatedShipping ===
          cartWithB2bProductAndPremiumShipping.estimatedShipping
        ) {
          cy.contains('Premium Delivery');
        } else {
          cy.contains('Standard Delivery');
        }
      });
    } else {
      cy.get('.cx-summary-card:nth-child(4)').within(() => {
        cy.contains(sampleUser.fullName);
        cy.contains(sampleUser.address.line1);
        cy.contains('Premium Delivery');
      });
    }

    if (!isAccount) {
      cy.get('.cx-summary-card:nth-child(4)').within(() => {
        cy.contains('Payment');
        cy.contains(sampleUser.fullName);
        cy.contains(sampleUser.address.line1);
      });
    }
  });

  cy.get('.cx-item-list-row .cx-code').should('contain', sampleProduct.code);

  cy.get('cx-order-summary .cx-summary-amount').should(
    'contain',
    cartData.totalAndShipping
  );
}

export function interceptPaymentTypesEndpoint(): string {
  const alias = 'getPaymentTypes';
  cy.intercept(
    {
      method: 'GET',
      path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/paymenttypes*`,
    },
    {
      fixture:
        'b2b-checkout-replenishment/method-of-payment-step/payment-types.json',
      statusCode: 200,
    }
  ).as(alias);

  return alias;
}

export function interceptCostCenterEndpoint() {
  const alias = 'getCostCenters';

  cy.intercept({
    method: 'GET',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/costcenters?fields=DEFAULT*`,
  }).as(alias);

  return alias;
}

export function interceptCheckoutB2BDetailsEndpoint(
  body?: any,
  addressId?: string
) {
  const alias = 'getCheckoutDetails';
  const request = {
    method: 'GET',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/**/carts/**/*?fields=deliveryAddress(FULL),deliveryMode(FULL),paymentInfo(FULL),costCenter(FULL),purchaseOrderNumber,paymentType(FULL)*`,
  };

  if (body && addressId) {
    if (JSON.stringify(body).includes('addressIdFromServer')) {
      body = JSON.parse(
        JSON.stringify(body).replace(/addressIdFromServer/g, addressId)
      );
    }
    // stub contains server addressId
    cy.intercept(request, { body, statusCode: 200 }).as(alias);
  } else {
    // no stub, use server response
    cy.intercept(request).as(alias);
  }
  return alias;
}

export function interceptPutDeliveryModeEndpoint() {
  const alias = 'putDeliveryMode';
  cy.intercept({
    method: 'PUT',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/**/deliverymode?deliveryModeId=*`,
  }).as(alias);

  return alias;
}
