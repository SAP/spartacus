import { ExternalConfig } from '../../external-config/external-config';
import { EXTERNAL_CONFIG_TRANSFER_STATE_SCRIPT_ID } from '../../external-config/server-external-config.module';
import { CxTransferState } from '../../util/cx-transfer-state';
import { NodeHttpsClient } from '../../util/load-json-utils';
import { OccBaseUrlMetaTagUtils } from '../config/occ-base-url-meta-tag-utils';
import { OccBaseSites2ConfigConverter } from './occ-base-sites-2-config-converter';
import {
  OccBaseSitesEndpointOptions,
  OccBaseSitesLoader,
} from './occ-base-sites-loader';

export class OccExternalConfigLoader {
  /**
   * Rehydrates the transferred external config.
   *
   * **CAUTION**: Run it only in browser, because it's using the native DOM.
   */
  static rehydrate(): Promise<ExternalConfig> {
    const config = CxTransferState.rehydrate(
      EXTERNAL_CONFIG_TRANSFER_STATE_SCRIPT_ID,
      document
    );
    return config ? Promise.resolve(config) : Promise.reject();
  }

  /**
   * Loads the external config from OCC.
   *
   * **CAUTION**: Run it only in browser, because it's using the native DOM and XHR.
   */
  static load(
    fetchOptions: OccBaseSitesEndpointOptions = {},
    currentUrl: string = document.location.href
  ): Promise<ExternalConfig> {
    fetchOptions.baseUrl =
      fetchOptions.baseUrl || OccBaseUrlMetaTagUtils.getFromDOM();

    // needs to be in separate variable: (see https://github.com/ng-packagr/ng-packagr/issues/696)
    const thenFn = baseSites =>
      OccBaseSites2ConfigConverter.convert(baseSites, currentUrl);
    return OccBaseSitesLoader.load(fetchOptions).then(thenFn);
  }

  /**
   * Loads the external config from OCC.
   *
   * Run it in SSR, because it's using Node.js `https` client.
   */
  static loadSSR(
    fetchOptions: OccBaseSitesEndpointOptions,
    currentUrl: string,
    httpsClient: NodeHttpsClient
  ): Promise<ExternalConfig> {
    // needs to be in separate variable: (see https://github.com/ng-packagr/ng-packagr/issues/696)
    const thenFn = baseSites => {
      return OccBaseSites2ConfigConverter.convert(baseSites, currentUrl);
    };
    return OccBaseSitesLoader.loadSSR(fetchOptions, httpsClient).then(thenFn);
  }
}
