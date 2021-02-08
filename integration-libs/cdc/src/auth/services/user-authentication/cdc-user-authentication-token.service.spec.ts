import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthConfigService, AuthToken } from '@spartacus/core';
import { CdcUserAuthenticationTokenService } from './cdc-user-authentication-token.service';

const UID = 'sampleUID';
const UIDSignature = 'sampleUIDSignature';
const idToken = 'sampleIdToken';
const signatureTimestamp = 'sampleSignatureTimestamp';
const baseSite = 'sampleBaseSite';

const loginEndpoint = '/authorizationserver/oauth/token';

const token: AuthToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_at: '1000',
  granted_scopes: [],
  access_token_stored_at: '230',
};

class MockAuthConfigService implements Partial<AuthConfigService> {
  getTokenEndpoint() {
    return loginEndpoint;
  }
  getClientId() {
    return 'some_client_id';
  }
  getClientSecret() {
    return 'some_client_secret';
  }
}

describe('CdcUserAuthenticationTokenService', () => {
  let authTokenService: CdcUserAuthenticationTokenService;
  let httpMock: HttpTestingController;
  let authConfigService: AuthConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CdcUserAuthenticationTokenService,
        {
          provide: AuthConfigService,
          useClass: MockAuthConfigService,
        },
      ],
    });

    authTokenService = TestBed.inject(CdcUserAuthenticationTokenService);
    httpMock = TestBed.inject(HttpTestingController);
    authConfigService = TestBed.inject(AuthConfigService);
    spyOn(authConfigService, 'getTokenEndpoint').and.callThrough();
    spyOn(authConfigService, 'getClientId').and.callThrough();
    spyOn(authConfigService, 'getClientSecret').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(authTokenService).toBeTruthy();
  });

  describe('load user token using custom flow', () => {
    it('should load user token for given username and password', () => {
      authTokenService
        .loadTokenUsingCustomFlow(
          UID,
          UIDSignature,
          signatureTimestamp,
          idToken,
          baseSite
        )
        .subscribe((result) => {
          expect(result).toEqual(token);
        });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'POST' && req.url === loginEndpoint;
      });

      expect(authConfigService.getTokenEndpoint).toHaveBeenCalled();
      expect(authConfigService.getClientId).toHaveBeenCalled();
      expect(authConfigService.getClientSecret).toHaveBeenCalled();
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
    });

    it('should throw error for invalid custom flow invocation', () => {
      authTokenService
        .loadTokenUsingCustomFlow(
          UID,
          UIDSignature,
          signatureTimestamp,
          idToken,
          baseSite
        )
        .subscribe(
          (_result) => {},
          (error: HttpErrorResponse) => {
            expect(error.status).toBe(400);
            expect(error.statusText).toEqual('Error');
          }
        );

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'POST' && req.url === loginEndpoint;
      });

      expect(authConfigService.getTokenEndpoint).toHaveBeenCalledWith();
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush({ status: 400, statusText: 'Error' });
    });
  });
});
