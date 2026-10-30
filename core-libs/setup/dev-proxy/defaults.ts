/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { DevProxyConfig } from './types';

/**
 * Default configuration for the Spartacus Dev Proxy.
 *
 * `configSourcePath` defaults to `./config.json` (relative to the process cwd)
 * so consumers running the proxy from the directory containing their
 * `config.json` get sensible behavior with no flags. Most users go through
 * the CLI (`run.ts`), which resolves the path explicitly via the
 * `SPARTACUS_DEV_PROXY_CONFIG_SOURCE_PATH` env var or a cwd lookup.
 */
export const DEFAULT_DEV_PROXY_CONFIG: DevProxyConfig = {
  port: 4222,
  configPublicPath: '/config.json',
  configSourcePath: 'config.json',
  upstreamUrl: 'http://localhost:4200',
  setForwardedHost: true,
};
