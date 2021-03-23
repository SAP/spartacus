import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { FeatureConfigService } from '../../../features-config/services/feature-config.service';
import { BaseSite } from '../../../model/misc.model';
import { JavaRegExpConverter } from '../../../util/java-reg-exp-converter/java-reg-exp-converter';
import { WindowRef } from '../../../window/window-ref';
import { BaseSiteService } from '../../facade/base-site.service';
import { SiteContextConfig } from '../site-context-config';
import { SiteContextConfigInitializer } from './site-context-config-initializer';

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

// TODO(#11515): remove it in 4.0
class MockFeatureConfigService {
  isLevel() {
    return true;
  }
}

class MockSiteContextConfig {
  context = {};
}

describe(`SiteContextConfigInitializer`, () => {
  let initializer: SiteContextConfigInitializer;
  let baseSiteService: BaseSiteService;
  let config: SiteContextConfig;

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
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
        { provide: SiteContextConfig, useClass: MockSiteContextConfig },
      ],
    });

    initializer = TestBed.inject(SiteContextConfigInitializer);
    baseSiteService = TestBed.inject(BaseSiteService);
    config = TestBed.inject(SiteContextConfig);
  });

  describe(`resolveConfig - context was already configured statically`, () => {
    it(`should return empty object`, async () => {
      config.context = {
        baseSite: ['electronics'],
      };
      const result = await initializer.configFactory();
      expect(result).toEqual({});
    });
  });

  describe(`resolveConfig - context was not already configured statically`, () => {
    it(`should throw error when the base sites loaded are undefined`, async () => {
      spyOn(baseSiteService, 'getAll').and.returnValue(of(undefined));
      let message = false;
      try {
        await initializer.configFactory();
      } catch (e) {
        message = e.message;
      }
      expect(message).toBeTruthy();
    });

    it(`should throw error when the base sites loaded is an empty array`, async () => {
      spyOn(baseSiteService, 'getAll').and.returnValue(of([]));
      let message = false;
      try {
        await initializer.configFactory();
      } catch (e) {
        message = e.message;
      }
      expect(message).toBeTruthy();
    });

    it(`should throw error when no url pattern of any base site matches the current url`, async () => {
      initializer['isCurrentBaseSite'] = () => false;
      spyOn(baseSiteService, 'getAll').and.returnValue(of(mockBaseSites));

      let message = false;
      try {
        await initializer.configFactory();
      } catch (e) {
        message = e.message;
      }
      expect(message).toBeTruthy();
    });

    it(`should return config based on loaded sites data`, async () => {
      initializer['isCurrentBaseSite'] = () => true;
      spyOn(baseSiteService, 'getAll').and.returnValue(of(mockBaseSites));

      const result = await initializer.configFactory();

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
