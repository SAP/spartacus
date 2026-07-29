/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { clearAllStorage } from '../../../support/utils/clear-all-storage';
import {
  b2bUser,
  order_type,
  POWERTOOLS_BASESITE,
  products,
  recurrencePeriod,
} from '../../../sample-data/b2b-checkout';
import { myCompanyAdminUser } from '../../../sample-data/shared-users';
import { addB2bUser, setB2bPassword } from '../../../helpers/b2b/b2b-checkout';
import { login } from '../../../support/utils/login';
import { getSampleUser } from '../../../sample-data/checkout-flow';
import { stubB2bUnitSelectionApis } from '../../../helpers/b2b/b2b-unit-selection';

function loginB2bUser() {
  let adminToken;
  let user = getSampleUser();

  login(
    myCompanyAdminUser.registrationData.email,
    myCompanyAdminUser.registrationData.password
  )
    .then((result) => {
      adminToken = result?.body?.access_token;
      return addB2bUser(adminToken, user);
    })
    .then((result) => {
      return setB2bPassword(result.body.customerId, user.password, adminToken);
    })
    .then((result: any) => {
      b2bUser.registrationData.email = user.email;
      b2bUser.registrationData.password = user.password;
      stubB2bUnitSelectionApis();
      return cy.requireLoggedIn(b2bUser);
    });
}

function navigateToReviewOrderPage() {
  cy.visit(`${POWERTOOLS_BASESITE}/en/USD/product/${products[0].code}`);

  cy.get('button').contains(' Add to cart ').click();
  cy.get('button').contains(' proceed to checkout ').click();
  cy.get('cx-payment-type').within(() => {
    cy.findByText('Account').click();
  });
  cy.get('button.btn-primary').contains(' Continue ').click();
  cy.get('cx-delivery-address button.btn-primary')
    .contains(' Continue ')
    .click();
  cy.get('cx-delivery-mode button.btn-primary').contains(' Continue ').click();
}

describe('Order Replenishment Accessibility', { testIsolation: false }, () => {
  before(() => {
    clearAllStorage();
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    cy.a11yContinuumSetup();
    loginB2bUser();
    navigateToReviewOrderPage();
  });

  it('daily replenishment', () => {
    cy.get('cx-schedule-replenishment-order [type="radio"]').check(
      order_type.SCHEDULE_REPLENISHMENT
    );

    cy.get('cx-schedule-replenishment-order').a11yRunContinuumTest();
  });

  it('weekly replenishment', () => {
    cy.get('#order-replenishment-recurrence-period').select(
      recurrencePeriod.WEEKLY
    );

    cy.get('cx-schedule-replenishment-order').a11yRunContinuumTest();
  });

  it('monthly replenishment', () => {
    cy.get('#order-replenishment-recurrence-period').select(
      recurrencePeriod.MONTHLY
    );

    cy.get('cx-schedule-replenishment-order').a11yRunContinuumTest();
  });

  it('replenishments confirmation page', () => {
    cy.get('input[formcontrolname="termsAndConditions"]').check();

    cy.get('cx-place-order button').contains(' Place Order ').click();

    cy.get('cx-order-confirmation-thank-you-message');
    cy.get('main').a11yRunContinuumTest();
  });

  it('replenishments list page', () => {
    cy.visit('my-account/my-replenishments');
    cy.get(
      'cx-replenishment-order-history .cx-replenishment-order-history-code'
    );
    cy.get('main').a11yRunContinuumTest();
  });

  it('cancel replenishment', () => {
    cy.get('button').contains(' Cancel ').click();
    cy.get('cx-replenishment-order-cancellation-dialog').a11yRunContinuumTest();
    cy.get('button').contains(' Yes ').click();
    cy.get('cx-global-message').a11yRunContinuumTest();
  });
});
