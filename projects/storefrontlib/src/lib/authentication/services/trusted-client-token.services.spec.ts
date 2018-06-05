import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../../occ/config.service';
import { TrustedClientTokenService } from './trusted-client-token.service';

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

describe('TrustedClientTokenService', () => {
  let service: TrustedClientTokenService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TrustedClientTokenService,
        { provide: ConfigService, useClass: MockConfigService }
      ]
    });

    service = TestBed.get(TrustedClientTokenService);
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
