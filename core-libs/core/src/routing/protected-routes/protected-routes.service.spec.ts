import { TestBed } from '@angular/core/testing';
import { RoutingConfig } from '../configurable-routes/config/routing-config';
import { UrlParsingService } from '../configurable-routes/url-translation/url-parsing.service';
import { ProtectedRoutesService } from './protected-routes.service';

class MockUrlParsingService implements Partial<UrlParsingService> {
  matchPath(urlSegments: string[], pathSegments: string[]): boolean {
    return urlSegments.join('/') === pathSegments.join('/');
  }
}

describe('ProtectedRoutesService', () => {
  let service: ProtectedRoutesService;

  function beforeEachWithConfig(routingConfig: RoutingConfig['routing']) {
    const mockConfig: RoutingConfig = {
      routing: routingConfig,
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingConfig,
          useValue: mockConfig,
        },
        {
          provide: UrlParsingService,
          useClass: MockUrlParsingService,
        },
      ],
    });

    service = TestBed.inject(ProtectedRoutesService);
  }

  describe('isUrlProtected', () => {
    describe(`when global protection is enabled and individual url's protection is undefined`, () => {
      beforeEach(() => {
        beforeEachWithConfig({
          protected: true,
          routes: {
            login: { paths: ['login'] },
          },
        });
      });

      it('should return true', () => {
        expect(service.isUrlProtected(['login'])).toBe(true);
      });
    });

    describe('when global protection is disabled and individual url is marked as protected', () => {
      beforeEach(() => {
        beforeEachWithConfig({
          protected: false,
          routes: {
            login: { paths: ['login'], protected: true },
          },
        });
      });

      it('should return false', () => {
        expect(service.isUrlProtected(['login'])).toBe(false);
      });
    });

    describe('when global protection is enabled and individual url is marked as protected', () => {
      beforeEach(() => {
        beforeEachWithConfig({
          protected: true,
          routes: {
            login: { paths: ['login'], protected: true },
          },
        });
      });

      it('should return true', () => {
        expect(service.isUrlProtected(['login'])).toBe(true);
      });
    });

    describe('when global protection is enabled and individual url is marked as NOT protected', () => {
      beforeEach(() => {
        beforeEachWithConfig({
          protected: true,
          routes: {
            login: { paths: ['login'], protected: false },
          },
        });
      });

      it('should return false', () => {
        expect(service.isUrlProtected(['login'])).toBe(false);
      });
    });

    describe('when global protection is enabled and two urls are marked as NOT protected', () => {
      beforeEach(() => {
        beforeEachWithConfig({
          protected: true,
          routes: {
            login: { paths: ['login'], protected: false },
            cart: { paths: ['cart'] },
            register: { paths: ['register'], protected: false },
          },
        });
      });

      it('should return false for each of them', () => {
        expect(service.isUrlProtected(['login'])).toBe(false);
        expect(service.isUrlProtected(['cart'])).toBe(true);
        expect(service.isUrlProtected(['register'])).toBe(false);
      });
    });
  });

  describe('shouldProtect', () => {
    describe('when app not protected', () => {
      beforeEach(() => {
        beforeEachWithConfig({
          protected: false,
          routes: {},
        });
      });

      it('should return false', () => {
        expect(service.shouldProtect).toBe(false);
      });
    });

    describe('when app protected', () => {
      beforeEach(() => {
        beforeEachWithConfig({
          protected: true,
          routes: {},
        });
      });

      it('should return true', () => {
        expect(service.shouldProtect).toBe(true);
      });
    });
  });
});
