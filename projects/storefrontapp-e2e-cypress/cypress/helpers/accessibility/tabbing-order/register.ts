/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { verifyTabbingOrder } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';

export function registerTabbingOrder(config: TabElement[]) {
  cy.visit('/login/register');

  verifyTabbingOrder(containerSelector, config);
}
