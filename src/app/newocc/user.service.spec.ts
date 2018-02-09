import { TestBed } from '@angular/core/testing';
import { OccUserService } from '../newocc/user.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { ConfigService } from './config.service';

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
const mockOauthEndpoint = 'mockOauthEndpoint';

class MockConfigService {
  authentication = {
    client_id: 'mockClientId',
    client_secret: 'mockClientSecret',
    userToken: {}
  };
}

fdescribe('OccUserService', () => {
  let service: OccUserService;
  let config: ConfigService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        OccUserService,
        { provide: ConfigService, useClass: MockConfigService }
      ]
    });

    service = TestBed.get(OccUserService);
    httpClient = TestBed.get(HttpClient);
    config = TestBed.get(ConfigService);

    spyOn(service, 'getUserEndpoint').and.returnValue(
      'mockBaseEndpoint' + endpoint + '/'
    );
    spyOn(service, 'getOAuthEndpoint').and.returnValue('mockOauthEndpoint');
  });

  describe('load user details', () => {
    it('should load user details for given username abd access token', () => {
      spyOn(httpClient, 'get').and.returnValue(of(user));
      service.loadUser(username, accessToken).subscribe(result => {
        expect(result).toEqual(user);
      });

      expect(httpClient.get).toHaveBeenCalledWith(
        'mockBaseEndpoint' + endpoint + '/' + username,
        jasmine.any(Object)
      );
    });
  });

  describe('load user token', () => {
    it('should load user token for given username and password', () => {
      spyOn(httpClient, 'post').and.returnValue(of(token));
      service.loadToken(username, password).subscribe(result => {
        expect(result).toEqual(token);
      });

      expect(httpClient.post).toHaveBeenCalledWith(
        mockOauthEndpoint,
        mockCredentials,
        jasmine.any(Object)
      );
    });
  });
});
