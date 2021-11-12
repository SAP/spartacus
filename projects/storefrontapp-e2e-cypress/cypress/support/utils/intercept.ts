/**
 * intercepts and alias a GET request
 * @param alias intercept alias
 * @param path  xhr relative path
 * @param cmsPrefix if true, prefixes `path` with /occ/v2/{BASE_SITE}
 * @returns alias
 */
export function interceptGet(
  alias: string,
  path: string,
  cmsPrefix?: boolean
): string {
  return interceptAndAlias('GET', alias, path, cmsPrefix);
}
/**
 * intercepts and alias a POST request
 * @param alias intercept alias
 * @param path  xhr relative path
 * @param cmsPrefix if true, prefixes `path` with /occ/v2/{BASE_SITE}
 * @returns alias
 */
export function interceptPost(
  alias: string,
  path: string,
  cmsPrefix?: boolean
): string {
  return interceptAndAlias('POST', alias, path, cmsPrefix);
}

/**
 * intercepts and alias a DELETE request
 * @param alias intercept alias
 * @param path  xhr relative path
 * @param cmsPrefix if true, prefixes `path` with /occ/v2/{BASE_SITE}
 * @returns alias
 */
export function interceptDelete(
  alias: string,
  path: string,
  cmsPrefix?: boolean
): string {
  return interceptAndAlias('DELETE', alias, path, cmsPrefix);
}

/**
 * Intercepts a request and creates an alias for it
 * @param method  http method
 * @param alias intercept alias
 * @param path  xhr relative path
 * @param cmsPrefix true if the call is for a CMS OCC API
 * @returns alias
 */
function interceptAndAlias(
  method: string,
  alias: string,
  path: string,
  cmsPrefix?: boolean
) {
  const aliasName = alias;
  cy.intercept({
    method: method,
    path: cmsPrefix
      ? `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}${path}`
      : path,
  }).as(aliasName);
  return `@${aliasName}`;
}
