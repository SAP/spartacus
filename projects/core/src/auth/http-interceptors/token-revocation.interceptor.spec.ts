import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';
import { OccEndpointsService } from '../../occ';
import { AuthStorageService } from '../facade/auth-storage.service';
import { TokenRevocationInterceptor } from './token-revocation.interceptor';

class MockOccEndpointsService {
  getRawEndpoint() {
    return '/revoke';
  }
}

class MockAuthStorageService {
  getItem(a) {
    if (a === 'token_type') {
      return '"Bearer"';
    } else if (a === 'access_token') {
      return 'acc_token';
    }
  }
}

describe('TokenRevocationInterceptor', () => {
  let httpMock: HttpTestingController;
  let tokenRevocationInterceptor: TokenRevocationInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenRevocationInterceptor,
          multi: true,
        },
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
        {
          provide: AuthStorageService,
          useClass: MockAuthStorageService,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    tokenRevocationInterceptor = TestBed.inject(TokenRevocationInterceptor);
  });

  it('should be created', () => {
    expect(tokenRevocationInterceptor).toBeTruthy();
  });

  it(`Should not add 'Authorization' header for non revoke requests`, inject(
    [HttpClient],
    (http: HttpClient) => {
      const sub: Subscription = http.get('/xxx').subscribe((result) => {
        expect(result).toBeTruthy();
      });

      const mockReq: TestRequest = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });

      const authHeader: string = mockReq.request.headers.get('Authorization');
      expect(authHeader).toBeFalsy();
      expect(authHeader).toEqual(null);

      mockReq.flush('someData');
      sub.unsubscribe();
    }
  ));

  it(`Should add 'Authorization' header for revoke request`, inject(
    [HttpClient],
    (http: HttpClient) => {
      const sub: Subscription = http.get('/revoke').subscribe((result) => {
        expect(result).toBeTruthy();
      });

      const mockReq: TestRequest = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });

      const authHeader: string = mockReq.request.headers.get('Authorization');
      expect(authHeader).toBeTruthy();
      expect(authHeader).toEqual(`Bearer acc_token`);

      mockReq.flush('someData');
      sub.unsubscribe();
    }
  ));
});
