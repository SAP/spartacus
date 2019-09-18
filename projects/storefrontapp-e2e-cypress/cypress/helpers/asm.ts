export function listenForAuthenticationRequest(): string {
  const aliasName = 'csAgentAuthentication';
  cy.server();
  cy.route('POST', `/authorizationserver/oauth/token`).as(aliasName);
  return `@${aliasName}`;
}
export function listenForCusrtomerSearchRequest(): string {
  const aliasName = 'customerSearch';
  cy.server();
  cy.route(
    'GET',
    `/assistedservicewebservices/customers/search?baseSite=electronics-spa&query=*`
  ).as(aliasName);
  return `@${aliasName}`;
}
export function listenForUserDetailsRequest(): string {
  const aliasName = 'userDetails';
  cy.server();
  cy.route('GET', '/rest/v2/electronics-spa/users/*').as(aliasName);
  return `@${aliasName}`;
}
