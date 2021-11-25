/**
 * intercepts and alias a GET request
 * @param alias intercept alias
 * @param path  xhr relative path
 * @param baseSitePrefix if false, it does not prefix `path` with /occ/v2/{BASE_SITE}
 * @returns alias
 */
export function interceptGet(
  alias: string,
  path: string,
  baseSitePrefix?: boolean
): string {
  return interceptAndAlias('GET', alias, path, baseSitePrefix);
}
/**
 * intercepts and alias a POST request
 * @param alias intercept alias
 * @param path  xhr relative path
 * @param baseSitePrefix if false, it does not prefix `path` with /occ/v2/{BASE_SITE}
 * @returns alias
 */
export function interceptPost(
  alias: string,
  path: string,
  baseSitePrefix?: boolean
): string {
  return interceptAndAlias('POST', alias, path, baseSitePrefix);
}

/**
 * intercepts and alias a DELETE request
 * @param alias intercept alias
 * @param path  xhr relative path
 * @param baseSitePrefix if false, it does not prefix `path` with /occ/v2/{BASE_SITE}
 * @returns alias
 */
export function interceptDelete(
  alias: string,
  path: string,
  baseSitePrefix?: boolean
): string {
  return interceptAndAlias('DELETE', alias, path, baseSitePrefix);
}

/**
 * Intercepts a request and creates an alias for it
 * @param method  http method
 * @param alias intercept alias
 * @param path  xhr relative path
 * @param baseSitePrefix if false, it does not prefix `path` with /occ/v2/{BASE_SITE}
 * @returns alias
 */
function interceptAndAlias(
  method: string,
  alias: string,
  path: string,
  baseSitePrefix: boolean = true
) {
  const aliasName = alias;
  cy.intercept({
    method: method,
    path: baseSitePrefix
      ? `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}${path}`
      : path,
  }).as(aliasName);
  return `@${aliasName}`;
}
