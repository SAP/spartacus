/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { verifyTabbingOrder } from '../../tabbing-order';
import {
  verifySubscriptionAndCustomerInterest,
  enableNotificationChannel,
  disableNotificationChannel,
} from '../../../notification';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';

export function myInterestTabbingOrder(config: TabElement[]) {
  cy.visit('/');
  enableNotificationChannel();
  verifySubscriptionAndCustomerInterest('872912');
  verifyTabbingOrder(containerSelector, config);

  disableNotificationChannel();
}
