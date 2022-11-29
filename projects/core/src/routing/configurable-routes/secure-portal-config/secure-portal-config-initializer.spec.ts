import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { BaseSite } from '../../../model/misc.model';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';
import { SecurePortalConfigInitializer } from './secure-portal-config-initializer';
import { SiteContextConfig } from '../../../site-context/config/site-context-config';
import { ConfigInitializerService } from '../../../config';

const mockBaseSites = [
  {
    uid: 'test',
    urlPatterns: [''],
    urlEncodingAttributes: ['language', 'currency'],
    theme: 'test-theme',
    requiresAuthentication: true,
  },
];

const mockSiteContextConfig: SiteContextConfig = {
  context: {
    baseSite: ['test'],
  },
};

class MockConfigInitializerService
  implements Partial<ConfigInitializerService>
{
  getStable = () => of(mockSiteContextConfig);
}

class MockBaseSiteService {
  get(): Observable<BaseSite> {
    return of({});
  }
}

describe(`SecurePortalConfigInitializer`, () => {
  let initializer: SecurePortalConfigInitializer;
  let baseSiteService: BaseSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SecurePortalConfigInitializer,
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        {
          provide: ConfigInitializerService,
          useClass: MockConfigInitializerService,
        },
      ],
    });

    initializer = TestBed.inject(SecurePortalConfigInitializer);
    baseSiteService = TestBed.inject(BaseSiteService);
  });

  describe(`resolveConfig`, () => {
    it(`should throw error when the base site loaded is undefined or not found`, async () => {
      spyOn(baseSiteService, 'get').and.returnValue(of(undefined));
      let message = false;
      try {
        await initializer.configFactory();
      } catch (e: any) {
        message = e.message;
      }
      expect(message).toBeTruthy();
    });

    it(`should return routing config based on BaseSite.requiresAuthentication value`, async () => {
      spyOn(baseSiteService, 'get').and.returnValue(of(mockBaseSites[0]));

      const result = await initializer.configFactory();

      expect(baseSiteService.get).toHaveBeenCalled();
      expect(result).toEqual({
        routing: {
          protected: true,
        },
      });
    });
  });
});
