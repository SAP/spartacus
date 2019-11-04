import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';
import { of } from 'rxjs';
import { I18nConfig } from '../../i18n';
import { BaseSite } from '../../model/misc.model';
import { SiteConnector, SiteContextConfig } from '../../site-context';
import { SERVER_REQUEST_URL } from '../../ssr/ssr.providers';
import { OccConfigLoaderService } from './occ-config-loader.service';
import { OccLoadedConfig } from './occ-loaded-config';
import { OccLoadedConfigConverter } from './occ-loaded-config-converter';
import { OccSitesConfigLoader } from './occ-sites-config-loader';

describe(`OccConfigLoaderService`, () => {
  let service: OccConfigLoaderService;
  let transferState: TransferState;
  let externalConfigConverter: OccLoadedConfigConverter;
  let sitesConfigLoader: OccSitesConfigLoader;
  let mockBaseSites: BaseSite[];

  let mockExternalConfig: OccLoadedConfig;
  let mockSiteContextConfig: SiteContextConfig;
  let mockI18nConfig: I18nConfig;

  const mockServerRequestUrl = 'test-server-request-url';

  function beforeEachWithPlatform(testPlatform: string) {
    mockBaseSites = [];
    mockExternalConfig = { baseSite: 'test' };
    mockSiteContextConfig = { context: {} };
    mockI18nConfig = { i18n: {} };

    const mockSiteConnector = {
      getBaseSites: jasmine
        .createSpy('getBaseSites')
        .and.returnValue(of(mockBaseSites)),
    };
    const mockExternalConfigConverter = {
      fromOccBaseSites: jasmine
        .createSpy('fromOccBaseSites')
        .and.returnValue(mockExternalConfig),
      toSiteContextConfig: jasmine
        .createSpy('toSiteContextConfig')
        .and.returnValue(mockSiteContextConfig),
      toI18nConfig: jasmine
        .createSpy('toI18nConfig')
        .and.returnValue(mockI18nConfig),
    };
    const mockTransferState = {
      get: () => {},
      set: () => {},
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: SiteConnector, useValue: mockSiteConnector },
        {
          provide: OccLoadedConfigConverter,
          useValue: mockExternalConfigConverter,
        },
        { provide: TransferState, useValue: mockTransferState },
        { provide: SERVER_REQUEST_URL, useValue: mockServerRequestUrl },
        { provide: PLATFORM_ID, useValue: testPlatform },
      ],
    });

    service = TestBed.get(OccConfigLoaderService);
    transferState = TestBed.get(TransferState);
    externalConfigConverter = TestBed.get(OccLoadedConfigConverter);
    sitesConfigLoader = TestBed.get(OccSitesConfigLoader);

    spyOn(transferState, 'set');
  }

  describe(`getConfigChunks`, () => {
    describe(`on BROWSER platform`, () => {
      beforeEach(() => beforeEachWithPlatform('browser'));

      describe(`when CAN rehydrate the external config`, () => {
        let rehydratedExternalConfig;

        beforeEach(() => {
          rehydratedExternalConfig = { test: 'rehydrated' };
          spyOn(transferState, 'get').and.returnValue(rehydratedExternalConfig);
        });

        it(`should return chunks based on the rehydrated config`, async () => {
          const result = await service.loadConfig();

          expect(sitesConfigLoader.load).not.toHaveBeenCalled();
          expect(
            externalConfigConverter.toSiteContextConfig
          ).toHaveBeenCalledWith(rehydratedExternalConfig);
          expect(externalConfigConverter.toI18nConfig).toHaveBeenCalledWith(
            rehydratedExternalConfig
          );
          expect(transferState.get).toHaveBeenCalledWith(
            'cx-external-config',
            undefined
          );
          expect(result).toEqual([mockSiteContextConfig, mockI18nConfig]);
        });

        it(`should not transfer external config`, async () => {
          await service.loadConfig();

          expect(transferState.set).not.toHaveBeenCalled();
        });
      });

      describe(`when CANNOT rehydrate the external config`, () => {
        beforeEach(() => {
          spyOn(transferState, 'get').and.returnValue(undefined);
        });

        it(`should return chunks based on loaded sites data and current BROWSER url`, async () => {
          const result = await service.loadConfig();

          expect(sitesConfigLoader.load).toHaveBeenCalled();
          expect(
            externalConfigConverter.toSiteContextConfig
          ).toHaveBeenCalledWith(mockExternalConfig);
          expect(externalConfigConverter.toI18nConfig).toHaveBeenCalledWith(
            mockExternalConfig
          );
          expect(externalConfigConverter.fromOccBaseSites).toHaveBeenCalledWith(
            mockBaseSites,
            document.location.href
          );
          expect(result).toEqual([mockSiteContextConfig, mockI18nConfig]);
        });

        it(`should not transfer external config`, async () => {
          await service.loadConfig();

          expect(transferState.set).not.toHaveBeenCalled();
        });
      });
    });

    describe(`on SERVER platform`, () => {
      beforeEach(() => beforeEachWithPlatform('server'));

      it(`should return chunks based on loaded sites data and current SERVER url`, async () => {
        const result = await service.loadConfig();

        expect(sitesConfigLoader.load).toHaveBeenCalled();
        expect(
          externalConfigConverter.toSiteContextConfig
        ).toHaveBeenCalledWith(mockExternalConfig);
        expect(externalConfigConverter.toI18nConfig).toHaveBeenCalledWith(
          mockExternalConfig
        );
        expect(externalConfigConverter.fromOccBaseSites).toHaveBeenCalledWith(
          mockBaseSites,
          mockServerRequestUrl
        );
        expect(result).toEqual([mockSiteContextConfig, mockI18nConfig]);
      });

      it(`should transfer external config`, async () => {
        await service.loadConfig();

        expect(transferState.set).toHaveBeenCalledWith(
          'cx-external-config',
          mockExternalConfig
        );
      });
    });
  });
});
