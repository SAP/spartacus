import { TestBed } from '@angular/core/testing';
import { AuthConfig } from 'angular-oauth2-oidc';
import { firstValueFrom, Observable, of } from 'rxjs';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';
import { BASE_SITE_CONTEXT_ID } from '../../../site-context/providers/context-ids';
import { SiteContextParamsService } from '../../../site-context/services';
import { AuthConfig as SpartacusAuthConfig } from '../config/auth-config';
import { OAuthAutoConfigureService } from './oauth-auto-configure.service';

class MockSpartacusAuthConfig implements Partial<SpartacusAuthConfig> {
  authentication = {
    autoConfigure: {
      baseSiteSuffix: false,
    },
  };
}

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

describe('OAuthAutoConfigureService', () => {
  let service: OAuthAutoConfigureService;
  let spartacusAuthConfig: SpartacusAuthConfig;
  let siteContextParamsService: SiteContextParamsService;
  let baseSiteService: BaseSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SpartacusAuthConfig, useClass: MockSpartacusAuthConfig },
        {
          provide: SiteContextParamsService,
          useClass: MockSiteContextParamsService,
        },
        { provide: BaseSiteService, useClass: MockBaseSiteService },
      ],
    });

    spartacusAuthConfig = TestBed.inject(SpartacusAuthConfig);
    siteContextParamsService = TestBed.inject(SiteContextParamsService);
    baseSiteService = TestBed.inject(BaseSiteService);

    service = TestBed.inject(OAuthAutoConfigureService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  describe('getConfig()', () => {
    const mockBaseConfig: AuthConfig = {
      redirectUri: 'https://example.com',
      clientId: 'my_client',
    };

    it('should not augment the auth config when baseSite is not in the URL context and baseSiteSuffix is false', async () => {
      (
        spartacusAuthConfig as MockSpartacusAuthConfig
      ).authentication.autoConfigure.baseSiteSuffix = false;
      spyOn(
        siteContextParamsService,
        'getUrlEncodingParameters'
      ).and.returnValue([]);

      const config = await firstValueFrom(service.getConfig(mockBaseConfig));

      expect(config).toEqual(mockBaseConfig);
    });

    describe('when baseSite is in the URL context', () => {
      beforeEach(() => {
        spyOn(
          siteContextParamsService,
          'getUrlEncodingParameters'
        ).and.returnValue([BASE_SITE_CONTEXT_ID]);
      });

      it('should augment the redirect URI when baseSite is in the URL context', async () => {
        const config = await firstValueFrom(service.getConfig(mockBaseConfig));

        expect(config.redirectUri).toBe(
          `https://example.com/${mockActiveBaseSite}`
        );
      });

      it('should handle URL-unsafe characters in the base-site', async () => {
        const unsafeBaseSite = 'a/b c';
        const expected = 'a%2Fb%20c';
        spyOn(baseSiteService, 'getActive').and.returnValue(of(unsafeBaseSite));

        const config = await firstValueFrom(service.getConfig(mockBaseConfig));

        expect(config.redirectUri).toBe(`https://example.com/${expected}`);
      });
    });

    describe('when baseSiteSuffix is enabled', () => {
      beforeEach(() => {
        (
          spartacusAuthConfig as MockSpartacusAuthConfig
        ).authentication.autoConfigure.baseSiteSuffix = true;
      });

      it('should augment the client ID with base site suffix when enabled in the auth config', async () => {
        const config = await firstValueFrom(service.getConfig(mockBaseConfig));

        expect(config.clientId).toBe(
          `${mockBaseConfig.clientId}_${mockActiveBaseSite}`
        );
      });
    });
  });
});
