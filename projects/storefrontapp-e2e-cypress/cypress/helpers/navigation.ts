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
  SPA: {
    navigationId: 1,
    navigateByUrl(url): Promise<void> {
      return new Promise((resolve, reject) => {
        (<any>cy.window()).then(w => {
          if (!w._cy_navigateByUrl) {
            reject(`Please implement a method _cy_navigateByUrl on the window which calls the angular
            router navigateByUrl method.`);
          }
          w._cy_navigateByUrl(url);
          resolve();
        });
      });
    },
    async goToProduct(id) {
      await Navigation.SPA.navigateByUrl(`/product/${id}`);
    },
  },
};
