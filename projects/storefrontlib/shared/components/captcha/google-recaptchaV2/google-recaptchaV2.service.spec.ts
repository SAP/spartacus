import { TestBed } from '@angular/core/testing';
import {
  BaseSite,
  BaseSiteService,
  LanguageService,
  provideDefaultConfig,
  ScriptLoader,
  SiteAdapter,
} from '@spartacus/core';
import { defaultGoogleRecaptchaApiConfig } from './config/default-google-recaptcha-api-config';
import { Observable, of } from 'rxjs';
import { GoogleRecaptchaV2Service } from './google-recaptchaV2.service';

const mockLang = 'mock-lang';
const mockKey = 'mock-key';

const mockEmbedParams = {
  src: 'https://www.google.com/recaptcha/api.js',
  params: { onload: 'onCaptchaLoad', render: 'explicit', hl: mockLang },
  attributes: { type: 'text/javascript' },
};

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

class MockScriptLoader {
  public embedScript(): void {}
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

describe('GoogleRecaptchaV2Service Service', () => {
  let scriptLoader: ScriptLoader;
  let languageService: LanguageService;
  let baseSiteService: BaseSiteService;
  let siteAdapter: SiteAdapter;
  let service: GoogleRecaptchaV2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GoogleRecaptchaV2Service,
        provideDefaultConfig(defaultGoogleRecaptchaApiConfig),
        { provide: SiteAdapter, useClass: MockSiteAdapter },
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: ScriptLoader, useClass: MockScriptLoader },
      ],
    });

    service = TestBed.inject(GoogleRecaptchaV2Service);
    languageService = TestBed.inject(LanguageService);
    baseSiteService = TestBed.inject(BaseSiteService);
    siteAdapter = TestBed.inject(SiteAdapter);
    scriptLoader = TestBed.inject(ScriptLoader);
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

  it('should load script', () => {
    spyOn(scriptLoader, 'embedScript').and.callThrough();
    spyOn(service, 'loadScript').and.callThrough();
    service.initialize();
    expect(service.loadScript).toHaveBeenCalledTimes(1);
    expect(service.loadScript).toHaveBeenCalledWith(mockEmbedParams.params);
    expect(scriptLoader.embedScript).toHaveBeenCalledTimes(1);
    expect(scriptLoader.embedScript).toHaveBeenCalledWith(mockEmbedParams);
  });

  it('should return captcha config', () => {
    service.getCaptchaConfig().subscribe((captchaConfig) => {
      expect(captchaConfig.publicKey).toEqual(mockKey);
      expect(captchaConfig.enabled).toEqual(true);
    });
    window.onCaptchaLoad();
  });
});
