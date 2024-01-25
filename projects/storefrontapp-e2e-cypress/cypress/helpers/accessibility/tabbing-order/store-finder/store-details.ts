/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = 'cx-store-finder-store';

export function storeDetailsTabbingOrder(config: TabElement[]) {
  cy.visit('/store-finder/country/JP/Nakano');

  verifyTabbingOrder(containerSelector, config);
}
