import { SiteContextConfig } from '../../site-context/config/site-context-config';
import {
  fetchOccBaseSites,
  fetchOccBaseSitesSSR,
  OccBaseSitesEndpointOptions,
} from './fetch-occ-base-sites';
import { getConfigFromOccBaseSites } from './get-config-from-occ-base-sites';
import { getOccBaseUrlFromMetaTag } from './get-occ-base-url-from-meta-tag';
import { JsonFetchUtils } from './json-fetch-utils';
import { rehydrateOccBaseSitesConfig } from './occ-base-sites-config-transfer-state';

export function fetchOccBaseSitesConfig(
  fetchOptions: OccBaseSitesEndpointOptions = {},
  currentUrl: string = document.location.href
): Promise<SiteContextConfig> {
  fetchOptions.baseUrl = fetchOptions.baseUrl || getOccBaseUrlFromMetaTag();

  const config = rehydrateOccBaseSitesConfig();
  return config
    ? Promise.resolve(config)
    : fetchOccBaseSites(fetchOptions).then(baseSites =>
        getConfigFromOccBaseSites(baseSites, currentUrl)
      );
}

export function fetchOccBaseSitesConfigSSR(
  fetchOptions: OccBaseSitesEndpointOptions,
  currentUrl: string,
  httpsClient: JsonFetchUtils.NodeHttpsClient
): Promise<SiteContextConfig> {
  return fetchOccBaseSitesSSR(fetchOptions, httpsClient).then(baseSites =>
    getConfigFromOccBaseSites(baseSites, currentUrl)
  );
}
