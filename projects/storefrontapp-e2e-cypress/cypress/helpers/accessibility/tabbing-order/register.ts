/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { verifyTabbingOrder } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';
const containerSelectorForRegistraterWithCaptcha = 'cx-register';

export function registerTabbingOrder(config: TabElement[]) {
  cy.visit('/login/register');

  verifyTabbingOrder(containerSelector, config);
}

export function registerWithCaptchaTabbingOrder(config: TabElement[]) {
  cy.visit('/login/register');
  cy.get('cx-captcha').should('be.visible');
  verifyTabbingOrder(containerSelectorForRegistraterWithCaptcha, config);
}
