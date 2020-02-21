import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { KymaConfig } from '../../config/kyma-config';
import { OpenIdToken } from '../../models/kyma-token-types.model';
import { OpenIdAuthenticationTokenService } from './open-id-token.service';

const username = 'xxx@xxx.xxx';
const password = 'pwd';

const kymaClientId = 'test-client-id';
const kymaClientSecret = 'test-client-secret';

const token = {
  access_token: 'mockToken',
} as OpenIdToken;

const mockOauthEndpoint = '/authorizationserver/oauth/token';

const MockKymaConfig: KymaConfig = {
  backend: {
    occ: {
      baseUrl: '',
    },
  },
  authentication: {
    kyma_client_id: kymaClientId,
    kyma_client_secret: kymaClientSecret,
  },
};

describe('loadOpenIdAuthenticationToken', () => {
  let service: OpenIdAuthenticationTokenService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OpenIdAuthenticationTokenService,
        { provide: KymaConfig, useValue: MockKymaConfig },
      ],
    });

    service = TestBed.inject(OpenIdAuthenticationTokenService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('loadClientAuthenticationToken', () => {
    it('should load user token for given username and password', () => {
      service
        .loadOpenIdAuthenticationToken(username, password)
        .subscribe(result => {
          expect(result).toEqual(token);
        });

      const mockReq = httpMock.expectOne(
        req => req.method === 'POST' && req.url === mockOauthEndpoint
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(token);
    });
  });
});
