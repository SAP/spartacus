export function listenForCustomerSearchRequest(): string {
  const aliasName = 'customerSearch';
  cy.server();
  cy.route('GET', `/assistedservicewebservices/customers/search?*`).as(
    aliasName
  );
  return `@${aliasName}`;
}

export function agentLogin(): void {
  const authRequest = listenForAuthenticationRequest();

  cy.get('cx-csagent-login-form').should('exist');
  cy.get('cx-customer-selection').should('not.exist');
  cy.get('cx-csagent-login-form form').within(() => {
    cy.get('[formcontrolname="userId"]').type('asagent');
    cy.get('[formcontrolname="password"]').type('pw4all');
    cy.get('button[type="submit"]').click();
  });

  cy.wait(authRequest).its('status').should('eq', 200);
  cy.get('cx-csagent-login-form').should('not.exist');
  cy.get('cx-customer-selection').should('exist');
}

export function listenForAuthenticationRequest(): string {
  const aliasName = 'csAgentAuthentication';
  cy.server();
  cy.route('POST', `/authorizationserver/oauth/token`).as(aliasName);
  return `@${aliasName}`;
}
