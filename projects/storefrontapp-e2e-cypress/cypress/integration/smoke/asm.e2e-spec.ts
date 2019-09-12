import * as checkout from '../../helpers/checkout-flow';

context('ASM', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  it('should have ASM enabled', () => {
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

    cy.wait(authenticationRequestAlias);
    cy.get('cx-csagent-login-form').should('not.exist');
    cy.get('cx-customer-selection').should('exist');
  });

  it('should start cusrtomer emulation.', () => {
    const customerSearchRequestAlias = listenForCusrtomerSearchRequest();
    cy.get('cx-csagent-login-form').should('not.exist');
    cy.get('cx-customer-selection').should('exist');
    cy.get('cx-customer-selection form').within(() => {
      cy.get('[formcontrolname="searchTerm"]').type('pl@sap.com');
      cy.get('button[type="submit"]').click();
    });
    cy.wait(customerSearchRequestAlias);
    cy.get('cx-asm-main-ui').should('contain', 'ASM - Supporting customer');
    cy.get('cx-csagent-login-form').should('not.exist');
    cy.get('cx-customer-selection').should('not.exist');
  });

  it('should stop cusrtomer emulation.', () => {
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
});
