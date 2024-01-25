/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@spartacus/core';
import * as securePortal from '../../../../helpers/b2b/b2b-secure-portal';

context('B2B - Secure Portal', () => {
  let config: RoutingConfig;

  beforeEach(() => {
    config = {
      routing: {
        protected: undefined,
      },
    };
  });
});

describe('Secure Portal - Routing', () => {
  describe('Routing restrictions', () => {
    before(() => {
      securePortal.getStubbedBasesites();
    });

    it('should redirect to the login page when accessing homepage', () => {
      cy.visit('/');
      cy.url().should('contain', '/login');
    });
  });
});
