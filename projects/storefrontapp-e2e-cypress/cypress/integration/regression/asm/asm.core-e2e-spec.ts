import * as asm from '../../../helpers/asm';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';
import { AsmConfig } from '@spartacus/storefront';

context('Assisted Service Module', () => {
  before(() => {
    clearAllStorage();
  });
  beforeEach(() => {
    cy.cxConfig({
      asm: { agentSessionTimer: { startingDelayInSeconds: 10000 } },
    } as AsmConfig);

    cy.intercept('/*', (request) => {
      request.on('response', (res) => {
        if (res.statusCode === 401) {
          cy.wrap(false).should('be.true');
        }
      });
    });
  });

  describe('Customer Support Agent - Emulation', () => {
    asm.testCustomerEmulation();
  });
});
