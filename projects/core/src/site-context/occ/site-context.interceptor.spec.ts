import { TestBed, inject } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import * as NgrxStore from '@ngrx/store';
import { StoreModule, combineReducers } from '@ngrx/store';
import { SiteContextInterceptor } from './site-context.interceptor';
import * as fromRoot from '../../../../storefrontlib/src/lib/routing/store';
import * as fromStore from '../store/index';
import { BehaviorSubject } from 'rxjs';
import { SiteContextConfig } from '@spartacus/core';

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
const selectors = {
  getActiveCurrency: new BehaviorSubject(null),
  getActiveLanguage: new BehaviorSubject(null)
};

const mockSelect = selector => {
  switch (selector) {
    case fromStore.getActiveLanguage:
      return () => selectors.getActiveLanguage;

    case fromStore.getActiveCurrency:
      return () => selectors.getActiveCurrency;
  }
};

describe('SiteContextInterceptor', () => {
  const languageDe = 'de';
  const currencyJpy = 'JPY';

  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          siteContext: combineReducers(fromStore.getReducers())
        })
      ],
      providers: [
        {
          provide: SiteContextConfig,
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
    spyOnProperty(NgrxStore, 'select').and.returnValue(mockSelect);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should not add parameters: lang and curr to a request', inject(
    [HttpClient],
    (http: HttpClient) => {
      selectors.getActiveLanguage.next(null);
      selectors.getActiveCurrency.next(null);
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
      selectors.getActiveLanguage.next(languageDe);
      selectors.getActiveCurrency.next(currencyJpy);
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
