import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { BaseSite } from '../../../model/misc.model';
import { JavaRegExpConverter } from '../../../util/java-reg-exp-converter/java-reg-exp-converter';
import { WindowRef } from '../../../window/window-ref';
import { BaseSiteService } from '../../facade/base-site.service';
import { SiteContextConfigLoaderService } from './site-context-config-loader.service';

class MockWindowRef implements Partial<WindowRef> {
  location = {
    href: 'testUrl',
  };
}

const mockBaseStore = {
  languages: [{ isocode: 'de' }, { isocode: 'en' }],
  defaultLanguage: { isocode: 'en' },
  currencies: [{ isocode: 'EUR' }, { isocode: 'USD' }],
  defaultCurrency: { isocode: 'EUR' },
};

const mockBaseSites = [
  {
    uid: 'test',
    urlPatterns: [''],
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

describe(`SiteContextConfigLoaderService`, () => {
  let service: SiteContextConfigLoaderService;
  let baseSiteService: BaseSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: WindowRef, useClass: MockWindowRef },
        {
          provide: JavaRegExpConverter,
          useValue: {
            toJsRegExp: jasmine.createSpy().and.callFake((x) => new RegExp(x)),
          },
        },
      ],
    });

    service = TestBed.inject(SiteContextConfigLoaderService);
    baseSiteService = TestBed.inject(BaseSiteService);
  });

  describe(`loadConfig - should return config based on the base site data`, () => {
    it(`should throw error when the base sites loaded are undefined`, async () => {
      spyOn(baseSiteService, 'getAll').and.returnValue(of(undefined));
      let message = false;
      service.loadConfig().subscribe(
        (_result) => {},
        (error) => (message = error)
      );
      expect(message).toBeTruthy();
    });

    it(`should throw error when the base sites loaded is an empty array`, async () => {
      spyOn(baseSiteService, 'getAll').and.returnValue(of([]));
      let message = false;
      service.loadConfig().subscribe(
        (_result) => {},
        (error) => (message = error)
      );
      expect(message).toBeTruthy();
    });

    it(`should throw error when no url pattern of any base site matches the current url`, async () => {
      service['isCurrentBaseSite'] = () => false;
      spyOn(baseSiteService, 'getAll').and.returnValue(of(mockBaseSites));

      let message = false;
      service.loadConfig().subscribe(
        (_result) => {},
        (error) => (message = error)
      );
      expect(message).toBeTruthy();
    });

    it(`should return config based on loaded sites data and current BROWSER url`, async () => {
      service['isCurrentBaseSite'] = () => true;
      spyOn(baseSiteService, 'getAll').and.returnValue(of(mockBaseSites));

      let result;
      service.loadConfig().subscribe((data) => (result = data));

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
