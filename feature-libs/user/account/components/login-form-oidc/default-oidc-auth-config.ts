/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthConfig } from "@spartacus/core";

export const defaultOidcAuthConfig: AuthConfig = {
  authentication: {
    // client_id: 'mobile_android',
    client_id: "FeWB0V0Opi2hEL-T21DlUuEO",
    baseUrl: "https://fidm.eu1.gigya.com/oidc/op/v1.0/4_haAyXsKhFEupcUCQ9UPizw",
    // client_secret: 'secret',
    // tokenEndpoint: '/oauth/token',
    // revokeEndpoint: '/oauth/revoke',
    // loginUrl: '/oauth/authorize',
    OAuthLibConfig: {
      // customTokenParameters: ['token_type'],
      // strictDiscoveryDocumentValidation: false,
      skipIssuerCheck: false,
      disablePKCE: false,
      oidc: true,
      // clearHashAfterLogin: false,
      issuer: "https://fidm.eu1.gigya.com/oidc/op/v1.0/4_haAyXsKhFEupcUCQ9UPizw",
      redirectUri: window.location.origin + '/' + "electronics-spa" + '/en/USD/login',
      clientId: "FeWB0V0Opi2hEL-T21DlUuEO",
      scope: "openid profile email uid bpId bpDisplayId isB2BCustomer",
      responseType: "code",
    },
  },
};
