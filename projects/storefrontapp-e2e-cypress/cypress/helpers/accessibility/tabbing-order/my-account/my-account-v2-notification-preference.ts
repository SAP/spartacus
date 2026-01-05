/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';

export function myAccountV2notificationPreferenceTabbingOrder(
  config: TabElement[]
) {
  cy.visit('/my-account/notification-preference');

  verifyTabbingOrder(containerSelector, config);
}
