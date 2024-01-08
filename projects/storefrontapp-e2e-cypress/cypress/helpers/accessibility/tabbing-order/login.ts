/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { user } from '../../../sample-data/checkout-flow';
import { fillLoginForm } from '../../auth-forms';
import { verifyTabbingOrder } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

const containerSelector = '.LoginPageTemplate';

export function loginTabbingOrder(
  config: TabElement[],
  prefillForm: boolean = false
) {
  cy.visit('/login');

  if (prefillForm) {
    const { email: username, password } = user;
    fillLoginForm({ username, password });
  }

  verifyTabbingOrder(containerSelector, config);
}
