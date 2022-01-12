import * as asm from '../../../helpers/asm';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';
import * as checkout from '../../../helpers/checkout-flow';
import { getSampleUser } from '../../../sample-data/checkout-flow';

let customer: any;
context('Assisted Service Module', () => {
  before(() => {
    //Temporary change. Test repeatability in pipeline.
    Cypress.config(
      'requestTimeout',
      Number(Cypress.config('requestTimeout')) * 2
    );
    clearAllStorage();
    cy.visit('/');
    customer = getSampleUser();
    checkout.registerUser(false, customer);
  });

  describe('Customer Support Agent - Emulation', () => {
    asm.testCustomerEmulation();
  });
});
