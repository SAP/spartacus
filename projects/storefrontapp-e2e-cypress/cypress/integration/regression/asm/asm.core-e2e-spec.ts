import * as addressBook from '../../../helpers/address-book';
import * as asm from '../../../helpers/asm';
import * as checkout from '../../../helpers/checkout-flow';
import { fillShippingAddress } from '../../../helpers/checkout-forms';
import * as consent from '../../../helpers/consent-management';
import * as profile from '../../../helpers/update-profile';
import { getSampleUser } from '../../../sample-data/checkout-flow';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

let customer: any;

context('Assisted Service Module', () => {
  before(() => {
    clearAllStorage();

    cy.visit('/');

    customer = getSampleUser();
    checkout.registerUser(false, customer);
  });

  describe('Customer Support Agent - Emulation', () => {
    it('should test customer emulation', () => {
      // storefront should have ASM UI disabled by default
      checkout.visitHomePage();
      cy.get('cx-asm-main-ui').should('not.exist');

      cy.log('--> Agent logging in');
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');

      asm.agentLogin();

      cy.log('--> Starting customer emulation');
      asm.startCustomerEmulation(customer);

      cy.log('--> Update personal details');
      cy.visit('/my-account/update-profile');
      profile.updateProfile();
      customer.firstName = profile.newFirstName;
      customer.lastName = profile.newLastName;
      customer.fullName = `${profile.newFirstName} ${profile.newLastName}`;
      customer.titleCode = profile.newTitle;

      cy.log('--> Create new address');
      cy.visit('/my-account/address-book');
      cy.get('cx-card').should('have.length', 0);
      fillShippingAddress(addressBook.newAddress);
      cy.get('cx-card').should('have.length', 1);
      addressBook.verifyNewAddress();

      cy.log('--> Add a consent');

      cy.visit('/my-account/consents');
      consent.giveConsent();

      cy.log('--> Stop customer emulation');
      cy.get('cx-customer-emulation button').click();
      cy.get('cx-csagent-login-form').should('not.exist');
      cy.get('cx-customer-selection').should('exist');

      // Without this wait, the test fails b/c the customer search box is disabled
      cy.wait(1000);

      cy.log('--> Start another emulation session');
      asm.startCustomerEmulation(customer);

      cy.log(
        '--> Stop customer emulation using the end session button in the ASM UI'
      );
      cy.get('cx-customer-emulation button').click();
      cy.get('cx-customer-emulation').should('not.exist');
      cy.get('cx-customer-selection').should('exist');

      cy.log('--> sign out and close ASM UI');
      asm.agentSignOut();

      cy.get('button[title="Close ASM"]').click();
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('not.be.visible');
    });
  });

});

