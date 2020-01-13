export const Navigation = {
  visitHomePage(queryStringParams?: string): void {
    const homePage = Navigation.waitForPage('homepage', 'getHomePage');

    if (queryStringParams) {
      cy.visit(`/?${queryStringParams}`);
    } else {
      cy.visit('/');
    }
    cy.wait(`@${homePage}`)
      .its('status')
      .should('eq', 200);
  },
  waitForPage(page: string, alias: string): string {
    cy.server();
    cy.route('GET', `/rest/v2/electronics-spa/cms/pages?*${page}*`).as(alias);
    return alias;
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
