import { TestBed } from '@angular/core/testing';
import {
  BaseSite,
  BaseSiteService,
  LanguageService,
  provideDefaultConfig,
  SiteAdapter,
} from '@spartacus/core';
import { MockRecaptchaApiConfig } from './mockRecaptcha/config/mock-recaptcha-api-config';
import { Observable, of } from 'rxjs';
import { MockRecaptchaService } from './mockRecaptcha/mock-recaptcha.service';

const mockLang = 'mock-lang';
const mockKey = 'mock-key';

class MockBaseSiteService {
  getActive(): Observable<string> {
    return of('mock-site');
  }
}

class MockLanguageService {
  getActive(): Observable<string> {
    return of(mockLang);
  }
}

class MockSiteAdapter {
  public loadBaseSite(siteUid?: string): Observable<BaseSite> {
    return of<BaseSite>({
      uid: siteUid,
      captchaConfig: {
        enabled: true,
        publicKey: mockKey,
      },
    });
  }
}

describe('RecaptchaService Service', () => {
  let languageService: LanguageService;
  let baseSiteService: BaseSiteService;
  let siteAdapter: SiteAdapter;
  let service: MockRecaptchaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockRecaptchaService,
        provideDefaultConfig(MockRecaptchaApiConfig),
        { provide: SiteAdapter, useClass: MockSiteAdapter },
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: LanguageService, useClass: MockLanguageService },
      ],
    });

    service = TestBed.inject(MockRecaptchaService);
    languageService = TestBed.inject(LanguageService);
    baseSiteService = TestBed.inject(BaseSiteService);
    siteAdapter = TestBed.inject(SiteAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize correctly', () => {
    spyOn(languageService, 'getActive').and.callThrough();
    spyOn(baseSiteService, 'getActive').and.callThrough();
    spyOn(siteAdapter, 'loadBaseSite').and.callThrough();
    service.initialize();
    expect(languageService.getActive).toHaveBeenCalledTimes(1);
    expect(baseSiteService.getActive).toHaveBeenCalledTimes(1);
    expect(siteAdapter.loadBaseSite).toHaveBeenCalledTimes(1);
  });

});
