import { TestBed } from '@angular/core/testing';
import { OccConfig } from '../../../occ/config/occ-config';
import { AuthConfig } from '../config/auth-config';
import { AuthConfigService } from './auth-config.service';

const mockAuthConfig: AuthConfig = {
  authentication: {
    tokenEndpoint: '/token',
    loginEndpoint: '/login',
    revokeEndpoint: '/revoke',
    baseUrl: 'authBaseUrl',
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

  describe('getTokenEndpoint', () => {
    it('should return token endpoint with provided auth baseUrl', () => {
      expect(service.getTokenEndpoint()).toEqual('authBaseUrl/token');
    });

    it('should return token endpoint with occ baseUrl, when auth baseUrl is not provided', () => {
      authConfig.authentication.baseUrl = undefined;
      expect(service.getTokenEndpoint()).toEqual('occBaseUrl/token');
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
      expect(service.getLoginEndpoint()).toEqual('occBaseUrl/login');
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
      expect(service.getRevokeEndpoint()).toEqual('occBaseUrl/revoke');
    });

    it('should add / when revoke endpoint does not start with it', () => {
      authConfig.authentication.revokeEndpoint = 'revoke';
      expect(service.getRevokeEndpoint()).toEqual('authBaseUrl/revoke');
    });
  });
});
