import { TestBed } from '@angular/core/testing';
import { OccUserService } from './user.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { ConfigService } from '../config.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

const username: any = 'mockUsername';
const password: any = '1234';
const accessToken: any = 'mockAccessToken'

const user: any = {
  username: username,
  password: password
};
const token: any = 'mockToken';
const endpoint = '/users';
const mockCredentials =
  'client_id=mockClientId&client_secret=mockClientSecret&grant_type=password&username=mockUsername&password=1234';
const mockOauthEndpoint = '/authorizationserver/oauth/token';

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

fdescribe('OccUserService', () => {
  let service: OccUserService;
  let config: ConfigService;
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
    config = TestBed.get(ConfigService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load user details', () => {
    it('should load user details for given username abd access token', () => {
      service.loadUser(username, accessToken).subscribe(result => {
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
});
