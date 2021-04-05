import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { BaseSite } from '../../../model/misc.model';
import { JavaRegExpConverter } from '../../../util/java-reg-exp-converter/java-reg-exp-converter';
import { WindowRef } from '../../../window/window-ref';
import { BaseSiteService } from '../../facade/base-site.service';
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

describe(`SiteContextConfigInitializer`, () => {
  let initializer: SiteContextConfigInitializer;
  let baseSiteService: BaseSiteService;
  let windowRef: WindowRef;
  let javaRegExpConverter: JavaRegExpConverter;

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

    initializer = TestBed.inject(SiteContextConfigInitializer);
    baseSiteService = TestBed.inject(BaseSiteService);
    windowRef = TestBed.inject(WindowRef);
    javaRegExpConverter = TestBed.inject(JavaRegExpConverter);
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

    it(`should return config based on the first base site that matches one of its url patterns with the current url`, async () => {
      windowRef.location.href = 'testUrl2';
      const baseSites = [
        {
          ...mockBaseSites[0],
          uid: 'test1',
          urlPatterns: ['^testUrl1$', '^testUrl11$'],
        },
        {
          ...mockBaseSites[0],
          uid: 'test2',
          urlPatterns: ['^testUrl2$', '^testUrl22$'],
        },
        {
          ...mockBaseSites[0],
          uid: 'test3',
          urlPatterns: ['^testUrl2$'],
        },
      ];
      spyOn(baseSiteService, 'getAll').and.returnValue(of(baseSites));

      const result = await initializer.configFactory();

      expect(javaRegExpConverter.toJsRegExp).toHaveBeenCalledTimes(3);
      expect(javaRegExpConverter.toJsRegExp).not.toHaveBeenCalledWith(
        '^testUrl22$'
      );
      expect(result?.context?.baseSite).toEqual(['test2']);
    });
  });
});
