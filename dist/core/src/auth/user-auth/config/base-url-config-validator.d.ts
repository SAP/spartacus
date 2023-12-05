import { OccConfig } from '../../../occ/config/occ-config';
import { AuthConfig } from './auth-config';
export declare function baseUrlConfigValidator(config: OccConfig & AuthConfig): "Authentication might not work correctly without setting either authentication.baseUrl or backend.occ.baseUrl configuration option! Workaround: To support relative urls in angular-oauth2-oidc library you can try setting authentication.OAuthLibConfig.requireHttps to false." | undefined;
