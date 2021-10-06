import { OccConfig } from '../../../occ/config/occ-config';
import { AuthConfig } from './auth-config';

export function baseUrlConfigValidator(config: OccConfig & AuthConfig) {
  if (
    typeof config?.authentication?.baseUrl === 'undefined' &&
    typeof config?.backend?.occ?.baseUrl === 'undefined' &&
    // Don't show warning when user tries to work around the issue.
    config?.authentication?.OAuthLibConfig?.requireHttps !== false
  ) {
    return 'Authentication might not work correctly without setting either authentication.baseUrl or backend.occ.baseUrl configuration option! Workaround: To support relative urls in angular-oauth2-oidc library you can try setting authentication.OAuthLibConfig.requireHttps to false.';
  }
}
