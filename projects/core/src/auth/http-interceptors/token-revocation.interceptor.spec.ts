import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Observable, throwError } from 'rxjs';
import { TOKEN_REVOCATION } from '../../occ/utils/interceptor-util';
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

    httpMock = TestBed.get(HttpTestingController);
    tokenRevocationInterceptor = TestBed.get(TokenRevocationInterceptor);
  });

  it('should be created', () => {
    expect(tokenRevocationInterceptor).toBeTruthy();
  });

  it('should remove the header TOKEN_REVOCATION form the request', inject(
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

  describe('Error Handling', () => {
    it('should re-throw error if request is not a token revocation request.', inject(
      [HttpClient],
      (http: HttpClient) => {
        spyOn<any>(tokenRevocationInterceptor, 'isTokenRevocationRequest').and.returnValue(
          false
        );
        http.post('/test', {}, {}).subscribe();

        const mockReq: TestRequest = httpMock.expectOne(req => {
          return req.method === 'POST';
        });

        let resultError;
        tokenRevocationInterceptor.intercept(mockReq.request, new MockHandler()).subscribe(
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
        spyOn<any>(tokenRevocationInterceptor, 'isTokenRevocationRequest').and.returnValue(
          true
        );
        http.post('/test', {}, {}).subscribe();

        const mockReq: TestRequest = httpMock.expectOne(req => {
          return req.method === 'POST';
        });
        let resultCompleted = false;
        tokenRevocationInterceptor.intercept(mockReq.request, new MockHandler()).subscribe(
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
});
