export const Navigation = {
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
    cy.state('requests').filter(a => a.alias === alias).length,
  SPA: {
    navigationId: 1,
    navigateByUrl(url) {
      return (<any>cy.window()).then(w => {
        if (!w._cy_navigateByUrl) {
          console.log(`Please implement a method _cy_navigateByUrl on the window which calls the angular
            router navigateByUrl method.`);
        }
        w._cy_navigateByUrl(url);
      });
    },
    goToProduct(id) {
      return Navigation.SPA.navigateByUrl(`/product/${id}`);
    },
  },
};
