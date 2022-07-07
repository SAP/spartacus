import * as asm from '../../../helpers/asm';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

context('Assisted Service Module', () => {
  before(() => {
    clearAllStorage();
  });

  describe('Customer Support Agent - Emulation', () => {
    asm.testCustomerEmulation();
  });
});
