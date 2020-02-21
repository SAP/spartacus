import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Observable, throwError } from 'rxjs';
import { TOKEN_REVOCATION_HEADER } from '../../occ/utils/interceptor-util';
import { TokenRevocationInterceptor } from './token-revocation.interceptor';

const mockErrorStatusText = 'Mock error';
class MockHandler {
  handle(_req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return throwError(
      new HttpErrorResponse({ statusText: mockErrorStatusText })
    );
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
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    tokenRevocationInterceptor = TestBed.inject(TokenRevocationInterceptor);
  });

  it('should be created', () => {
    expect(tokenRevocationInterceptor).toBeTruthy();
  });

  it('should remove the header TOKEN_REVOCATION_HEADER form the request', inject(
    [HttpClient],
    (http: HttpClient) => {
      const headers = new HttpHeaders({
        [TOKEN_REVOCATION_HEADER]: 'true',
        mockHeader: 'true',
      });
      expect(headers.get(TOKEN_REVOCATION_HEADER)).toBeTruthy();

      http.post('/test', {}, { headers }).subscribe();

      const mockReq: TestRequest = httpMock.expectOne(req => {
        return req.method === 'POST';
      });
      expect(mockReq.request.headers.get(TOKEN_REVOCATION_HEADER)).toBeNull();
      expect(mockReq.request.headers.get('mockHeader')).toEqual('true');
      mockReq.flush({});
    }
  ));

  describe('Error Handling', () => {
    it('should re-throw error if request is not a token revocation request.', inject(
      [HttpClient],
      (http: HttpClient) => {
        spyOn<any>(
          tokenRevocationInterceptor,
          'isTokenRevocationRequest'
        ).and.returnValue(false);
        http.post('/test', {}, {}).subscribe();

        const mockReq: TestRequest = httpMock.expectOne(req => {
          return req.method === 'POST';
        });

        let resultError;
        tokenRevocationInterceptor
          .intercept(mockReq.request, new MockHandler())
          .subscribe(
            _success => fail(),
            error => {
              resultError = error;
            },
            () => fail()
          );
        expect(resultError.statusText).toEqual(mockErrorStatusText);
      }
    ));

    it('should fail silently (stop the interceptor chain) if an error occurs on a token revocation request', inject(
      [HttpClient],
      (http: HttpClient) => {
        spyOn<any>(
          tokenRevocationInterceptor,
          'isTokenRevocationRequest'
        ).and.returnValue(true);
        http.post('/test', {}, {}).subscribe();

        const mockReq: TestRequest = httpMock.expectOne(req => {
          return req.method === 'POST';
        });
        let resultCompleted = false;
        tokenRevocationInterceptor
          .intercept(mockReq.request, new MockHandler())
          .subscribe(
            _success => fail(),
            _error => fail(),
            () => {
              resultCompleted = true;
            }
          );
        expect(resultCompleted).toBeTruthy();
      }
    ));
  });
  describe('isTokenRevocationRequest', () => {
    it('should be true when the request has the token revocation header.', inject(
      [HttpClient],
      (http: HttpClient) => {
        http.post('/test', {}, {}).subscribe();
        const testRequest: TestRequest = httpMock.expectOne(req => {
          return req.method === 'POST';
        });

        const headers = new HttpHeaders({
          [TOKEN_REVOCATION_HEADER]: 'true',
        });
        const mockRequest: HttpRequest<any> = testRequest.request.clone({
          headers,
        });
        expect(mockRequest.headers.get(TOKEN_REVOCATION_HEADER)).toBeTruthy();
        const isTokenRevocationRequest = tokenRevocationInterceptor[
          'isTokenRevocationRequest'
        ](mockRequest);
        expect(isTokenRevocationRequest).toBeTruthy();
      }
    ));

    it('should be false when the request does not have the token revocation header.', inject(
      [HttpClient],
      (http: HttpClient) => {
        http.post('/test', {}, {}).subscribe();
        const testRequest: TestRequest = httpMock.expectOne(req => {
          return req.method === 'POST';
        });

        const headers = new HttpHeaders();
        const mockRequest: HttpRequest<any> = testRequest.request.clone({
          headers,
        });
        expect(mockRequest.headers.get(TOKEN_REVOCATION_HEADER)).toBeNull();
        const isTokenRevocationRequest = tokenRevocationInterceptor[
          'isTokenRevocationRequest'
        ](mockRequest);
        expect(isTokenRevocationRequest).toBeFalsy();
      }
    ));
  });
});
