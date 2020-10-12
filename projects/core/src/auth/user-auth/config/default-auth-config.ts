import { AuthConfig } from './auth-config';

export const defaultAuthConfig: AuthConfig = {
  authentication: {
    client_id: 'mobile_android',
    client_secret: 'secret',
    tokenEndpoint: '/authorizationserver/oauth/token',
    revokeEndpoint: '/authorizationserver/oauth/revoke',
    loginEndpoint: '/authorizationserver/oauth/authorize',
  },
};
