import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ClientAuthenticationTokenService } from './client-authentication-token.service';
import { AuthModuleConfig } from '../../auth-module.config';
import { ClientToken } from '../../models/token-types.model';

const token: ClientToken = {
  access_token: 'mockToken',
  token_type: 'mock',
  expires_in: 13123,
  scope: 'user'
};
const mockOauthEndpoint = '/authorizationserver/oauth/token';

const MockAuthModuleConfig = {
  server: {
    baseUrl: ''
  },

  authentication: {
    client_id: '',
    client_sercret: ''
  }
};

describe('ClientAuthenticationTokenService', () => {
  let service: ClientAuthenticationTokenService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ClientAuthenticationTokenService,
        { provide: AuthModuleConfig, useValue: MockAuthModuleConfig }
      ]
    });

    service = TestBed.get(ClientAuthenticationTokenService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('loadClientAuthenticationToken', () => {
    it('Should fetch client auth token', () => {
      service.loadClientAuthenticationToken().subscribe(result => {
        expect(result).toEqual(token);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'POST' && req.url === mockOauthEndpoint;
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(token);
    });
  });
});
