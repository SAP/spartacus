import { OccBaseUrlMetaTagUtils } from '../occ/config/occ-base-url-meta-tag-utils';
import { Occ } from '../occ/occ-models/occ.models';
import { NodeHttpsClient } from '../util/load-json-utils';
import { TransferData } from '../util/transfer-data';
import { ExternalConfig } from './external-config';
import { OccBaseSites2ExternalConfigConverter } from './occ-base-sites-2-external-config-converter';
import {
  OccBaseSitesEndpointOptions,
  OccBaseSitesLoader,
} from './occ-base-sites-loader';
import { OccExternalConfigLoader } from './occ-external-config-loader';

describe(`OccExternalConfigLoader`, () => {
  describe(`load`, () => {
    let mockBaseSites: Occ.BaseSites;
    let mockConvertedConfig: ExternalConfig;

    beforeEach(() => {
      mockBaseSites = { baseSites: [] };
      mockConvertedConfig = { context: {} };

      spyOn(OccBaseSites2ExternalConfigConverter, 'convert').and.returnValue(
        mockConvertedConfig
      );
      spyOn(OccBaseSitesLoader, 'load').and.returnValue(
        Promise.resolve(mockBaseSites)
      );
    });

    it(`should resolve promise with the rehydrated config when it's available`, async () => {
      spyOn(TransferData, 'rehydrate').and.returnValue({});
      const result = await OccExternalConfigLoader.load();
      expect(result).toEqual({});
    });

    it(`should load occ base sites and convert them into a config`, async () => {
      const endpoint: OccBaseSitesEndpointOptions = {
        baseUrl: 'testOccBaseUrl',
      };
      const currentUrl = 'testCurrentUrl';
      const result = await OccExternalConfigLoader.load({
        endpoint,
        currentUrl,
      });

      expect(OccBaseSitesLoader.load).toHaveBeenCalledWith(endpoint);
      expect(OccBaseSites2ExternalConfigConverter.convert).toHaveBeenCalledWith(
        mockBaseSites,
        currentUrl
      );
      expect(result).toBe(mockConvertedConfig);
    });

    it(`should use occ base url from the DOM when no base url given`, async () => {
      spyOn(OccBaseUrlMetaTagUtils, 'getFromDOM').and.returnValue(
        'testOccBaseUrl'
      );
      await OccExternalConfigLoader.load({
        endpoint: {},
        currentUrl: 'testCurrentUrl',
      });
      expect(OccBaseUrlMetaTagUtils.getFromDOM).toHaveBeenCalled();
      expect(OccBaseSitesLoader.load).toHaveBeenCalledWith(
        jasmine.objectContaining({ baseUrl: 'testOccBaseUrl' })
      );
    });

    it(`should use document.location.href when the current url is not given`, async () => {
      await OccExternalConfigLoader.load({
        endpoint: { baseUrl: 'testOccBaseUrl' },
      });
      expect(OccBaseSites2ExternalConfigConverter.convert).toHaveBeenCalledWith(
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

      spyOn(OccBaseSites2ExternalConfigConverter, 'convert').and.returnValue(
        mockConvertedConfig
      );
      spyOn(OccBaseSitesLoader, 'loadSSR').and.returnValue(
        Promise.resolve(mockBaseSites)
      );
    });

    it(`should load occ base sites and convert them into a config`, async () => {
      const endpoint: OccBaseSitesEndpointOptions = {
        baseUrl: 'testBaseUrl',
      };
      const currentUrl = 'testCurrentUrl';
      const httpsClient: NodeHttpsClient = 'testHttpsClient' as any;
      const result = await OccExternalConfigLoader.loadSSR({
        endpoint,
        currentUrl,
        httpsClient,
      });

      expect(OccBaseSitesLoader.loadSSR).toHaveBeenCalledWith(
        endpoint,
        httpsClient
      );
      expect(OccBaseSites2ExternalConfigConverter.convert).toHaveBeenCalledWith(
        mockBaseSites,
        currentUrl
      );
      expect(result).toBe(mockConvertedConfig);
    });
  });
});
