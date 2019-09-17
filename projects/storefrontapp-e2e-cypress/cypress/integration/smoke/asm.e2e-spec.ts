import * as addressBook from '../../helpers/address-book';
import * as checkout from '../../helpers/checkout-flow';
import * as profile from '../../helpers/update-profile';

context('ASM', () => {
  let customer: any;

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    checkout.visitHomePage();
    customer = checkout.registerUser();
    cy.log('Registered user:', customer.email);
  });

  it('should have ASM feature enabled', () => {
    checkout.visitHomePage();
    cy.get('cx-asm').should('exist');
  });

  it('should have ASM UI hidden by default', () => {
    checkout.visitHomePage();
    cy.get('cx-asm-main-ui').should('not.exist');
  });

  it('should show the asm UI when ?asm=true is passed to the url', () => {
    checkout.visitHomePage('asm=true');
    cy.get('cx-asm-main-ui').should('exist');
  });

  it('should authenticate the customer support agent.', () => {
    const authenticationRequestAlias = listenForAuthenticationRequest();
    cy.get('cx-csagent-login-form').should('exist');
    cy.get('cx-customer-selection').should('not.exist');
    cy.get('cx-csagent-login-form form').within(() => {
      cy.get('[formcontrolname="userId"]').type('asagent');
      cy.get('[formcontrolname="password"]').type('123456');
      cy.get('button[type="submit"]').click();
    });

    cy.wait(authenticationRequestAlias)
      .its('status')
      .should('eq', 200);
    cy.get('cx-csagent-login-form').should('not.exist');
    cy.get('cx-customer-selection').should('exist');
  });

  it('customer emulation - should start cusrtomer emulation.', () => {
    const customerSearchRequestAlias = listenForCusrtomerSearchRequest();
    const userDetailsRequestAlias = listenForUserDetailsRequest();

    cy.get('cx-csagent-login-form').should('not.exist');
    cy.get('cx-customer-selection').should('exist');
    cy.get('cx-customer-selection form').within(() => {
      cy.get('[formcontrolname="searchTerm"]').type(customer.email);
      cy.get('button[type="submit"]').click();
    });
    cy.wait(customerSearchRequestAlias)
      .its('status')
      .should('eq', 200);
    cy.wait(userDetailsRequestAlias)
      .its('status')
      .should('eq', 200);
    cy.get('cx-asm-main-ui').should(
      'contain',
      `ASM - Supporting customer: ${customer.fullName} (${customer.email})`
    );
    cy.get('cx-csagent-login-form').should('not.exist');
    cy.get('cx-customer-selection').should('not.exist');
  });

  it('customer emulation - should add a product to cart and begin checkout.', () => {
    checkout.clickCheapProductDetailsFromHomePage();
    checkout.addCheapProductToCartAndBeginCheckout();
  });

  it('customer emulation - should fill in address form', () => {
    checkout.fillAddressFormWithCheapProduct();
  });

  it('customer emulation - should choose delivery', () => {
    checkout.chooseDeliveryMethod();
  });

  it('customer emulation - should fill in payment form', () => {
    checkout.fillPaymentFormWithCheapProduct();
  });

  it('customer emulation - should review and place order', () => {
    checkout.placeOrderWithCheapProduct();
  });

  it('customer emulation - should display summary page', () => {
    checkout.verifyOrderConfirmationPageWithCheapProduct();
  });

  it('customer emulation - should be able to check order in order history', () => {
    checkout.viewOrderHistoryWithCheapProduct();
  });

  it('customer emulation - update personal details.', () => {
    profile.updateProfile();
  });

  it('customer emulation - delete address', () => {
    cy.selectUserMenuOption({
      option: 'Address Book',
    });
    cy.get('cx-address-card').should('have.length', 1);
    addressBook.deleteFirstAddress();
    cy.get('cx-address-card').should('have.length', 0);
  });

  it('customer emulation - create new address', () => {
    addressBook.createNewAddress();
    cy.get('cx-address-card').should('have.length', 1);
    addressBook.verifyNewAddress();
  });

  it('customer emulation - verify payment details', () => {
    cy.selectUserMenuOption({
      option: 'Payment Details',
    });
    cy.get('.cx-payment .cx-body').then(() => {
      cy.get('cx-card').should('have.length', 1);
    });
  });

  it('customer emulation - should stop customer emulation.', () => {
    checkout.signOutUser();
    cy.get('cx-csagent-login-form').should('not.exist');
    cy.get('cx-customer-selection').should('exist');
  });

  it('should sign out customer support agent.', () => {
    cy.get('button.btn-secondary').click();
    cy.get('cx-csagent-login-form').should('exist');
    cy.get('cx-customer-selection').should('not.exist');
  });

  it('should close the ASM UI.', () => {
    cy.get('button.btn-secondary').click();
    cy.get('cx-asm-main-ui').should('not.exist');
  });

  it('customer - should sign in the customer.', () => {
    checkout.visitHomePage();
    checkout.signInUser();
  });
  it('customer - should the customer see the order placed by the agent.', () => {
    checkout.viewOrderHistoryWithCheapProduct();
  });

  it('customer - verify personal details updated by the agent.', () => {
    profile.verifyUpdatedProfile();
  });

  it('customer - verify address created by the agent.', () => {
    cy.selectUserMenuOption({
      option: 'Address Book',
    });
    cy.get('cx-address-card').should('have.length', 1);
    addressBook.verifyNewAddress();
  });

  it('customer - verify payment details', () => {
    cy.selectUserMenuOption({
      option: 'Payment Details',
    });
    cy.get('.cx-payment .cx-body').then(() => {
      cy.get('cx-card').should('have.length', 1);
    });
  });

  it('customer - should sign out the user.', () => {
    checkout.signOutUser();
  });

  function listenForAuthenticationRequest(): string {
    const aliasName = 'csAgentAuthentication';
    cy.server();
    cy.route('POST', `/authorizationserver/oauth/token`).as(aliasName);
    return `@${aliasName}`;
  }
  function listenForCusrtomerSearchRequest(): string {
    const aliasName = 'customerSearch';
    cy.server();
    cy.route(
      'GET',
      `/assistedservicewebservices/customers/search?baseSite=electronics-spa&query=*`
    ).as(aliasName);
    return `@${aliasName}`;
  }
  function listenForUserDetailsRequest(): string {
    const aliasName = 'userDetails';
    cy.server();
    cy.route('GET', '/rest/v2/electronics-spa/users/*').as(aliasName);
    return `@${aliasName}`;
  }
});
