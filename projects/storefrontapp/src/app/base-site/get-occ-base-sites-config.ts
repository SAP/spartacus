import { SiteContextConfig } from '@spartacus/core';
import {
  fetchOccBaseSites,
  FetchOccBaseSitesOptions,
} from './fetch-occ-base-sites';
import { getConfigFromOccBaseSites } from './get-config-from-occ-base-sites';
import { getOccBaseUrlFromMetaTag } from './get-occ-base-url-from-meta-tag';
import { rehydrateStateOccBaseSitesConfig } from './occ-base-sites-config-transfer-state';

export function fetchOccBaseSitesConfig(
  fetchOptions?: FetchOccBaseSitesOptions,
  currentUrl?: string
): Promise<SiteContextConfig> {
  fetchOptions = fetchOptions || {
    baseUrl: getOccBaseUrlFromMetaTag(),
  };
  currentUrl = currentUrl || document.location.href;

  // if not browser mode, try to rehydrate the state
  if (!fetchOptions.ssrHttpsClient) {
    const config = rehydrateStateOccBaseSitesConfig();
    if (config) {
      return Promise.resolve(config);
    }
  }

  return fetchOccBaseSites(fetchOptions).then(baseSites =>
    getConfigFromOccBaseSites(baseSites, currentUrl)
  );
}
