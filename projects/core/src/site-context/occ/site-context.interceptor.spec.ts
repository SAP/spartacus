import { TestBed, inject } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';

import { of, Observable } from 'rxjs';

import { CurrencyService } from '../facade/currency.service';
import { LanguageService } from '../facade/language.service';
import { OccConfig } from '../../occ/config/occ-config';

import { SiteContextInterceptor } from './site-context.interceptor';

class MockCurrencyService extends CurrencyService {
  getActive(): Observable<string> {
    return of();
  }
}

class MockLanguageService extends LanguageService {
  getActive(): Observable<string> {
    return of();
  }
}

export class MockSiteContextModuleConfig extends CurrencyService {
  server = {
    baseUrl: 'https://localhost:9002',
    occPrefix: '/rest/v2/'
  };

  site = {
    baseSite: 'electronics',
    language: '',
    currency: ''
  };
}

describe('SiteContextInterceptor', () => {
  const languageDe = 'de';
  const currencyJpy = 'JPY';

  let httpMock: HttpTestingController;
  let currencyService: MockCurrencyService;
  let languageService: MockLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: LanguageService,
          useClass: MockLanguageService
        },
        {
          provide: CurrencyService,
          useClass: MockCurrencyService
        },
        {
          provide: OccConfig,
          useClass: MockSiteContextModuleConfig
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: SiteContextInterceptor,
          multi: true
        }
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    currencyService = TestBed.get(CurrencyService);
    languageService = TestBed.get(LanguageService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should not add parameters: lang and curr to a request', inject(
    [HttpClient],
    (http: HttpClient) => {
      spyOn(currencyService, 'getActive').and.returnValue(of());
      spyOn(languageService, 'getActive').and.returnValue(of());

      http.get('/xxx').subscribe(result => {
        expect(result).toBeTruthy();
      });
      const mockReq: TestRequest = httpMock.expectOne(req => {
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
      spyOn(currencyService, 'getActive').and.returnValue(of(currencyJpy));
      spyOn(languageService, 'getActive').and.returnValue(of(languageDe));

      http
        .get('https://localhost:9002/rest/v2/electronics')
        .subscribe(result => {
          expect(result).toBeTruthy();
        });

      const mockReq: TestRequest = httpMock.expectOne(req => {
        return req.method === 'GET';
      });
      expect(mockReq.request.params.get('lang')).toEqual(languageDe);
      expect(mockReq.request.params.get('curr')).toEqual(currencyJpy);

      mockReq.flush('somedata');
    }
  ));
});
