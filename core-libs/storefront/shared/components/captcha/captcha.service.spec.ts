import { TestBed } from '@angular/core/testing';
import {
  BaseSite,
  BaseSiteService,
  LanguageService,
  SiteAdapter,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CaptchaService } from './captcha.service';

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

class MyCaptchaService extends CaptchaService {
  renderCaptcha() {
    return of('false');
  }
}

describe('CaptchaService Service', () => {
  let languageService: LanguageService;
  let baseSiteService: BaseSiteService;
  let siteAdapter: SiteAdapter;
  let service: MyCaptchaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MyCaptchaService,
        { provide: SiteAdapter, useClass: MockSiteAdapter },
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: LanguageService, useClass: MockLanguageService },
      ],
    });

    service = TestBed.inject(MyCaptchaService);
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
