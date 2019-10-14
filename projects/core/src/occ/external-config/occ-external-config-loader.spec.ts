import { ExternalConfig } from '../../external-config/external-config';
import { NodeHttpsClient } from '../../util/load-json-utils';
import { TransferData } from '../../util/transfer-data';
import { OccBaseUrlMetaTagUtils } from '../config/occ-base-url-meta-tag-utils';
import { Occ } from '../occ-models/occ.models';
import { OccBaseSites2ConfigConverter } from './occ-base-sites-2-config-converter';
import {
  OccBaseSitesEndpointOptions,
  OccBaseSitesLoader,
} from './occ-base-sites-loader';
import { OccExternalConfigLoader } from './occ-external-config-loader';

describe(`OccExternalConfigLoader`, () => {
  describe(`rehydrate`, () => {
    it(`should resolve promise with the rehydrated config`, async () => {
      spyOn(TransferData, 'rehydrate').and.returnValue({ context: {} });
      const result = await OccExternalConfigLoader.rehydrate();
      expect(result).toEqual({ context: {} });
    });

    it(`should reject promise when cannot rehydrate the config`, async () => {
      spyOn(TransferData, 'rehydrate').and.returnValue(undefined);
      let rejected;
      await OccExternalConfigLoader.rehydrate().catch(() => (rejected = true));
      expect(rejected).toBe(true);
    });
  });

  describe(`load`, () => {
    let mockBaseSites: Occ.BaseSites;
    let mockConvertedConfig: ExternalConfig;

    beforeEach(() => {
      mockBaseSites = { baseSites: [] };
      mockConvertedConfig = { context: {} };

      spyOn(OccBaseSites2ConfigConverter, 'convert').and.returnValue(
        mockConvertedConfig
      );
      spyOn(OccBaseSitesLoader, 'load').and.returnValue(
        Promise.resolve(mockBaseSites)
      );
    });

    it(`should load occ base sites and convert them into a config`, async () => {
      const endpointOptions: OccBaseSitesEndpointOptions = {
        baseUrl: 'testOccBaseUrl',
      };
      const currentUrl = 'testCurrentUrl';
      const result = await OccExternalConfigLoader.load(
        endpointOptions,
        currentUrl
      );

      expect(OccBaseSitesLoader.load).toHaveBeenCalledWith(endpointOptions);
      expect(OccBaseSites2ConfigConverter.convert).toHaveBeenCalledWith(
        mockBaseSites,
        currentUrl
      );
      expect(result).toBe(mockConvertedConfig);
    });

    it(`should use occ base url from the DOM when no base url given`, async () => {
      spyOn(OccBaseUrlMetaTagUtils, 'getFromDOM').and.returnValue(
        'testOccBaseUrl'
      );
      await OccExternalConfigLoader.load({}, 'testCurrentUrl');
      expect(OccBaseUrlMetaTagUtils.getFromDOM).toHaveBeenCalled();
      expect(OccBaseSitesLoader.load).toHaveBeenCalledWith(
        jasmine.objectContaining({ baseUrl: 'testOccBaseUrl' })
      );
    });

    it(`should use document.location.href when the current url is not given`, async () => {
      await OccExternalConfigLoader.load({ baseUrl: 'testOccBaseUrl' });
      expect(OccBaseSites2ConfigConverter.convert).toHaveBeenCalledWith(
        mockBaseSites,
        document.location.href
      );
    });
  });

  describe(`loadSSR`, () => {
    let mockBaseSites: Occ.BaseSites;
    let mockConvertedConfig: ExternalConfig;

    beforeEach(() => {
      mockBaseSites = { baseSites: [] };
      mockConvertedConfig = { context: {} };

      spyOn(OccBaseSites2ConfigConverter, 'convert').and.returnValue(
        mockConvertedConfig
      );
      spyOn(OccBaseSitesLoader, 'loadSSR').and.returnValue(
        Promise.resolve(mockBaseSites)
      );
    });

    it(`should load occ base sites and convert them into a config`, async () => {
      const endpointOptions: OccBaseSitesEndpointOptions = {
        baseUrl: 'testBaseUrl',
      };
      const currentUrl = 'testCurrentUrl';
      const httpsClient: NodeHttpsClient = 'testHttpsClient' as any;
      const result = await OccExternalConfigLoader.loadSSR(
        endpointOptions,
        currentUrl,
        httpsClient
      );

      expect(OccBaseSitesLoader.loadSSR).toHaveBeenCalledWith(
        endpointOptions,
        httpsClient
      );
      expect(OccBaseSites2ConfigConverter.convert).toHaveBeenCalledWith(
        mockBaseSites,
        currentUrl
      );
      expect(result).toBe(mockConvertedConfig);
    });
  });
});
