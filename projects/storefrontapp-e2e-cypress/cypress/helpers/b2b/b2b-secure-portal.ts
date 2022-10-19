export const baseSitesConfig = {
  baseSites: [
    {
      defaultLanguage: {
        isocode: 'en',
      },
      requiresAuthentication: true,
      uid: 'powertools-spa',
      urlPatterns: ['(?i)^https?://localhost(:[\\d]+)?/?$'],
    },
  ],
};

export const baseSites = JSON.parse(JSON.stringify(baseSitesConfig));

export function getStubbedBasesites() {
  cy.intercept(
    {
      method: 'GET',
      pathname: `${Cypress.env('OCC_PREFIX')}/basesites`,
    },
    { body: baseSites }
  );
}
