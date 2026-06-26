import {
  HttpClient,
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  TestRequest,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SiteContextConfig, OccConfig } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { defaultOccConfig } from '../../config/default-occ-config';
import { CurrencyService } from '../../../site-context/facade/currency.service';
import { LanguageService } from '../../../site-context/facade/language.service';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { SiteContextInterceptor } from './site-context.interceptor';

const OccUrl = `https://localhost:9002${defaultOccConfig.backend?.occ?.prefix}electronics/`;

const mockSiteContextConfig: SiteContextConfig = {
  context: {
    baseSite: ['electronics'],
    language: [''],
    currency: [''],
  },
};

@Injectable()
class MockLanguageService {
  isocode = new BehaviorSubject<string | null>(null);
  getActive(): Observable<string | null> { return this.isocode; }
}

@Injectable()
class MockCurrencyService {
  isocode = new BehaviorSubject<string | null>(null);
  getActive(): Observable<string | null> { return this.isocode; }
}

@Injectable()
class MockOccEndpointsService {
  getBaseUrl() { return 'https://localhost:9002'; }
}

describe('SiteContextInterceptor', () => {
  const languageDe = 'de';
  const currencyJpy = 'JPY';

  let httpMock: HttpTestingController;
  let http: HttpClient;
  let currencyService: MockCurrencyService;
  let languageService: MockLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: CurrencyService, useClass: MockCurrencyService },
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        { provide: SiteContextConfig, useValue: mockSiteContextConfig },
        { provide: OccConfig, useValue: mockSiteContextConfig },
        {
          provide: HTTP_INTERCEPTORS,
          useFactory: (lang: MockLanguageService, curr: MockCurrencyService, occ: MockOccEndpointsService, cfg: SiteContextConfig) =>
            new SiteContextInterceptor(lang as any, curr as any, occ as any, cfg),
          deps: [LanguageService, CurrencyService, OccEndpointsService, SiteContextConfig],
          multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    currencyService = TestBed.inject(CurrencyService) as unknown as MockCurrencyService;
    languageService = TestBed.inject(LanguageService) as unknown as MockLanguageService;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should not add parameters: lang and curr to a request', () => {
    http.get('/xxx').subscribe((result) => {
      expect(result).toBeTruthy();
    });

    const mockReq: TestRequest = httpMock.expectOne((req) => req.method === 'GET');

    expect(mockReq.request.params.get('lang')).toEqual(null);
    expect(mockReq.request.params.get('curr')).toEqual(null);

    mockReq.flush('somedata');
  });

  it('should add parameters: lang and curr to a request', () => {
    languageService.isocode.next(languageDe);
    currencyService.isocode.next(currencyJpy);
    http.get(OccUrl).subscribe((result) => {
      expect(result).toBeTruthy();
    });

    const mockReq: TestRequest = httpMock.expectOne((req) => req.method === 'GET');

    expect(mockReq.request.params.get('lang')).toEqual(languageDe);
    expect(mockReq.request.params.get('curr')).toEqual(currencyJpy);

    mockReq.flush('somedata');
  });
});
