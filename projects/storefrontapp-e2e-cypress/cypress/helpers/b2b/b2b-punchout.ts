/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { b2bUser } from '../../sample-data/b2b-checkout';
import { getSampleUser } from '../../sample-data/checkout-flow';
import { myCompanyAdminUser } from '../../sample-data/shared-users';
import { login } from '../../support/utils/login';
import { visitHomePage } from '../checkout-flow';
import { addB2bUser, setB2bPassword } from './b2b-checkout';

export function createPunchoutUser() {
  let adminToken;
  let user = getSampleUser();

  login(
    myCompanyAdminUser.registrationData.email,
    myCompanyAdminUser.registrationData.password
  )
    .then((result) => {
      expect(result.status).to.eq(200);
      adminToken = result?.body?.access_token;
      return addB2bUser(adminToken, user, ['PunchOut Organization']);
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
