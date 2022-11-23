/**
 * Server options
 */
export interface ServerOptions {
  /**
   * Specify a domain (origin) from which the HTTP requests are being made.
   * Should be without the trailing slash, e.g. "https://my.domain.com"
   */
  serverRequestOrigin?: string;
}
