import { AuthConfig } from './auth-config';

export const defaultAuthConfig: AuthConfig = {
  authentication: {
    client_id: 'mobile_android',
    client_secret: 'secret',
    loginEndpoint: '/authorizationserver/oauth/token',
    revokeEndpoint: '/authorizationserver/oauth/revoke',
  },
};
