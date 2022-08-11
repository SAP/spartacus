// SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
//
// SPDX-License-Identifier: Apache-2.0

import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';

export function personalDetailsTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/update-profile');

  verifyTabbingOrder(containerSelector, config);
}
