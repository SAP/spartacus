import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { USE_CUSTOMER_SUPPORT_AGENT_TOKEN } from '../../occ/utils/interceptor-util';
import { CustomerSupportAgentAuthErrorInterceptor } from './csagent-auth-error.interceptor';
import { CustomerSupportAgentErrorHandlingService } from '../services/index';

class MockCustomerSupportAgentErrorHandlingService {
  terminateCustomerSupportAgentExpiredSession(): void {}
}

describe('AuthErrorInterceptor', () => {
  let httpMock: HttpTestingController;
  let csagentErrorHandlingService: CustomerSupportAgentErrorHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: CustomerSupportAgentErrorHandlingService,
          useClass: MockCustomerSupportAgentErrorHandlingService,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CustomerSupportAgentAuthErrorInterceptor,
          multi: true,
        },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    csagentErrorHandlingService = TestBed.inject(
      CustomerSupportAgentErrorHandlingService
    );
    spyOn(
      csagentErrorHandlingService,
      'terminateCustomerSupportAgentExpiredSession'
    ).and.stub();
  });

  it(`should catch 401 error for a csagent request`, inject(
    [HttpClient],
    (http: HttpClient) => {
      const headers = new HttpHeaders().set(
        USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
        'true'
      );
      const options = {
        headers,
      };
      http.get('/test', options).subscribe(result => {
        expect(result).toBeTruthy();
      });

      const mockReq: TestRequest = httpMock.expectOne(req => {
        return req.method === 'GET';
      });
      mockReq.flush(
        {
          errors: [
            {
              type: 'InvalidTokenError',
              message: 'Invalid access token: some token',
            },
          ],
        },
        { status: 401, statusText: 'Error' }
      );
      expect(
        csagentErrorHandlingService.terminateCustomerSupportAgentExpiredSession
      ).toHaveBeenCalled();
    }
  ));
});
