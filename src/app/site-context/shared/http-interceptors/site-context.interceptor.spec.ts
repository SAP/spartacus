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
import { of } from 'rxjs/observable/of';

class MockConfigService {
  server = {
    baseUrl: '',
    occPrefix: ''
  };

  site = {
    baseSite: '',
    language: 'en',
    currency: 'USD'
  };
}

fdescribe('SiteContextInterceptor', () => {
  const languageDe = 'de';
  const currencyJpy = 'JPY';
  const url = '/not-relevant-url';

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
    'should add parameters: lang and curr to a request',
    inject([HttpClient], (http: HttpClient) => {
      http.get(url).subscribe(result => {
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
