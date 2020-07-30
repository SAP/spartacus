import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '../../../../occ/services/occ-endpoints.service';
import { AuthConfig } from '../../../user-auth/config/auth-config';
import { ClientToken } from '../../models/client-token.model';
import { ClientAuthenticationTokenService } from './client-authentication-token.service';

const token: ClientToken = {
  access_token: 'mockToken',
  token_type: 'mock',
  expires_in: 13123,
  scope: 'user',
};

const loginEndpoint = '/authorizationserver/oauth/token';

const MockAuthConfig: AuthConfig = {
  backend: {
    occ: {
      baseUrl: '',
      endpoints: {
        login: loginEndpoint,
      },
    },
  },
  authentication: {
    client_id: '',
    client_secret: '',
  },
};

class MockOccEndpointsService {
  getRawEndpoint(endpoint: string) {
    return (
      MockAuthConfig.backend.occ.baseUrl +
      MockAuthConfig.backend.occ.endpoints[endpoint]
    );
  }
}

describe('ClientAuthenticationTokenService', () => {
  let service: ClientAuthenticationTokenService;
  let httpMock: HttpTestingController;
  let occEndpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ClientAuthenticationTokenService,
        { provide: AuthConfig, useValue: MockAuthConfig },
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    service = TestBed.inject(ClientAuthenticationTokenService);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointsService = TestBed.inject(OccEndpointsService);
    spyOn(occEndpointsService, 'getRawEndpoint').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('loadClientAuthenticationToken', () => {
    it('Should fetch client auth token', () => {
      service.loadClientAuthenticationToken().subscribe((result) => {
        expect(result).toEqual(token);
      });

      const mockReq: TestRequest = httpMock.expectOne((req) => {
        return req.method === 'POST' && req.url === loginEndpoint;
      });

      expect(occEndpointsService.getRawEndpoint).toHaveBeenCalledWith('login');
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(token);
    });
  });
});
