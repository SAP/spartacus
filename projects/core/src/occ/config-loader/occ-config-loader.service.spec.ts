import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';
import { Config } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { I18nConfig } from '../../i18n';
import { BaseSite } from '../../model/misc.model';
import { SiteContextConfig } from '../../site-context';
import { BaseSiteService } from '../../site-context/facade/base-site.service';
import { ConverterService } from '../../util/converter.service';
import { SERVER_REQUEST_URL } from '../../util/ssr.tokens';
import {
  I18N_CONFIG_CONVERTER,
  OCC_LOADED_CONFIG_CONVERTER,
  SITE_CONTEXT_CONFIG_CONVERTER,
} from './converters';
import { OccConfigLoaderService } from './occ-config-loader.service';
import { OccLoadedConfig } from './occ-loaded-config';
import { OccSitesConfigLoader } from './occ-sites-config-loader';

describe(`OccConfigLoaderService`, () => {
  let service: OccConfigLoaderService;
  let transferState: TransferState;
  let converterService: ConverterService;
  let baseSiteService: BaseSiteService;
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
    mockBaseSites = [
      {
        uid: 'test',
        urlPatterns: ['testUrl'],
        stores: [
          {
            languages: [],
            currencies: [],
            defaultLanguage: {},
            defaultCurrency: {},
          },
        ],
        urlEncodingAttributes: [],
      },
    ];
    mockExternalConfig = { baseSite: 'test', theme: 'test-theme' };
    mockSiteContextConfig = {
      context: { baseSite: ['testSite'], theme: ['test-theme'] },
    };
    mockI18nConfig = { i18n: { fallbackLang: 'testLang' } };

    class MockBaseSiteService {
      getAll(): Observable<BaseSite> {
        return of({});
      }
    }

    const mockTransferState = {
      get: () => {},
      set: () => {},
    };

    TestBed.configureTestingModule({
      providers: [
        ConverterService,
        { provide: OccSitesConfigLoader, useValue: {} },
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: TransferState, useValue: mockTransferState },
        { provide: SERVER_REQUEST_URL, useValue: mockServerRequestUrl },
        { provide: PLATFORM_ID, useValue: platform },
        { provide: Config, useValue: config },
      ],
    });

    service = TestBed.inject(OccConfigLoaderService);
    transferState = TestBed.inject(TransferState);
    baseSiteService = TestBed.inject(BaseSiteService);
    converterService = TestBed.inject(ConverterService);

    spyOn(transferState, 'set');
    spyOn(converterService, 'convert').and.returnValues(
      mockSiteContextConfig,
      mockI18nConfig
    );
  }

  describe(`loadConfig`, () => {
    describe(`on BROWSER platform`, () => {
      beforeEach(() => beforeEachWith({ platform: 'browser', config: {} }));

      describe(`when CAN rehydrate the external config`, () => {
        let rehydratedExternalConfig: any;

        beforeEach(() => {
          rehydratedExternalConfig = {
            test: 'rehydrated',
          };
          spyOn(transferState, 'get').and.returnValue(rehydratedExternalConfig);
          spyOn(baseSiteService, 'getAll').and.returnValue(of(mockBaseSites));
        });

        it(`should return config based on the rehydrated config`, async () => {
          const result = await service.loadConfig();

          expect(baseSiteService.getAll).not.toHaveBeenCalled();
          expect(converterService.convert).toHaveBeenCalledWith(
            rehydratedExternalConfig,
            SITE_CONTEXT_CONFIG_CONVERTER
          );
          expect(converterService.convert).toHaveBeenCalledWith(
            rehydratedExternalConfig,
            I18N_CONFIG_CONVERTER
          );
          expect(transferState.get).toHaveBeenCalledWith(
            'cx-external-config' as any,
            undefined
          );
          expect(result).toEqual({
            context: { baseSite: ['testSite'], theme: ['test-theme'] },
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

        it(`should throw error when the base sites loaded are undefined`, async () => {
          spyOn(baseSiteService, 'getAll').and.returnValue(of(undefined));
          let message = false;
          try {
            await service.loadConfig();
          } catch (e) {
            message = e.message;
          }
          expect(message).toBeTruthy();
        });

        it(`should throw error when no url pattern of any base site matches the current url`, async () => {
          spyOn(baseSiteService, 'getAll').and.returnValue(of([]));
          let message = false;
          try {
            await service.loadConfig();
          } catch (e) {
            message = e.message;
          }
          expect(message).toBeTruthy();
        });

        it(`should throw error when no url pattern of any base site matches the current url`, async () => {
          spyOn(baseSiteService, 'getAll').and.returnValue(of(mockBaseSites));
          let message = false;
          try {
            await service.loadConfig();
          } catch (e) {
            message = e.message;
          }
          expect(message).toBeTruthy();
        });

        it(`should return config based on loaded sites data and current BROWSER url`, async () => {
          service['isCurrentBaseSite'] = () => true;
          spyOn(baseSiteService, 'getAll').and.returnValue(of(mockBaseSites));
          spyOn(converterService, 'pipeable').and.returnValue(() =>
            of(mockExternalConfig)
          );
          const result = await service.loadConfig();

          expect(baseSiteService.getAll).toHaveBeenCalled();
          expect(converterService.pipeable).toHaveBeenCalledWith(
            OCC_LOADED_CONFIG_CONVERTER
          );
          expect(converterService.convert).toHaveBeenCalledWith(
            mockExternalConfig,
            SITE_CONTEXT_CONFIG_CONVERTER
          );
          expect(converterService.convert).toHaveBeenCalledWith(
            mockExternalConfig,
            I18N_CONFIG_CONVERTER
          );
          expect(result).toEqual({
            context: { baseSite: ['testSite'], theme: ['test-theme'] },
            i18n: { fallbackLang: 'testLang' },
          });
        });

        it(`should not transfer external config`, async () => {
          service['isCurrentBaseSite'] = () => true;
          spyOn(baseSiteService, 'getAll').and.returnValue(of(mockBaseSites));
          await service.loadConfig();
          expect(transferState.set).not.toHaveBeenCalled();
        });
      });
    });

    describe(`on SERVER platform`, () => {
      beforeEach(() => {
        beforeEachWith({ platform: 'server', config: {} });

        service['isCurrentBaseSite'] = () => true;
        spyOn(baseSiteService, 'getAll').and.returnValue(of(mockBaseSites));
        spyOn(converterService, 'pipeable').and.returnValue(() =>
          of(mockExternalConfig)
        );
      });

      it(`should return config based on loaded sites data and current SERVER url`, async () => {
        const result = await service.loadConfig();

        expect(baseSiteService.getAll).toHaveBeenCalled();
        expect(converterService.convert).toHaveBeenCalledWith(
          mockExternalConfig,
          SITE_CONTEXT_CONFIG_CONVERTER
        );
        expect(converterService.convert).toHaveBeenCalledWith(
          mockExternalConfig,
          I18N_CONFIG_CONVERTER
        );
        expect(converterService.pipeable).toHaveBeenCalledWith(
          OCC_LOADED_CONFIG_CONVERTER
        );
        expect(result).toEqual({
          context: { baseSite: ['testSite'], theme: ['test-theme'] },
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
        service['isCurrentBaseSite'] = () => true;
        spyOn(baseSiteService, 'getAll').and.returnValue(of(mockBaseSites));

        const result = await service.loadConfig();
        expect(result).toEqual({
          context: { baseSite: ['testSite'], theme: ['test-theme'] },
        });
      });
    });
  });
});
