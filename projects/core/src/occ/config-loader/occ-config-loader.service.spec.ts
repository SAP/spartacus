import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';
import { of } from 'rxjs';
import { I18nConfig } from '../../i18n';
import { BaseSite } from '../../model/misc.model';
import { SiteContextConfig } from '../../site-context';
import { SERVER_REQUEST_URL } from '../../util/ssr.tokens';
import { OccConfigLoaderService } from './occ-config-loader.service';
import { OccLoadedConfig } from './occ-loaded-config';
import { OccLoadedConfigConverter } from './occ-loaded-config-converter';
import { OccSitesConfigLoader } from './occ-sites-config-loader';
import { Config } from '@spartacus/core';

describe(`OccConfigLoaderService`, () => {
  let service: OccConfigLoaderService;
  let transferState: TransferState;
  let converter: OccLoadedConfigConverter;
  let sitesConfigLoader: OccSitesConfigLoader;
  let mockBaseSites: BaseSite[];

  let mockExternalConfig: OccLoadedConfig;
  let mockSiteContextConfig: SiteContextConfig;
  let mockI18nConfig: I18nConfig;

  const mockServerRequestUrl = 'test-server-request-url';

  function beforeEachWith({
    platform,
    config,
  }: {
    platform: string;
    config: I18nConfig | SiteContextConfig;
  }) {
    mockBaseSites = [];
    mockExternalConfig = { baseSite: 'test' };
    mockSiteContextConfig = { context: { baseSite: ['testSite'] } };
    mockI18nConfig = { i18n: { fallbackLang: 'testLang' } };

    const mockOccSitesConfigLoader = {
      load: jasmine
        .createSpy('OccSitesConfigLoader.load')
        .and.returnValue(of(mockBaseSites)),
    };
    const mockOccLoadedConfigConverter = {
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
        { provide: OccSitesConfigLoader, useValue: mockOccSitesConfigLoader },
        {
          provide: OccLoadedConfigConverter,
          useValue: mockOccLoadedConfigConverter,
        },
        { provide: TransferState, useValue: mockTransferState },
        { provide: SERVER_REQUEST_URL, useValue: mockServerRequestUrl },
        { provide: PLATFORM_ID, useValue: platform },
        { provide: Config, useValue: config },
      ],
    });

    service = TestBed.inject(OccConfigLoaderService);
    transferState = TestBed.inject(TransferState);
    converter = TestBed.inject(OccLoadedConfigConverter);
    sitesConfigLoader = TestBed.inject(OccSitesConfigLoader);

    spyOn(transferState, 'set');
  }

  describe(`loadConfig`, () => {
    describe(`on BROWSER platform`, () => {
      beforeEach(() => beforeEachWith({ platform: 'browser', config: {} }));

      describe(`when CAN rehydrate the external config`, () => {
        let rehydratedExternalConfig;

        beforeEach(() => {
          rehydratedExternalConfig = { test: 'rehydrated' };
          spyOn(transferState, 'get').and.returnValue(rehydratedExternalConfig);
        });

        it(`should return config based on the rehydrated config`, async () => {
          const result = await service.loadConfig();

          expect(sitesConfigLoader.load).not.toHaveBeenCalled();
          expect(converter.toSiteContextConfig).toHaveBeenCalledWith(
            rehydratedExternalConfig
          );
          expect(converter.toI18nConfig).toHaveBeenCalledWith(
            rehydratedExternalConfig
          );
          expect(transferState.get).toHaveBeenCalledWith(
            'cx-external-config' as any,
            undefined
          );
          expect(result).toEqual({
            context: { baseSite: ['testSite'] },
            i18n: { fallbackLang: 'testLang' },
          });
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

        it(`should return config based on loaded sites data and current BROWSER url`, async () => {
          const result = await service.loadConfig();

          expect(sitesConfigLoader.load).toHaveBeenCalled();
          expect(converter.toSiteContextConfig).toHaveBeenCalledWith(
            mockExternalConfig
          );
          expect(converter.toI18nConfig).toHaveBeenCalledWith(
            mockExternalConfig
          );
          expect(converter.fromOccBaseSites).toHaveBeenCalledWith(
            mockBaseSites,
            document.location.href
          );
          expect(result).toEqual({
            context: { baseSite: ['testSite'] },
            i18n: { fallbackLang: 'testLang' },
          });
        });

        it(`should not transfer external config`, async () => {
          await service.loadConfig();

          expect(transferState.set).not.toHaveBeenCalled();
        });
      });
    });

    describe(`on SERVER platform`, () => {
      beforeEach(() => beforeEachWith({ platform: 'server', config: {} }));

      it(`should return config based on loaded sites data and current SERVER url`, async () => {
        const result = await service.loadConfig();

        expect(sitesConfigLoader.load).toHaveBeenCalled();
        expect(converter.toSiteContextConfig).toHaveBeenCalledWith(
          mockExternalConfig
        );
        expect(converter.toI18nConfig).toHaveBeenCalledWith(mockExternalConfig);
        expect(converter.fromOccBaseSites).toHaveBeenCalledWith(
          mockBaseSites,
          mockServerRequestUrl
        );
        expect(result).toEqual({
          context: { baseSite: ['testSite'] },
          i18n: { fallbackLang: 'testLang' },
        });
      });

      it(`should transfer external config`, async () => {
        await service.loadConfig();

        expect(transferState.set).toHaveBeenCalledWith(
          'cx-external-config' as any,
          mockExternalConfig
        );
      });
    });

    describe(`when config for 'i18n.fallbackLang' is already statically provided`, () => {
      beforeEach(() =>
        beforeEachWith({
          platform: 'server',
          config: { i18n: { fallbackLang: 'testLang' } },
        })
      );

      it(`should not return config with 'i18n.fallbackLang' value`, async () => {
        const result = await service.loadConfig();

        expect(result).toEqual({
          context: { baseSite: ['testSite'] },
        });
      });
    });
  });
});
