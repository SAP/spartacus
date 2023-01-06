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

    cy.intercept('/occ/v2/**', (request) => {
      request.on('response', (res) => {
        const allowlist = new RegExp(['/products'].join('|'));
        if (res.statusCode === 401 && !allowlist.test(res.url)) {
          throw new Error(`${res.url} ${res.headers.Authorization}`);
        }
      });
    });
  });

  describe('Customer Support Agent - Emulation', () => {
    asm.testCustomerEmulation();
  });
});
