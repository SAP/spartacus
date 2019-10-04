import { isDevMode } from '@angular/core';
import {
  OCC_BASE_URL_META_TAG_NAME,
  OCC_BASE_URL_META_TAG_PLACEHOLDER,
} from '../config/config-from-meta-tag-factory';
import { Occ } from '../occ-models/occ.models';

function xhrJsonRequest(url: string, method: string = 'GET'): Promise<any> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
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

function getBaseUrlFromMetaTag() {
  const meta = document.querySelector(
    `meta[name="${OCC_BASE_URL_META_TAG_NAME}"]`
  );
  const baseUrl = meta && meta.getAttribute('content');
  return baseUrl === OCC_BASE_URL_META_TAG_PLACEHOLDER ? null : baseUrl;
}

export interface FetchOccBaseSitesOptions {
  baseUrl?: string;
  prefix?: string;
  endpoint?: string;
}

/**
 * Fetches base sites from the OCC endpoint `/basesites`.
 *
 * It's intended to be used before the initialization of an Angular app, so cannot use Angular utils.
 */
export function fetchOccBaseSites(
  options: FetchOccBaseSitesOptions = {}
): Promise<Occ.BaseSites> {
  const baseUrl = options.baseUrl || getBaseUrlFromMetaTag();
  if (!baseUrl) {
    if (isDevMode()) {
      console.warn(
        `WARNING: Cannot get OCC base sites due to unknown base url! Please pass it as the call's parameter or place it in the meta tag: \n<meta name="${OCC_BASE_URL_META_TAG_NAME}" content="${OCC_BASE_URL_META_TAG_PLACEHOLDER}" />`
      );
      return Promise.resolve(null);
    }
  }

  const prefix = options.prefix || '/rest/v2';
  const endpoint = options.endpoint || '/basesites?fields=FULL';

  const url = `${baseUrl}${prefix}${endpoint}`;

  return xhrJsonRequest(url).catch(error => {
    if (isDevMode()) {
      console.error(`Error: Could not fetch OCC base sites!\n`, error);
    }
  });
}
