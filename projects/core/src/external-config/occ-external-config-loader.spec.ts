import { OccBaseUrlMetaTagUtils } from '../occ/config/occ-base-url-meta-tag-utils';
import { Occ } from '../occ/occ-models/occ.models';
import { NodeHttpsClient } from '../util/load-json-utils';
import { TransferData } from '../util/transfer-data';
import { ExternalConfig } from './external-config';
import { ExternalConfigConverter } from './external-config-converter';
import {
  OccBaseSitesEndpointOptions,
  OccBaseSitesLoader,
} from './occ-base-sites-loader';
import { OccExternalConfigLoader } from './occ-external-config-loader';

describe(`OccExternalConfigLoader`, () => {
  describe(`load`, () => {
    let mockBaseSites: Occ.BaseSites;
    let mockExternalConfig: ExternalConfig;

    beforeEach(() => {
      mockBaseSites = { baseSites: [] };
      mockExternalConfig = { baseSite: 'test' };

      spyOn(ExternalConfigConverter, 'fromOccBaseSites').and.returnValue(
        mockExternalConfig
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
      const endpointOptions: OccBaseSitesEndpointOptions = {
        baseUrl: 'testOccBaseUrl',
      };
      const currentUrl = 'testCurrentUrl';
      const result = await OccExternalConfigLoader.load({
        endpointOptions,
        currentUrl,
      });

      expect(OccBaseSitesLoader.load).toHaveBeenCalledWith(endpointOptions);
      expect(ExternalConfigConverter.fromOccBaseSites).toHaveBeenCalledWith(
        mockBaseSites,
        currentUrl
      );
      expect(result).toBe(mockExternalConfig);
    });

    it(`should use occ base url from the DOM when no base url given`, async () => {
      spyOn(OccBaseUrlMetaTagUtils, 'getFromDOM').and.returnValue(
        'testOccBaseUrl'
      );
      await OccExternalConfigLoader.load({
        endpointOptions: {},
        currentUrl: 'testCurrentUrl',
      });
      expect(OccBaseUrlMetaTagUtils.getFromDOM).toHaveBeenCalled();
      expect(OccBaseSitesLoader.load).toHaveBeenCalledWith(
        jasmine.objectContaining({ baseUrl: 'testOccBaseUrl' })
      );
    });

    it(`should use document.location.href when the current url is not given`, async () => {
      await OccExternalConfigLoader.load({
        endpointOptions: { baseUrl: 'testOccBaseUrl' },
      });
      expect(ExternalConfigConverter.fromOccBaseSites).toHaveBeenCalledWith(
        mockBaseSites,
        document.location.href
      );
    });
  });

  describe(`loadSSR`, () => {
    let mockBaseSites: Occ.BaseSites;
    let mockExternalConfig: ExternalConfig;

    beforeEach(() => {
      mockBaseSites = { baseSites: [] };
      mockExternalConfig = { baseSite: 'test' };

      spyOn(ExternalConfigConverter, 'fromOccBaseSites').and.returnValue(
        mockExternalConfig
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
      const result = await OccExternalConfigLoader.loadSSR({
        endpointOptions,
        currentUrl,
        httpsClient,
      });

      expect(OccBaseSitesLoader.loadSSR).toHaveBeenCalledWith(
        endpointOptions,
        httpsClient
      );
      expect(ExternalConfigConverter.fromOccBaseSites).toHaveBeenCalledWith(
        mockBaseSites,
        currentUrl
      );
      expect(result).toBe(mockExternalConfig);
    });
  });
});
