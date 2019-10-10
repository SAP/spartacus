import { isDevMode } from '@angular/core';
import { LoadJsonUtils, NodeHttpsClient } from '../../util/load-json-utils';
import {
  OCC_BASE_URL_META_TAG_NAME,
  OCC_BASE_URL_META_TAG_PLACEHOLDER,
} from '../config/config-from-meta-tag-factory';
import { Occ } from '../occ-models/occ.models';

export interface OccBaseSitesEndpointOptions {
  baseUrl?: string;
  prefix?: string;
  endpoint?: string;
}

/**
 * Loads base sites from the OCC
 *
 * It's intended to be used before the initialization of an Angular app, so cannot use Angular utils.
 *
 */
export class OccBaseSitesLoader {
  /**
   * Loads base sites using XHR. Run it only in browser!
   *
   * @param endpointOptions parts of the url
   */
  static load(
    endpointOptions: OccBaseSitesEndpointOptions
  ): Promise<Occ.BaseSites> {
    return OccBaseSitesLoader._load(endpointOptions, LoadJsonUtils.loadXhr);
  }

  /**
   * Loads base sites using Node.js `https` client
   *
   * @param endpointOptions parts of the url
   * @param httpsClient node `https` client
   */
  static loadSSR(
    endpointOptions: OccBaseSitesEndpointOptions,
    httpsClient: NodeHttpsClient
  ): Promise<Occ.BaseSites> {
    return OccBaseSitesLoader._load(
      endpointOptions,
      LoadJsonUtils.loadNodeHttpsFactory(httpsClient)
    );
  }

  /**
   * Loads base sites from OCC endpoint using the given fetch function.
   *
   * @param endpointOptions parts of the url
   * @param fetchFunction function that takes an url and returns promise of data
   */
  private static _load(
    endpointOptions: OccBaseSitesEndpointOptions,
    fetchFunction: (url: string) => Promise<any>
  ): Promise<Occ.BaseSites> {
    if (!OccBaseSitesLoader.areOptionsValid(endpointOptions)) {
      return Promise.reject();
    }

    const url = OccBaseSitesLoader.getFullUrl(endpointOptions);
    return fetchFunction(url).catch(function() {
      throw new Error(`Error: Could not fetch OCC base sites!`);
    });
  }

  /**
   * Validates the endpoint options
   */
  private static areOptionsValid(
    endpointOptions: OccBaseSitesEndpointOptions
  ): boolean {
    if (!endpointOptions.baseUrl) {
      if (isDevMode()) {
        console.error(
          `Error: Cannot get OCC base sites due to unknown base url! Please pass it as the call's parameter or place it in the meta tag:
        <meta name="${OCC_BASE_URL_META_TAG_NAME}" content="${OCC_BASE_URL_META_TAG_PLACEHOLDER}" />`
        );
      }
      return false;
    }
    return true;
  }

  /**
   * Calculates the full url from the endpoint options
   */
  private static getFullUrl(
    endpointOptions: OccBaseSitesEndpointOptions
  ): string {
    const baseUrl = endpointOptions.baseUrl;
    const prefix = endpointOptions.prefix || '/rest/v2';
    const endpoint =
      endpointOptions.endpoint ||
      '/basesites?fields=baseSites(uid,defaultLanguage(isocode),urlEncodingAttributes,urlPatterns,stores(currencies,defaultCurrency,languages,defaultLanguage))';

    return `${baseUrl}${prefix}${endpoint}`;
  }
}
