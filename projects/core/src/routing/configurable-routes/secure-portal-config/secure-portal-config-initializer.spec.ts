import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { BaseSite } from '../../../model/misc.model';
import { JavaRegExpConverter } from '../../../util/java-reg-exp-converter/java-reg-exp-converter';
import { WindowRef } from '../../../window/window-ref';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';
import { SecurePortalConfigInitializer } from './secure-portal-config-initializer';

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
    requiresAuthentication: true,
  },
];

class MockBaseSiteService {
  getAll(): Observable<BaseSite> {
    return of({});
  }
}

describe(`SecurePortalConfigInitializer`, () => {
  let initializer: SecurePortalConfigInitializer;
  let baseSiteService: BaseSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: WindowRef, useClass: MockWindowRef },
        {
          provide: JavaRegExpConverter,
          useValue: {
            toJsRegExp: jasmine
              .createSpy()
              .and.callFake((x: any) => new RegExp(x)),
          },
        },
      ],
    });

    initializer = TestBed.inject(SecurePortalConfigInitializer);
    baseSiteService = TestBed.inject(BaseSiteService);
  });

  describe(`resolveConfig - context was not already configured statically`, () => {
    it(`should throw error when the base sites loaded are undefined`, async () => {
      spyOn(baseSiteService, 'getAll').and.returnValue(of(undefined));
      let message = false;
      try {
        await initializer.configFactory();
      } catch (e: any) {
        message = e.message;
      }
      expect(message).toBeTruthy();
    });

    it(`should throw error when the base sites loaded is an empty array`, async () => {
      spyOn(baseSiteService, 'getAll').and.returnValue(of([]));
      let message = false;
      try {
        await initializer.configFactory();
      } catch (e: any) {
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
      } catch (e: any) {
        message = e.message;
      }
      expect(message).toBeTruthy();
    });

    it(`should return routing config based on BaseSite.requiresAuthentication value`, async () => {
      initializer['isCurrentBaseSite'] = () => true;
      spyOn(baseSiteService, 'getAll').and.returnValue(of(mockBaseSites));

      const result = await initializer.configFactory();

      expect(baseSiteService.getAll).toHaveBeenCalled();
      expect(result).toEqual({
        routing: {
          protected: true,
        },
      });
    });
  });
});
