import { TestBed, inject } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { SiteContextInterceptor } from './site-context.interceptor';
import { BehaviorSubject } from 'rxjs';
import { LanguageService } from '../facade/language.service';
import { CurrencyService } from '../facade/currency.service';
import { OccConfig } from '../../occ/config/occ-config';

export class MockSiteContextModuleConfig {
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

const mockCurrencyService = {
  isocode: new BehaviorSubject(null),
  getActive() {
    return this.isocode;
  },
  setActive(isocode: string) {
    this.isocode.next(isocode);
  }
};
const mockLanguageService = {
  isocode: new BehaviorSubject(null),
  getActive() {
    return this.isocode;
  },
  setActive(isocode: string) {
    this.isocode.next(isocode);
  }
};
describe('SiteContextInterceptor', () => {
  const languageDe = 'de';
  const currencyJpy = 'JPY';

  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: LanguageService,
          useValue: mockLanguageService
        },
        {
          provide: CurrencyService,
          useValue: mockCurrencyService
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
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should not add parameters: lang and curr to a request', inject(
    [HttpClient],
    (http: HttpClient) => {
      http.get('/xxx').subscribe(result => {
        expect(result).toBeTruthy();
      });
      const mockReq = httpMock.expectOne(req => {
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
      mockLanguageService.setActive(languageDe);
      mockCurrencyService.setActive(currencyJpy);
      http
        .get('https://localhost:9002/rest/v2/electronics')
        .subscribe(result => {
          expect(result).toBeTruthy();
        });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET';
      });
      expect(mockReq.request.params.get('lang')).toEqual(languageDe);
      expect(mockReq.request.params.get('curr')).toEqual(currencyJpy);

      mockReq.flush('somedata');
    }
  ));
});
