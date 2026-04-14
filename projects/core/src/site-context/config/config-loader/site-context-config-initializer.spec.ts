import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { FederatedLoginService } from '../../../federated-login';
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

class MockFederatedLoginService implements Partial<FederatedLoginService> {
  enabled = false;
  isLoginDomain = false;
  origin: string | undefined = undefined;
  detectContext = jasmine.createSpy();
}

describe(`SiteContextConfigInitializer`, () => {
  let initializer: SiteContextConfigInitializer;
  let baseSiteService: BaseSiteService;
  let windowRef: WindowRef;
  let javaRegExpConverter: JavaRegExpConverter;
  let federatedLoginService: MockFederatedLoginService;

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
        {
          provide: FederatedLoginService,
          useClass: MockFederatedLoginService,
        },
      ],
    });

    initializer = TestBed.inject(SiteContextConfigInitializer);
    baseSiteService = TestBed.inject(BaseSiteService);
    windowRef = TestBed.inject(WindowRef);
    javaRegExpConverter = TestBed.inject(JavaRegExpConverter);
    federatedLoginService = TestBed.inject(
      FederatedLoginService
    ) as unknown as MockFederatedLoginService;
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

  describe(`resolveConfig - when federated login is enabled`, () => {
    const mockBaseSites = [
      {
        uid: 'storefront1',
        urlPatterns: ['^https://storefront\\.de$'],
        baseStore: mockBaseStore,
        urlEncodingAttributes: ['language', 'currency'],
        theme: 'theme',
      },
      {
        uid: 'storefront2',
        urlPatterns: ['^https://storefront\\.es$'],
        baseStore: mockBaseStore,
        urlEncodingAttributes: ['language', 'currency'],
        theme: 'theme',
      },
    ];

    beforeEach(() => {
      federatedLoginService.enabled = true;
      spyOn(baseSiteService, 'getAll').and.returnValue(of(mockBaseSites));
    });

    describe('when not on a login domain', () => {
      beforeEach(() => {
        federatedLoginService.isLoginDomain = false;
      });

      it('should call detectContext() to ensure federated login service is initialized', async () => {
        windowRef.location.href = 'https://storefront.es';

        await initializer.configFactory();

        expect(federatedLoginService.detectContext).toHaveBeenCalled();
      });

      it('should use default URL matching', async () => {
        federatedLoginService.isLoginDomain = false;
        windowRef.location.href = 'https://storefront.es';

        const result = await initializer.configFactory();

        expect(result?.context?.baseSite).toEqual(['storefront2']);
      });
    });

    describe('when on a login domain', () => {
      const originatingDomain = 'https://storefront.de';

      beforeEach(() => {
        federatedLoginService.isLoginDomain = true;
        federatedLoginService.origin = originatingDomain;
      });

      it('should match site by origin', async () => {
        const result = await initializer.configFactory();

        expect(result?.context?.baseSite).toEqual(['storefront1']);
      });

      it('should throw when no site matches the origin', async () => {
        federatedLoginService.origin = 'https://no-match.storefront.com';
        let message = '';

        try {
          await initializer.configFactory();
        } catch (e) {
          message = e.message;
        }

        expect(message).toBeTruthy();
      });

      it('should fall back to current URL matching when origin is undefined', async () => {
        federatedLoginService.origin = undefined;
        windowRef.location.href = 'https://storefront.es';

        const result = await initializer.configFactory();

        expect(result?.context?.baseSite).toEqual(['storefront2']);
      });
    });
  });
});
