/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * CLI entry point for `npx spartacus-dev-proxy`.
 *
 * This file is compiled and published as the `bin` entry of `@spartacus/setup`.
 * It is intentionally generic: all paths are resolved via environment
 * variables or the process cwd, with no project-specific hardcoding.
 *
 * Configuration lookup order:
 *   1. `SPARTACUS_DEV_PROXY_CONFIG_SOURCE_PATH` env var (absolute or cwd-relative)
 *   2. `./config.json` in the process cwd
 *   3. exit(1) with an actionable error message
 *
 * Other env vars:
 *   SPARTACUS_DEV_PROXY_PORT            — port to listen on (default: 4222)
 *   SPARTACUS_DEV_PROXY_UPSTREAM_URL    — upstream to forward to (default: http://localhost:4200)
 *   SPARTACUS_DEV_PROXY_FORWARDED_HOST  — set to "true" to forward X-Forwarded-Host (default: false)
 */

import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { startDevProxy } from './config-proxy-server';

const CONFIG_FILE_NAME = 'config.json';

/**
 * Resolves the path to the config.json file the proxy should serve.
 *
 * Lookup order:
 * 1. `SPARTACUS_DEV_PROXY_CONFIG_SOURCE_PATH` env var (absolute or cwd-relative)
 * 2. `./config.json` in the process cwd
 *
 * Throws with a clear, actionable, fully-formatted message when neither is
 * found. The thrown message is intended to be written verbatim to stderr —
 * every line is already prefixed with `[spartacus-dev-proxy] ` and a trailing
 * blank line is included for breathing room before the process exits.
 */
function resolveConfigFilePath(): string {
  const fromEnv = process.env['SPARTACUS_DEV_PROXY_CONFIG_SOURCE_PATH'];
  if (fromEnv) {
    const absolute = resolve(fromEnv);
    if (!existsSync(absolute)) {
      throw new Error(
        `[spartacus-dev-proxy] SPARTACUS_DEV_PROXY_CONFIG_SOURCE_PATH points at "${absolute}" but no file exists there.`
      );
    }
    return absolute;
  }

  const cwdConfig = resolve(CONFIG_FILE_NAME);
  if (existsSync(cwdConfig)) {
    return cwdConfig;
  }

  throw new Error(
    [
      `[spartacus-dev-proxy] No config.json found.`,
      `[spartacus-dev-proxy] Either:`,
      `[spartacus-dev-proxy]   - run the proxy from a directory containing config.json, or`,
      `[spartacus-dev-proxy]   - set SPARTACUS_DEV_PROXY_CONFIG_SOURCE_PATH to an absolute or cwd-relative path.`,
      `[spartacus-dev-proxy] (cwd: ${process.cwd()})`,
      ``,
    ].join('\n')
  );
}

const port = Number(process.env['SPARTACUS_DEV_PROXY_PORT'] || 4222);
let configFilePath: string;
try {
  configFilePath = resolveConfigFilePath();
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : error}\n`);
  process.exit(1);
}
const upstreamUrl =
  process.env['SPARTACUS_DEV_PROXY_UPSTREAM_URL'] || 'http://localhost:4200';
const setForwardedHost =
  process.env['SPARTACUS_DEV_PROXY_FORWARDED_HOST'] === 'true';

startDevProxy({
  port,
  configSourcePath: configFilePath,
  upstreamUrl,
  setForwardedHost,
}).catch((error) => {
  process.stderr.write(
    `[spartacus-dev-proxy] Failed to start: ${error instanceof Error ? error.stack : error}\n`
  );
  process.exit(1);
});
