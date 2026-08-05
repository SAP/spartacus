import { TestBed } from '@angular/core/testing';
import { Config, ConfigInitializerService, WindowRef } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';
import { BASE_SITE_CONTEXT_ID } from '../../../site-context/providers/context-ids';
import { SiteContextParamsService } from '../../../site-context/services';
import { AuthConfig } from '../config/auth-config';
import { AuthConfigInitializer } from './auth-config-initializer';

const mockClientId = 'mobile_android_public';
const mockAuthConfig = {
  authentication: {
    client_id: mockClientId,
    OAuthLibConfig: {
      redirectUri: undefined as string | undefined,
    },
    initializerOptions: {
      baseSiteSuffix: false as NonNullable<
        NonNullable<AuthConfig['authentication']>['initializerOptions']
      >['baseSiteSuffix'],
      addBaseSiteToRedirectUri: false as NonNullable<
        NonNullable<AuthConfig['authentication']>['initializerOptions']
      >['addBaseSiteToRedirectUri'],
    },
  },
} satisfies AuthConfig;

const mockActiveBaseSite = 'activeBaseSite';
class MockBaseSiteService implements Partial<BaseSiteService> {
  getActive(): Observable<string> {
    return of(mockActiveBaseSite);
  }
}

class MockSiteContextParamsService
  implements Partial<SiteContextParamsService>
{
  getUrlEncodingParameters() {
    return [];
  }
}

class MockConfigInitializerService
  implements Partial<ConfigInitializerService>
{
  getStable(..._scopes: string[]): Observable<Config> {
    return of({});
  }
}

const mockOrigin = 'http://localhost:4200';
class MockWindowRef implements Partial<WindowRef> {
  nativeWindow = { location: { origin: mockOrigin } } as Window;
  isBrowser(): boolean {
    return true;
  }
}

describe('AuthConfigInitializer', () => {
  let service: AuthConfigInitializer;
  let authConfig: typeof mockAuthConfig;
  let siteContextParamsService: SiteContextParamsService;
  let baseSiteService: BaseSiteService;
  let configInitializerService: ConfigInitializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthConfig, useValue: structuredClone(mockAuthConfig) },
        {
          provide: SiteContextParamsService,
          useClass: MockSiteContextParamsService,
        },
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        {
          provide: ConfigInitializerService,
          useClass: MockConfigInitializerService,
        },
        { provide: WindowRef, useClass: MockWindowRef },
      ],
    });

    authConfig = TestBed.inject(AuthConfig) as typeof mockAuthConfig;
    configInitializerService = TestBed.inject(ConfigInitializerService);
    spyOn(configInitializerService, 'getStable').and.returnValue(
      of(authConfig)
    );
    siteContextParamsService = TestBed.inject(SiteContextParamsService);
    baseSiteService = TestBed.inject(BaseSiteService);

    service = TestBed.inject(AuthConfigInitializer);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  describe('configFactory()', () => {
    describe('when addBaseSiteToRedirectUri is false', () => {
      beforeEach(() => {
        authConfig.authentication.initializerOptions.addBaseSiteToRedirectUri =
          false;
      });

      describe('when redirectUri is undefined', () => {
        it('should initialize the auth config redirectUri to the default', async () => {
          const expected: AuthConfig = {
            authentication: {
              client_id: mockClientId,
              OAuthLibConfig: {
                redirectUri: mockOrigin,
              },
            },
          };

          const config = await service.configFactory();

          expect(config).toEqual(expected);
        });
      });

      describe('when a redirectUri is defined', () => {
        const definedRedirectUri = 'https://example.com';
        beforeEach(() => {
          authConfig.authentication.OAuthLibConfig.redirectUri =
            definedRedirectUri;
        });

        it('should initialize the auth config to the existing redirectUri', async () => {
          const expected: AuthConfig = {
            authentication: {
              client_id: mockClientId,
              OAuthLibConfig: {
                redirectUri: definedRedirectUri,
              },
            },
          };

          const config = await service.configFactory();

          expect(config).toEqual(expected);
        });
      });
    });

    describe('when addBaseSiteToRedirectUri is true', () => {
      beforeEach(() => {
        authConfig.authentication.initializerOptions.addBaseSiteToRedirectUri =
          true;
      });

      it('should initialize the redirect URI', async () => {
        const expected = `${mockOrigin}/${mockActiveBaseSite}`;
        const config = await service.configFactory();

        expect(config.authentication?.OAuthLibConfig?.redirectUri).toEqual(
          expected
        );
      });

      it('should escape URL-unsafe characters in the base-site', async () => {
        const unsafeBaseSite = 'a/b c';
        const expected = `${mockOrigin}/a%2Fb%20c`;
        spyOn(baseSiteService, 'getActive').and.returnValue(of(unsafeBaseSite));

        const config = await service.configFactory();

        expect(config.authentication?.OAuthLibConfig?.redirectUri).toBe(
          expected
        );
      });
    });

    describe('when addBaseSiteToRedirectUri is auto', () => {
      beforeEach(() => {
        authConfig.authentication.initializerOptions.addBaseSiteToRedirectUri =
          'auto';
      });
      it('should initialize the redirect URI when baseSite is in the URL context parameters', async () => {
        spyOn(
          siteContextParamsService,
          'getUrlEncodingParameters'
        ).and.returnValue([BASE_SITE_CONTEXT_ID]);
        const expected = `${mockOrigin}/${mockActiveBaseSite}`;
        const config = await service.configFactory();

        expect(config.authentication?.OAuthLibConfig?.redirectUri).toEqual(
          expected
        );
      });
    });

    describe('when baseSiteSuffix is false', () => {
      beforeEach(() => {
        authConfig.authentication.initializerOptions.baseSiteSuffix = false;
      });

      it('should not change client ID', async () => {
        const expected: AuthConfig = {
          authentication: {
            client_id: mockClientId,
            OAuthLibConfig: {
              redirectUri: mockOrigin,
            },
          },
        };

        const config = await service.configFactory();

        expect(config).toEqual(expected);
      });
    });

    describe('when baseSiteSuffix is true', () => {
      beforeEach(() => {
        authConfig.authentication.initializerOptions.baseSiteSuffix = true;
      });

      it('should suffix the client ID with the base site', async () => {
        const expected = `${mockClientId}_${mockActiveBaseSite}`;

        const config = await service.configFactory();

        expect(config.authentication?.client_id).toEqual(expected);
      });
    });

    describe('when baseSiteSuffix is auto', () => {
      beforeEach(() => {
        authConfig.authentication.initializerOptions.baseSiteSuffix = 'auto';
      });
      it('should suffix the client ID with the base site when baseSite is in the URL context parameters', async () => {
        spyOn(
          siteContextParamsService,
          'getUrlEncodingParameters'
        ).and.returnValue([BASE_SITE_CONTEXT_ID]);
        const expected = `${mockClientId}_${mockActiveBaseSite}`;
        const config = await service.configFactory();

        expect(config.authentication?.client_id).toEqual(expected);
      });
    });

    describe('initialization race conditions', () => {
      let expected: Config;
      beforeEach(() => {
        authConfig.authentication.initializerOptions.baseSiteSuffix = true;
        authConfig.authentication.initializerOptions.addBaseSiteToRedirectUri =
          true;

        expected = <Config>{
          authentication: {
            client_id: `${mockClientId}_${mockActiveBaseSite}`,
            OAuthLibConfig: {
              redirectUri: `http://localhost:4200/${mockActiveBaseSite}`,
            },
          },
        };
      });

      it('should handle slow baseSite request', async () => {
        spyOn(baseSiteService, 'getActive').and.returnValue(
          of(mockActiveBaseSite).pipe(delay(10))
        );

        const config = await service.configFactory();

        expect(config).toEqual(expected);
      });

      it('should handle slow config request', async () => {
        (configInitializerService.getStable as jasmine.Spy).and.returnValue(
          of(authConfig).pipe(delay(10))
        );

        const config = await service.configFactory();

        expect(config).toEqual(expected);
      });
    });
  });
});
