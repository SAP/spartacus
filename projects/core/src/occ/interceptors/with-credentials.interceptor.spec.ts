import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { defaultOccConfig } from '../config/default-occ-config';
import { OccConfig } from '../config/occ-config';
import { WithCredentialsInterceptor } from './with-credentials.interceptor';

const OccUrl = `https://localhost:9002${defaultOccConfig.backend.occ.prefix}/electronics/test`;
const NonOccUrl = 'https://other.com/endpoint';

describe('WithCredentialsInterceptor', () => {
  describe('useWithCredentials: true', () => {
    const MockAuthModuleConfig: OccConfig = {
      backend: {
        occ: {
          baseUrl: 'https://localhost:9002',
          prefix: defaultOccConfig.backend.occ.prefix,
          useWithCredentials: true,
        },
      },
    };

    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          { provide: OccConfig, useValue: MockAuthModuleConfig },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: WithCredentialsInterceptor,
            multi: true,
          },
        ],
      });
      httpMock = TestBed.inject(HttpTestingController);
    });

    it('should add the `withCredentials` flag to an OCC request', inject(
      [HttpClient],
      (http: HttpClient) => {
        http.get(OccUrl).subscribe().unsubscribe();

        const mockReq: TestRequest = httpMock.expectOne(OccUrl);

        expect(mockReq.request.withCredentials).toBe(true);
      }
    ));

    it('should not add the `withCredentials` flag to other request', inject(
      [HttpClient],
      (http: HttpClient) => {
        http.get(NonOccUrl).subscribe().unsubscribe();

        const mockReq: TestRequest = httpMock.expectOne(NonOccUrl);

        expect(mockReq.request.withCredentials).toBe(false);
      }
    ));
  });

  describe('useWithCredentials: false', () => {
    const MockAuthModuleConfig: OccConfig = {
      backend: {
        occ: {
          baseUrl: 'https://localhost:9002',
          prefix: defaultOccConfig.backend.occ.prefix,
        },
      },
    };

    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          { provide: OccConfig, useValue: MockAuthModuleConfig },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: WithCredentialsInterceptor,
            multi: true,
          },
        ],
      });
      httpMock = TestBed.inject(HttpTestingController);
    });

    it('should not add the `withCredentials` flag to an OCC request', inject(
      [HttpClient],
      (http: HttpClient) => {
        http.get(OccUrl).subscribe().unsubscribe();

        const mockReq: TestRequest = httpMock.expectOne(OccUrl);

        expect(mockReq.request.withCredentials).toBe(false);
      }
    ));
  });

  describe('custom prefix', () => {
    const MockAuthModuleConfig: OccConfig = {
      backend: {
        occ: {
          baseUrl: 'https://localhost:9002',
          prefix: '/my/prefix/',
          useWithCredentials: true,
        },
      },
    };

    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          { provide: OccConfig, useValue: MockAuthModuleConfig },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: WithCredentialsInterceptor,
            multi: true,
          },
        ],
      });
      httpMock = TestBed.inject(HttpTestingController);
    });

    it('should not add the `withCredentials` flag to request with wrong prefix', inject(
      [HttpClient],
      (http: HttpClient) => {
        http.get(OccUrl).subscribe().unsubscribe();
        const mockReq: TestRequest = httpMock.expectOne(OccUrl);
        expect(mockReq.request.withCredentials).toBe(false);
      }
    ));

    it('should add the `withCredentials` flag to request with configured prefix', inject(
      [HttpClient],
      (http: HttpClient) => {
        http.get('thirdparty.com/my/prefix/xyz').subscribe().unsubscribe();
        const mockReq: TestRequest = httpMock.expectOne(
          'thirdparty.com/my/prefix/xyz'
        );
        expect(mockReq.request.withCredentials).toBe(true);
      }
    ));
  });
});
