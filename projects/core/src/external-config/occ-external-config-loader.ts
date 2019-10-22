import { OccBaseUrlMetaTagUtils } from '../occ/config/occ-base-url-meta-tag-utils';
import { NodeHttpsClient } from '../util/load-json-utils';
import { TransferData } from '../util/transfer-data';
import { ExternalConfig } from './external-config';
import { ExternalConfigConverter } from './external-config-converter';
import {
  OccBaseSitesEndpointOptions,
  OccBaseSitesLoader,
} from './occ-base-sites-loader';
import { EXTERNAL_CONFIG_TRANSFER_ID } from './server-external-config.module';

export class OccExternalConfigLoader {
  /**
   * Loads the external config from OCC.
   *
   * Tries to rehydrate the config first if the @param rehydrate is true (default).
   *
   * **CAUTION**: Run it only in browser, because it's using the native DOM and XHR.
   */
  static load({
    endpointOptions,
    currentUrl,
    rehydrate,
  }: {
    endpointOptions?: OccBaseSitesEndpointOptions;
    currentUrl?: string;
    rehydrate?: boolean;
  } = {}): Promise<ExternalConfig> {
    endpointOptions = endpointOptions || {};
    currentUrl = currentUrl || document.location.href;
    rehydrate = rehydrate || true;

    const config = rehydrate ? OccExternalConfigLoader.rehydrate() : undefined;
    if (config) {
      return Promise.resolve(config);
    }

    endpointOptions.baseUrl =
      endpointOptions.baseUrl || OccBaseUrlMetaTagUtils.getFromDOM();

    const result = OccBaseSitesLoader.load(endpointOptions).then(baseSites =>
      ExternalConfigConverter.fromOccBaseSites(baseSites, currentUrl)
    );
    return result;
  }

  /**
   * Rehydrates the transferred external config.
   *
   * **CAUTION**: Run it only in browser, because it's using the native DOM.
   */
  private static rehydrate(): ExternalConfig {
    return TransferData.rehydrate(EXTERNAL_CONFIG_TRANSFER_ID, document);
  }

  /**
   * Loads the external config from OCC.
   *
   * Run it in SSR, because it's using Node.js `https` client.
   */
  static loadSSR({
    endpointOptions,
    currentUrl,
    httpsClient,
  }: {
    endpointOptions: OccBaseSitesEndpointOptions;
    currentUrl: string;
    httpsClient: NodeHttpsClient;
  }): Promise<ExternalConfig> {
    const result = OccBaseSitesLoader.loadSSR(
      endpointOptions,
      httpsClient
    ).then(baseSites =>
      ExternalConfigConverter.fromOccBaseSites(baseSites, currentUrl)
    );
    return result;
  }
}
