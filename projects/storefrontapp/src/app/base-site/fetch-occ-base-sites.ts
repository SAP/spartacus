import { isDevMode } from '@angular/core';
import {
  Occ,
  OCC_BASE_URL_META_TAG_NAME,
  OCC_BASE_URL_META_TAG_PLACEHOLDER,
} from '@spartacus/core';
import { fetchJson, fetchJsonSSRFactory, HttpsClient } from './fetch-json';

export interface OccBaseSitesEndpointOptions {
  baseUrl?: string;
  prefix?: string;
  endpoint?: string;
}

/**
 * Fetches base sites from the OCC endpoint.
 *
 * It's intended to be used before the initialization of an Angular app, so cannot use Angular utils.
 *
 * @param endpointOptions parts of the url
 */
export function fetchOccBaseSites(
  endpointOptions: OccBaseSitesEndpointOptions
): Promise<Occ.BaseSites> {
  return genericFetchOccBaseSites(endpointOptions, fetchJson);
}

/**
 * Fetches base sites from the OCC endpoint in SSR
 *
 * It's intended to be used before the initialization of an Angular app, so cannot use Angular utils.
 *
 * @param endpointOptions parts of the url
 * @param httpsClient node `https` client
 */
export function fetchOccBaseSitesSSR(
  endpointOptions: OccBaseSitesEndpointOptions,
  httpsClient: HttpsClient
): Promise<Occ.BaseSites> {
  return genericFetchOccBaseSites(
    endpointOptions,
    fetchJsonSSRFactory(httpsClient)
  );
}

/**
 * Fetches base sites from OCC endpoint using the given fetch function.
 *
 * @param endpointOptions parts of the url
 * @param fetchFunction function that takes an url and returns promise of data
 */
function genericFetchOccBaseSites(
  endpointOptions: OccBaseSitesEndpointOptions,
  fetchFunction: (url: string) => Promise<any>
): Promise<Occ.BaseSites> {
  if (!areOptionsValid(endpointOptions)) {
    return Promise.reject();
  }

  const url = getFullUrl(endpointOptions);
  return fetchFunction(url).catch(() => {
    throw new Error(`Error: Could not fetch OCC base sites!`);
  });
}

/**
 * Validates the endpoint options
 */
function areOptionsValid(
  endpointOptions: OccBaseSitesEndpointOptions
): boolean {
  if (!endpointOptions.baseUrl) {
    if (isDevMode()) {
      console.error(
        `Error: Cannot get OCC base sites due to unknown base url! Please pass it as the call's parameter or place it in the meta tag: \n<meta name="${OCC_BASE_URL_META_TAG_NAME}" content="${OCC_BASE_URL_META_TAG_PLACEHOLDER}" />`
      );
    }
    return false;
  }
  return true;
}

/**
 * Retrieves the full url from the object with URL parts
 */
function getFullUrl(endpointOptions: OccBaseSitesEndpointOptions): string {
  const baseUrl = endpointOptions.baseUrl;
  const prefix = endpointOptions.prefix || '/rest/v2';
  const endpoint =
    endpointOptions.endpoint ||
    '/basesites?fields=baseSites(uid,defaultLanguage(isocode),urlEncodingAttributes,urlPatterns,stores(currencies,defaultCurrency,languages,defaultLanguage))';

  return `${baseUrl}${prefix}${endpoint}`;
}
