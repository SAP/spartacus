export const navigation = {
  visitHomePage({
    queryStringParams,
    options,
  }: {
    queryStringParams?: string;
    options?: Partial<Cypress.VisitOptions>;
  }): void {
    queryStringParams =
      !queryStringParams || queryStringParams.indexOf('?') !== -1
        ? queryStringParams
        : `?${queryStringParams}`;
    cy.visit(`/${queryStringParams ? queryStringParams : ''}`, options);
  },
  goToProduct(id): void {
    cy.visit(`/product/${id}`);
  },
  requestsCount: (alias) =>
    (<any>cy).state('requests').filter((a) => a.alias === alias).length,
};
