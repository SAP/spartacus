/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @module @spartacus/setup/dev-proxy
 *
 * Spartacus Dev Proxy — a local reverse proxy that serves
 * `/config.json` from a local file and forwards everything else to the
 * Angular dev server. Replicates the production Hosting Portal behavior
 * locally without requiring a build asset entry in angular.json.
 *
 * Typical local dev topology:
 *   [Browser] → [Spartacus Dev Proxy :4222] → [Angular Dev Server :4200]
 *
 * This module is framework-agnostic: it uses Node.js built-in modules
 * and has no Angular or framework-specific dependencies.
 */

export { startDevProxy } from './config-proxy-server';
export { DEFAULT_DEV_PROXY_CONFIG } from './defaults';
export type { DevProxyConfig } from './types';
