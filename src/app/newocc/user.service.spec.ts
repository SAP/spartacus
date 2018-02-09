import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { OccUserService } from '../newocc/user.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ConnectionBackend } from '@angular/http';
import { BaseService } from '../newocc/base.service';
import { of } from 'rxjs/observable/of';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from './config.service';
import { Http } from '@angular/http';

const username: any = 'mockUsername';
const password: any = '1234';
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
  let baseService: BaseService;
  let config: ConfigService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, HttpClientModule, BrowserModule],
      providers: [
        OccUserService,
        BaseService,
        { provide: ConfigService, useClass: MockConfigService }
      ]
    });

    service = TestBed.get(OccUserService);
    baseService = TestBed.get(BaseService);
    httpClient = TestBed.get(HttpClient);
    config = TestBed.get(ConfigService);

    spyOn(service, 'getUserEndpoint').and.returnValue(
      'mockBaseEndpoint' + endpoint + '/'
    );
    spyOn(service, 'getOAuthEndpoint').and.returnValue('mockOauthEndpoint');

    spyOn(httpClient, 'get').and.returnValue(of(user));
    spyOn(httpClient, 'post').and.returnValue(of(token));
  });

  describe('load user details', () => {
    it('should load user details for given username', () => {
      service.loadUser(username).subscribe(result => {
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
