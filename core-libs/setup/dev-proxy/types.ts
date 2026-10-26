/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Configuration for the Spartacus Dev Proxy.
 *
 * The proxy serves `/config.json` from a local file and forwards every other
 * request to an upstream HTTP server (the Angular dev server in the standard
 * local topology).
 */
export interface DevProxyConfig {
  /**
   * Port the proxy listens on.
   * @default 4222
   */
  port: number;

  /**
   * Path that triggers serving the local config file.
   * @default '/config.json'
   */
  configPublicPath: string;

  /**
   * Path to the config.json file on disk. Resolved against the process cwd
   * if relative; absolute paths are honored as-is.
   * @default 'config.json'
   */
  configSourcePath: string;

  /**
   * Upstream URL of the Angular dev server.
   * @default 'http://localhost:4200'
   */
  upstreamUrl: string;

  /**
   * Whether to set the X-Forwarded-Host header on proxied requests.
   * @default false
   */
  setForwardedHost: boolean;
}
