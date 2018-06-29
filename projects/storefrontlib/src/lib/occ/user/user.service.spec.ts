import { TestBed } from '@angular/core/testing';
import { OccUserService } from './user.service';
import { ConfigService } from '../config.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

const username: any = 'mockUsername';
const password: any = '1234';
const refreshToken = '5678';

const user: any = {
  username: username,
  password: password
};
const token: any = 'mockToken';
const endpoint = '/users';
const mockOauthEndpoint = '/authorizationserver/oauth/token';
const addressVerificationEndpoint = '/addresses/verification';
const addressesEndpoint = '/addresses';
const paymentDetailsEndpoint = '/paymentdetails';

class MockConfigService {
  server = {
    baseUrl: '',
    occPrefix: ''
  };

  site = {
    baseSite: ''
  };

  authentication = {
    client_id: '',
    client_secret: '',
    userToken: {}
  };
}

describe('OccUserService', () => {
  let service: OccUserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccUserService,
        { provide: ConfigService, useClass: MockConfigService }
      ]
    });

    service = TestBed.get(OccUserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load user details', () => {
    it('should load user details for given username abd access token', () => {
      service.loadUser(username).subscribe(result => {
        expect(result).toEqual(user);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === endpoint + `/${username}`;
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(user);
    });
  });

  describe('load user token', () => {
    it('should load user token for given username and password', () => {
      service.loadToken(username, password).subscribe(result => {
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

  describe('load address verification results', () => {
    it('should load address verification results for given user id and address', () => {
      const address = 'someAddress';
      const suggestedAddresses = ['address1', 'address2'];

      service.verifyAddress(username, address).subscribe(result => {
        expect(result).toEqual(suggestedAddresses);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url === endpoint + `/${username}` + addressVerificationEndpoint
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(suggestedAddresses);
    });
  });

  describe('load user addresses', () => {
    it('should load user addresses for a given user id', () => {
      const mockUserAddresses = { addresses: ['address1', 'address2'] };

      service.loadUserAddresses(username).subscribe(result => {
        expect(result).toEqual(mockUserAddresses);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === endpoint + `/${username}` + addressesEndpoint
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockUserAddresses);
    });
  });

  describe('load user payment methods', () => {
    it('should load user payment methods for a given user id', () => {
      const mockUserPaymentMethods = { payments: ['payment1', 'payment2'] };

      service.loadUserPaymentMethods(username).subscribe(result => {
        expect(result).toEqual(mockUserPaymentMethods);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === endpoint + `/${username}` + paymentDetailsEndpoint
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockUserPaymentMethods);
    });
  });

  describe('refresh user token', () => {
    it('should refresh user token for a given refresh_token', () => {
      service.refreshToken(refreshToken).subscribe(result => {
        expect(result).toEqual(token);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'POST' && req.url === mockOauthEndpoint;
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(token);
    });

    it('should catch refresh error', () => {
      service.refreshToken('invalid token').subscribe(
        _result => {},
        (error: HttpErrorResponse) => {
          expect(error.status).toBe(400);
          expect(error.statusText).toEqual('Error');
        }
      );

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'POST' && req.url === mockOauthEndpoint;
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(
        { error: 'Invalid refresh token' },
        { status: 400, statusText: 'Error' }
      );
    });
  });
});
