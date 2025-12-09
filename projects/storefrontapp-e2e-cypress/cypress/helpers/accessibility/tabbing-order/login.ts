/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { user } from '../../../sample-data/checkout-flow';
import { visitLoginPage } from '../../../support/utils/login';
import { fillSpartacusLoginForm } from '../../auth-forms';
import { verifyTabbingOrder } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

const containerSelector = '.LoginPageTemplate';

export function loginTabbingOrder(
  config: TabElement[],
  prefillForm: boolean = false
) {
  visitLoginPage();

  if (prefillForm) {
    const { email: username, password } = user;
    fillSpartacusLoginForm({ username, password });
  }

  verifyTabbingOrder(containerSelector, config);
}
