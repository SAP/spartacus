import * as asm from '../../../helpers/asm';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

context('Assisted Service Module', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  });
  before(() => {
    clearAllStorage();
  });

  describe('Customer Support Agent - Emulation', () => {
    asm.testCustomerEmulation();
  });
});
