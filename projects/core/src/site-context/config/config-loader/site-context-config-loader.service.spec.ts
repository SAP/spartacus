import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SERVER_REQUEST_URL } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { BaseSite } from '../../../model/misc.model';
import { BaseSiteService } from '../../facade/base-site.service';
import { SiteContextConfigLoaderService } from './site-context-config-loader.service';

describe(`SiteContextConfigLoaderService`, () => {
  let service: SiteContextConfigLoaderService;
  let baseSiteService: BaseSiteService;

  let mockBaseSites: BaseSite[];
  const mockServerRequestUrl = 'test-server-request-url';

  function beforeEachWith({ platform }: { platform: string }) {
    const mockBaseStore = {
      languages: [{ isocode: 'de' }, { isocode: 'en' }],
      defaultLanguage: { isocode: 'en' },
      currencies: [{ isocode: 'EUR' }, { isocode: 'USD' }],
      defaultCurrency: { isocode: 'EUR' },
    };

    mockBaseSites = [
      {
        uid: 'test',
        urlPatterns: ['testUrl'],
        baseStore: mockBaseStore,
        urlEncodingAttributes: ['language', 'currency'],
        theme: 'test-theme',
      },
    ];

    class MockBaseSiteService {
      getAll(): Observable<BaseSite> {
        return of({});
      }
    }

    TestBed.configureTestingModule({
      providers: [
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: SERVER_REQUEST_URL, useValue: mockServerRequestUrl },
        { provide: PLATFORM_ID, useValue: platform },
      ],
    });

    service = TestBed.inject(SiteContextConfigLoaderService);
    baseSiteService = TestBed.inject(BaseSiteService);
  }

  describe(`loadConfig - should return config based on the base site data`, () => {
    describe(`on BOWSER platform`, async () => {
      beforeEach(() => beforeEachWith({ platform: 'browser' }));

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

        const result = await service.loadConfig();

        expect(baseSiteService.getAll).toHaveBeenCalled();
        expect(result).toEqual({
          context: {
            baseSite: ['test'],
            theme: ['test-theme'],
            language: ['en', 'de'],
            currency: ['EUR', 'USD'],
            urlParameters: ['language', 'currency'],
          },
        });
      });
    });

    describe(`on SERVER platform`, () => {
      beforeEach(() => {
        beforeEachWith({ platform: 'server' });

        service['isCurrentBaseSite'] = () => true;
        spyOn(baseSiteService, 'getAll').and.returnValue(of(mockBaseSites));
      });

      it(`should return config based on loaded sites data and current SERVER url`, async () => {
        const result = await service.loadConfig();

        expect(baseSiteService.getAll).toHaveBeenCalled();

        expect(result).toEqual({
          context: {
            baseSite: ['test'],
            theme: ['test-theme'],
            language: ['en', 'de'],
            currency: ['EUR', 'USD'],
            urlParameters: ['language', 'currency'],
          },
        });
      });
    });
  });
});
