import { ExternalConfig } from '../../external-config/external-config';
import { EXTERNAL_CONFIG_TRANSFER_SCRIPT_ID } from '../../external-config/server-external-config.module';
import { NodeHttpsClient } from '../../util/load-json-utils';
import { TransferData } from '../../util/transfer-data';
import { OccBaseUrlMetaTagUtils } from '../config/occ-base-url-meta-tag-utils';
import { OccBaseSites2ConfigConverter } from './occ-base-sites-2-config-converter';
import {
  OccBaseSitesEndpointOptions,
  OccBaseSitesLoader,
} from './occ-base-sites-loader';

export class OccExternalConfigLoader {
  /**
   * Loads the external config from OCC.
   *
   * Tries to rehydrate the config first if the @param rehydrate is true (default).
   *
   * **CAUTION**: Run it only in browser, because it's using the native DOM and XHR.
   */
  static load({
    endpoint,
    currentUrl,
    rehydrate,
  }: {
    endpoint?: OccBaseSitesEndpointOptions;
    currentUrl?: string;
    rehydrate?: boolean;
  } = {}): Promise<ExternalConfig> {
    endpoint = endpoint || {};
    currentUrl = currentUrl || document.location.href;
    rehydrate = rehydrate || true;

    const config = rehydrate ? OccExternalConfigLoader.rehydrate() : undefined;
    if (config) {
      return Promise.resolve(config);
    }

    endpoint.baseUrl = endpoint.baseUrl || OccBaseUrlMetaTagUtils.getFromDOM();

    const thenFn = baseSites =>
      OccBaseSites2ConfigConverter.convert(baseSites, currentUrl);
    return OccBaseSitesLoader.load(endpoint).then(thenFn);
  }

  /**
   * Rehydrates the transferred external config.
   *
   * **CAUTION**: Run it only in browser, because it's using the native DOM.
   */
  private static rehydrate(): ExternalConfig {
    return TransferData.rehydrate(EXTERNAL_CONFIG_TRANSFER_SCRIPT_ID, document);
  }

  /**
   * Loads the external config from OCC.
   *
   * Run it in SSR, because it's using Node.js `https` client.
   */
  static loadSSR({
    endpoint,
    currentUrl,
    httpsClient,
  }: {
    endpoint: OccBaseSitesEndpointOptions;
    currentUrl: string;
    httpsClient: NodeHttpsClient;
  }): Promise<ExternalConfig> {
    const thenFn = baseSites => {
      return OccBaseSites2ConfigConverter.convert(baseSites, currentUrl);
    };
    return OccBaseSitesLoader.loadSSR(endpoint, httpsClient).then(thenFn);
  }
}
