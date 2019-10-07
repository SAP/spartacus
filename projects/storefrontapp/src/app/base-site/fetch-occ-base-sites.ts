// import { isDevMode } from '@angular/core';
// import {
//   OCC_BASE_URL_META_TAG_NAME,
//   OCC_BASE_URL_META_TAG_PLACEHOLDER,
// } from '../config/config-from-meta-tag-factory';
// import { Occ } from '../occ-models/occ.models';

import { isDevMode } from '@angular/core';
import {
  Occ,
  OCC_BASE_URL_META_TAG_NAME,
  OCC_BASE_URL_META_TAG_PLACEHOLDER,
} from '@spartacus/core';

function fetchJson(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        } catch (e) {
          reject(e);
        }
      } else {
        reject(xhr.responseText);
      }
    };
    xhr.onerror = e => {
      reject(e);
    };
    xhr.send();
  });
}

export interface FetchOccBaseSitesOptions {
  baseUrl: string;
  prefix?: string;
  endpoint?: string;
  ssrHttpsClient?: any; // spike todo add types
}

function nodeFetchJson(url: string, nodeHttpsClient: any): Promise<any> {
  return new Promise((resolve, reject) => {
    nodeHttpsClient
      .get(url, response => {
        let data = '';
        response.on('data', chunk => {
          data += chunk;
        });
        response.on('end', () => {
          if (response.statusCode === 200) {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              reject(e);
            }
          }
          reject(response);
        });
      })
      .on('error', err => {
        reject('Error: ' + err.message);
      });
  });
}

/**
 * Fetches base sites from the OCC endpoint `/basesites`.
 *
 * It's intended to be used before the initialization of an Angular app, so cannot use Angular utils.
 */
export function fetchOccBaseSites(
  options: FetchOccBaseSitesOptions
): Promise<Occ.BaseSites> {
  const baseUrl = options.baseUrl;
  if (!baseUrl) {
    if (isDevMode()) {
      console.warn(
        `WARNING: Cannot get OCC base sites due to unknown base url! Please pass it as the call's parameter or place it in the meta tag: \n<meta name="${OCC_BASE_URL_META_TAG_NAME}" content="${OCC_BASE_URL_META_TAG_PLACEHOLDER}" />`
      );
      return Promise.resolve(null);
    }
  }

  const prefix = options.prefix || '/rest/v2';
  const endpoint =
    options.endpoint ||
    '/basesites?fields=baseSites(uid,defaultLanguage(isocode),urlEncodingAttributes,urlPatterns,stores(currencies,defaultCurrency,languages,defaultLanguage))';

  const url = `${baseUrl}${prefix}${endpoint}`;

  return (options.ssrHttpsClient
    ? nodeFetchJson(url, options.ssrHttpsClient)
    : fetchJson(url)
  ).catch(error => {
    if (isDevMode()) {
      console.error(`Error: Could not fetch OCC base sites!\n`, error);
    }
  });
}
