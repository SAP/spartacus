export const navigation = {
  visitHomePage(queryStringParams?: string): void {
    if (queryStringParams) {
      cy.visit(`/?${queryStringParams}`);
    } else {
      cy.visit('/');
    }
  },
  goToProduct(id): void {
    cy.visit(`/product/${id}`);
  },
  requestsCount: alias =>
    (<any>cy).state('requests').filter(a => a.alias === alias).length,
};
