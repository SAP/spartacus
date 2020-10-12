import { TestBed } from '@angular/core/testing';
import { OccConfig } from '../../../occ/config/occ-config';
import { AuthConfig } from '../config/auth-config';
import { AuthConfigService } from './auth-config.service';

const mockAuthConfig: AuthConfig = {
  authentication: {
    tokenEndpoint: '/token',
    loginEndpoint: '/login',
    revokeEndpoint: '/revoke',
    logoutUrl: '/logout',
    userinfoEndpoint: '/userinfo',
    baseUrl: 'authBaseUrl',
    client_id: 'some_client_id',
    client_secret: 'some_client_secret',
    OAuthLibConfig: {
      oidc: false,
      issuer: 'issuer_url',
      clearHashAfterLogin: true,
      customTokenParameters: ['token_type'],
    },
  },
};
const mockOccConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: 'occBaseUrl',
    },
  },
};

describe('AuthConfigService', () => {
  let service: AuthConfigService;
  let authConfig: AuthConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthConfigService,
        {
          provide: AuthConfig,
          useValue: JSON.parse(JSON.stringify(mockAuthConfig)),
        },
        {
          provide: OccConfig,
          useValue: mockOccConfig,
        },
      ],
    });

    service = TestBed.inject(AuthConfigService);
    authConfig = TestBed.inject(AuthConfig);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  describe('getClientId', () => {
    it('should return configured client_id', () => {
      expect(service.getClientId()).toEqual('some_client_id');
    });
  });

  describe('getClientSecret', () => {
    it('should return configured client_secret', () => {
      expect(service.getClientSecret()).toEqual('some_client_secret');
    });
  });

  describe('getBaseUrl', () => {
    it('should return baseUrl provided with auth config', () => {
      expect(service.getBaseUrl()).toEqual('authBaseUrl');
    });

    it('should return baseUrl based on occ baseUrl, when auth baseUrl is not provided', () => {
      authConfig.authentication.baseUrl = undefined;
      expect(service.getBaseUrl()).toEqual('occBaseUrl/authorizationserver');
    });
  });

  describe('getTokenEndpoint', () => {
    it('should return token endpoint with provided auth baseUrl', () => {
      expect(service.getTokenEndpoint()).toEqual('authBaseUrl/token');
    });

    it('should return token endpoint with occ baseUrl, when auth baseUrl is not provided', () => {
      authConfig.authentication.baseUrl = undefined;
      expect(service.getTokenEndpoint()).toEqual(
        'occBaseUrl/authorizationserver/token'
      );
    });

    it('should add / when token endpoint does not start with it', () => {
      authConfig.authentication.tokenEndpoint = 'token';
      expect(service.getTokenEndpoint()).toEqual('authBaseUrl/token');
    });
  });

  describe('getLoginEndpoint', () => {
    it('should return login endpoint with provided auth baseUrl', () => {
      expect(service.getLoginEndpoint()).toEqual('authBaseUrl/login');
    });

    it('should return login endpoint with occ baseUrl, when auth baseUrl is not provided', () => {
      authConfig.authentication.baseUrl = undefined;
      expect(service.getLoginEndpoint()).toEqual(
        'occBaseUrl/authorizationserver/login'
      );
    });

    it('should add / when login endpoint does not start with it', () => {
      authConfig.authentication.loginEndpoint = 'login';
      expect(service.getLoginEndpoint()).toEqual('authBaseUrl/login');
    });
  });

  describe('getRevokeEndpoint', () => {
    it('should return revoke endpoint with provided auth baseUrl', () => {
      expect(service.getRevokeEndpoint()).toEqual('authBaseUrl/revoke');
    });

    it('should return revoke endpoint with occ baseUrl, when auth baseUrl is not provided', () => {
      authConfig.authentication.baseUrl = undefined;
      expect(service.getRevokeEndpoint()).toEqual(
        'occBaseUrl/authorizationserver/revoke'
      );
    });

    it('should add / when revoke endpoint does not start with it', () => {
      authConfig.authentication.revokeEndpoint = 'revoke';
      expect(service.getRevokeEndpoint()).toEqual('authBaseUrl/revoke');
    });
  });

  describe('getLogoutUrl', () => {
    it('should return logout url with provided auth baseUrl', () => {
      expect(service.getLogoutUrl()).toEqual('authBaseUrl/logout');
    });

    it('should return logout url with occ baseUrl, when auth baseUrl is not provided', () => {
      authConfig.authentication.baseUrl = undefined;
      expect(service.getLogoutUrl()).toEqual(
        'occBaseUrl/authorizationserver/logout'
      );
    });

    it('should add / when logout url does not start with it', () => {
      authConfig.authentication.logoutUrl = 'logout';
      expect(service.getLogoutUrl()).toEqual('authBaseUrl/logout');
    });
  });

  describe('getUserinfoEndpoint', () => {
    it('should return userinfo endpoint with provided auth baseUrl', () => {
      expect(service.getUserinfoEndpoint()).toEqual('authBaseUrl/userinfo');
    });

    it('should return userinfo endpoint with occ baseUrl, when auth baseUrl is not provided', () => {
      authConfig.authentication.baseUrl = undefined;
      expect(service.getUserinfoEndpoint()).toEqual(
        'occBaseUrl/authorizationserver/userinfo'
      );
    });

    it('should add / when userinfo endpoint does not start with it', () => {
      authConfig.authentication.userinfoEndpoint = 'userinfo';
      expect(service.getUserinfoEndpoint()).toEqual('authBaseUrl/userinfo');
    });
  });

  describe('getOAuthLibConfig', () => {
    it('should return provided config', () => {
      expect(service.getOAuthLibConfig()).toEqual({
        oidc: false,
        issuer: 'issuer_url',
        clearHashAfterLogin: true,
        customTokenParameters: ['token_type'],
      });
    });
  });
});
