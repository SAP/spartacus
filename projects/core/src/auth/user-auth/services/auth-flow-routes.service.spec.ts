import { TestBed } from '@angular/core/testing';
import { RoutingConfig } from 'projects/core/src/routing/configurable-routes/config/routing-config';
import { UrlParsingService } from 'projects/core/src/routing/configurable-routes/url-translation/url-parsing.service';
import { AuthFlowRoutesService } from './auth-flow-routes.service';

class MockUrlParsingService implements Partial<UrlParsingService> {
  matchPath(urlSegments: string[], pathSegments: string[]): boolean {
    return urlSegments.join('/') === pathSegments.join('/');
  }
}

describe('AuthFlowRoutesService', () => {
  let service: AuthFlowRoutesService;
  let urlParsingService: UrlParsingService;

  beforeEach(() => {
    const mockConfig: RoutingConfig = {
      routing: {
        routes: {
          test: { paths: ['not/auth/flow'] },
          test2: { paths: ['login'], authFlow: true },
          test3: {
            paths: ['register/alias/one', 'register/alias/two'],
            authFlow: true,
          },
        },
      },
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

    service = TestBed.inject(AuthFlowRoutesService);
    urlParsingService = TestBed.inject(UrlParsingService);
  });

  describe('isAuthFlow', () => {
    describe(`when route is NOT configured as a part of the user auth flow`, () => {
      it('should return false', () => {
        const testUrl = 'not/auth/flow';
        spyOn(urlParsingService, 'matchPath').and.callFake(
          (_: string, path: string) => path === testUrl
        );
        expect(service.isAuthFlow(testUrl)).toBe(false);
      });
    });

    describe(`when route is configured as a part of the user auth flow`, () => {
      it('should return true for path without aliases', () => {
        const testUrl = 'login';
        spyOn(urlParsingService, 'matchPath').and.callFake(
          (_: string, path: string) => path === testUrl
        );
        expect(service.isAuthFlow(testUrl)).toBe(true);
      });

      it('should return true for its one path alias', () => {
        const testUrl = 'register/alias/one';
        spyOn(urlParsingService, 'matchPath').and.callFake(
          (_: string, path: string) => path === testUrl
        );
        expect(service.isAuthFlow(testUrl)).toBe(true);
      });

      it('should return true for its other path alias', () => {
        const testUrl = 'register/alias/two';
        spyOn(urlParsingService, 'matchPath').and.callFake(
          (_: string, path: string) => path === testUrl
        );
        expect(service.isAuthFlow(testUrl)).toBe(true);
      });
    });
  });
});
