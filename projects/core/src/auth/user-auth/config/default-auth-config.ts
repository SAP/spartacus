import { AuthConfig } from './auth-config';

// export const defaultAuthConfig: AuthConfig = {
//   authentication: {
//     client_id: 'client4kyma',
//     client_secret: 'secret',
//     tokenEndpoint: '/oauth/token',
//     revokeEndpoint: '/oauth/revoke',
//     loginUrl: '/oauth/authorize',
//     logoutUrl: '/oauth/logout',
//     OAuthLibConfig: {
//       responseType: 'code',
//       scope: '',
//       customTokenParameters: ['token_type'],
//       strictDiscoveryDocumentValidation: false,
//       skipIssuerCheck: true,
//       disablePKCE: true,
//       oidc: false,
//       clearHashAfterLogin: false,
//     },
//   },
// };

export const defaultAuthConfig: AuthConfig = {
  authentication: {
    client_id: 'mobile_android',
    client_secret: 'secret',
    tokenEndpoint: '/oauth/token',
    revokeEndpoint: '/oauth/revoke',
    loginUrl: '/oauth/authorize',
    OAuthLibConfig: {
      scope: '',
      customTokenParameters: ['token_type'],
      strictDiscoveryDocumentValidation: false,
      skipIssuerCheck: true,
      disablePKCE: true,
      oidc: false,
      clearHashAfterLogin: false,
    },
  },
};
