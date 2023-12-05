import { HttpContextToken } from '@angular/common/http';
/**
 * Angular HttpContext to configure a timeout for a HTTP request.
 *
 * Allows for configuring different timeout time per platform (in server vs. in browser).
 *
 * When undefined, no timeout will be applied.
 */
export declare const HTTP_TIMEOUT_CONFIG: HttpContextToken<HttpTimeoutConfig | undefined>;
/**
 * Configuration for timeout of HTTP requests
 */
export interface HttpTimeoutConfig {
    /**
     * Timeout in milliseconds for backend requests made in a server.
     */
    server?: number;
    /**
     * Timeout in milliseconds for backend requests made in a browser.
     */
    browser?: number;
}
export declare abstract class BackendHttpTimeoutConfig {
    timeout?: HttpTimeoutConfig;
}
declare module '../../occ/config/occ-config' {
    interface BackendConfig extends BackendHttpTimeoutConfig {
    }
}
