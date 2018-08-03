import { TestBed, inject } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { SiteContextInterceptor } from './site-context.interceptor';
import { ConfigService } from './../../config.service';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from '../../../routing/store';
import * as fromStore from '../../shared/store';
import { of } from 'rxjs';

export class MockConfigService {
  server = {
    baseUrl: 'https://backoffice.christian-spartacus1-s2-public.model-t.myhybris.cloud',
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

  let store: Store<fromStore.SiteContextState>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          siteContext: combineReducers(fromStore.reducers)
        })
      ],
      providers: [
        {
          provide: ConfigService,
          useClass: MockConfigService
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: SiteContextInterceptor,
          multi: true
        }
      ]
    });

    store = TestBed.get(Store);
    httpMock = TestBed.get(HttpTestingController);
    spyOn(store, 'select').and.returnValues(of(languageDe), of(currencyJpy));
  });

  afterEach(() => {
    httpMock.verify();
  });

  it(
    'should not add parameters: lang and curr to a request',
    inject([HttpClient], (http: HttpClient) => {
      http.get('/xxx').subscribe(result => {
        expect(result).toBeTruthy();
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET';
      });
      expect(mockReq.request.params.get('lang')).toEqual(null);
      expect(mockReq.request.params.get('curr')).toEqual(null);

      mockReq.flush('somedata');
    })
  );

  it(
    'should add parameters: lang and curr to a request',
    inject([HttpClient], (http: HttpClient) => {
      http
        .get('https://backoffice.christian-spartacus1-s2-public.model-t.myhybris.cloud/rest/v2/electronics')
        .subscribe(result => {
          expect(result).toBeTruthy();
        });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET';
      });
      expect(mockReq.request.params.get('lang')).toEqual(languageDe);
      expect(mockReq.request.params.get('curr')).toEqual(currencyJpy);

      mockReq.flush('somedata');
    })
  );
});
