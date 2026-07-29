/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { getSampleUser } from '../../../sample-data/checkout-flow';
import { login } from '../../../support/utils/login';
import { myCompanyAdminUser } from '../../../sample-data/shared-users';
import { addB2bUser, setB2bPassword } from '../../../helpers/b2b/b2b-checkout';
import {
  b2bUser,
  POWERTOOLS_BASESITE,
  products,
} from '../../../sample-data/b2b-checkout';
import { stubB2bUnitSelectionApis } from '../../../helpers/b2b/b2b-unit-selection';

export function loginB2bUser() {
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

export function navigateToReviewOrderPage(productCode = products[0].code) {
  cy.visit(`${POWERTOOLS_BASESITE}/en/USD/product/${productCode}`);

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
