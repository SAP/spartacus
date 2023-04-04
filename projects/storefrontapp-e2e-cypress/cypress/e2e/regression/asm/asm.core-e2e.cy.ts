/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asm from '../../../helpers/asm';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

context('Assisted Service Module', () => {
  before(() => {
    clearAllStorage();
  });

  Cypress.on(`window:before:load`, (win) => {
    (['log', 'warn', 'error', 'info'] as Array<keyof Console>).forEach(
      (command) => {
        cy.stub(win.console, command).callsFake((...args) => {
          cy.now(`log`, `console.${command}`, ...args);
        });
      }
    );
  });

  describe('Customer Support Agent - Emulation', () => {
    asm.testCustomerEmulation();
  });
});
