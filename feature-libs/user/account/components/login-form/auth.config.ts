import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://fidm.eu1.gigya.com/oidc/op/v1.0/4_haAyXsKhFEupcUCQ9UPizw',
  redirectUri: window.location.origin + "/electronics-spa/en/USD/login",
  clientId: 'FeWB0V0Opi2hEL-T21DlUuEO',
  responseType: 'code',
  scope: 'openid profile email uid',
  showDebugInformation: true,
  timeoutFactor: 0.01,
  checkOrigin: false,
};