import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { ConfigService } from '../config.service';
import { OccClientAuthTokenService } from './client-auth-token.service';

const token: any = 'mockToken';
const mockOauthEndpoint = '/authorizationserver/oauth/token';

class MockConfigService {
  server = {
    baseUrl: ''
  };

  authentication = {
    client_id: '',
    client_sercret: ''
  };
}

describe('OccClientAuthTokenService', () => {
  let service: OccClientAuthTokenService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccClientAuthTokenService,
        { provide: ConfigService, useClass: MockConfigService }
      ]
    });

    service = TestBed.get(OccClientAuthTokenService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('loadTrustedClientToken', () => {
    it('Should fetch trusted client auth token', () => {
      service.loadTrustedClientToken().subscribe(result => {
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
