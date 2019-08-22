import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { OccConfig } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { InterceptorUtil } from '../../occ/utils/interceptor-util';
import { AuthService } from '../facade/auth.service';
import { UserToken } from '../models/token-types.model';
import { CustomerSupportAgentTokenInterceptor } from './csagent-token.interceptor';

const testToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
  userId: 'xxx',
} as UserToken;

class MockAuthService {
  getCustomerSupportAgentToken(): Observable<UserToken> {
    return of();
  }
}

const MockAuthModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: 'https://localhost:9002',
      prefix: '/rest/v2/',
    },
  },
  context: {
    baseSite: ['electronics'],
  },
};

describe('CustomerSupportAgentTokenInterceptor', () => {
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: OccConfig, useValue: MockAuthModuleConfig },
        { provide: AuthService, useClass: MockAuthService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CustomerSupportAgentTokenInterceptor,
          multi: true,
        },
      ],
    });
    httpMock = TestBed.get(HttpTestingController as Type<
      HttpTestingController
    >);
    authService = TestBed.get(AuthService as Type<AuthService>);
  });

  describe('Customer Support Agent Token Http Interceptor', () => {
    it('should not add the CSAgent token to the request by default', inject(
      [HttpClient],
      (http: HttpClient) => {
        spyOn(authService, 'getCustomerSupportAgentToken').and.returnValue(
          of(testToken)
        );

        http
          .get('https://localhost:9002/rest/v2/electronics/test')
          .subscribe(result => {
            expect(result).toBeTruthy();
          })
          .unsubscribe();

        const mockReq: TestRequest = httpMock.expectOne(
          'https://localhost:9002/rest/v2/electronics/test'
        );

        const authHeader: string = mockReq.request.headers.get('Authorization');

        expect(authHeader).toBe(null);
      }
    ));

    it('should add the CSAgent token to the request when the appropriate header flag is present', inject(
      [HttpClient],
      (http: HttpClient) => {
        spyOn(authService, 'getCustomerSupportAgentToken').and.returnValue(
          of(testToken)
        );
        spyOn<any>(InterceptorUtil, 'getInterceptorParam').and.returnValue(
          true
        );
        http
          .get('https://localhost:9002/rest/v2/electronics/test')
          .subscribe(result => {
            expect(result).toBeTruthy();
          })
          .unsubscribe();

        const mockReq: TestRequest = httpMock.expectOne(
          'https://localhost:9002/rest/v2/electronics/test'
        );
        const authHeader: string = mockReq.request.headers.get('Authorization');
        expect(authHeader).toBe(
          `${testToken.token_type} ${testToken.access_token}`
        );
      }
    ));
  });
});
