export const navigation = {
  visitHomePage({
    queryStringParams,
    options,
  }: {
    queryStringParams?: string;
    options?: Partial<Cypress.VisitOptions>;
  }): Cypress.Chainable<Window> {
    queryStringParams =
      !queryStringParams || queryStringParams.indexOf('?') !== -1
        ? queryStringParams
        : `?${queryStringParams}`;
    return cy.visit(`/${queryStringParams ? queryStringParams : ''}`, options);
  },
  goToProduct(id): Cypress.Chainable<Window> {
    return cy.visit(`/product/${id}`);
  },
  requestsCount: alias =>
    (<any>cy).state('requests').filter(a => a.alias === alias).length,
};
