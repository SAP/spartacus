import {
  HttpClient,
  HttpHeaders,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { TOKEN_REVOCATION } from '../../occ/utils/interceptor-util';
import { TokenRevocationInterceptor } from './token-revocation.interceptor';

fdescribe('AuthErrorInterceptor', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenRevocationInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  it(`should remove the header TOKEN_REVOCATION form the request`, inject(
    [HttpClient],
    (http: HttpClient) => {
      const headers = new HttpHeaders({
        TOKEN_REVOCATION: 'true',
        mockHeader: 'true',
      });
      http.post('/test', {}, { headers }).subscribe();

      const mockReq: TestRequest = httpMock.expectOne(req => {
        return req.method === 'POST';
      });
      expect(mockReq.request.headers.get(TOKEN_REVOCATION)).toBeNull();
      expect(mockReq.request.headers.get('mockHeader')).toEqual('true');
      mockReq.flush({});
    }
  ));
});
