import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { OccConfig, SiteContextConfig } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { defaultOccConfig } from '../../config/default-occ-config';
import { CurrencyService } from '../../../site-context/facade/currency.service';
import { LanguageService } from '../../../site-context/facade/language.service';
import { SiteContextInterceptor } from './site-context.interceptor';

const OccUrl = `https://localhost:9002${defaultOccConfig.backend.occ.prefix}electronics/`;
class MockCurrencyService {
  isocode = new BehaviorSubject(null);

  getActive(): Observable<string> {
    return this.isocode;
  }

  setActive(isocode: string) {
    this.isocode.next(isocode);
  }
}

class MockLanguageService {
  isocode = new BehaviorSubject(null);

  getActive(): Observable<string> {
    return this.isocode;
  }

  setActive(isocode: string) {
    this.isocode.next(isocode);
  }
}

class MockSiteContextModuleConfig {
  server = {
    baseUrl: 'https://localhost:9002',
    occPrefix: defaultOccConfig.backend.occ.prefix,
  };

  context = {
    baseSite: ['electronics'],
    language: [''],
    currency: [''],
  };
}

describe('SiteContextInterceptor', () => {
  const languageDe = 'de';
  const currencyJpy = 'JPY';

  let httpMock: HttpTestingController;
  let currencyService: CurrencyService;
  let languageService: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: LanguageService,
          useClass: MockLanguageService,
        },
        {
          provide: CurrencyService,
          useClass: MockCurrencyService,
        },
        {
          provide: SiteContextConfig,
          useClass: MockSiteContextModuleConfig,
        },
        {
          provide: OccConfig,
          useClass: MockSiteContextModuleConfig,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: SiteContextInterceptor,
          multi: true,
        },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    currencyService = TestBed.inject(CurrencyService);
    languageService = TestBed.inject(LanguageService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should not add parameters: lang and curr to a request', inject(
    [HttpClient],
    (http: HttpClient) => {
      http.get('/xxx').subscribe((result) => {
        expect(result).toBeTruthy();
      });
      const mockReq: TestRequest = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });

      expect(mockReq.request.params.get('lang')).toEqual(null);
      expect(mockReq.request.params.get('curr')).toEqual(null);

      mockReq.flush('somedata');
    }
  ));

  it('should add parameters: lang and curr to a request', inject(
    [HttpClient],
    (http: HttpClient) => {
      languageService.setActive(languageDe);
      currencyService.setActive(currencyJpy);
      http.get(OccUrl).subscribe((result) => {
        expect(result).toBeTruthy();
      });

      const mockReq: TestRequest = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });
      expect(mockReq.request.params.get('lang')).toEqual(languageDe);
      expect(mockReq.request.params.get('curr')).toEqual(currencyJpy);

      mockReq.flush('somedata');
    }
  ));
});
