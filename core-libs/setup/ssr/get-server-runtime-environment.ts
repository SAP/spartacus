/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { ConfigJson, parseConfigJson } from '@spartacus/setup';

export type ServerRuntimeEnvironment = Record<string, string>;

const DEFAULT_FETCH_TIMEOUT_MS = 5_000;

/**
 * Fetches runtime environment from the /config.json endpoint for SSR.
 *
 * Called per SSR render inside the Express catch-all handler — not at server
 * boot. This ensures config changes made by DevOps (e.g. updating OCC_BASE_URL)
 * are picked up on the next request without restarting the server.
 *
 * Supports two URL schemes:
 * - `file://` — reads from the local filesystem (local dev, no HTTP round-trip).
 *   Use `CONFIG_URL=file://${PWD}/config.json` via the generated `serve:ssr:dev`
 *   npm script. The `${PWD}` shell variable is expanded at runtime so the path
 *   is always correct regardless of who runs it or where the repo lives.
 * - `http://` / `https://` — fetches from a remote endpoint (production).
 *   A configurable timeout (`CONFIG_FETCH_TIMEOUT_MS` env var, default 5 s)
 *   prevents SSR worker starvation when the config endpoint is unreachable.
 *
 * Returns an empty object when `url` is absent (CCV2 may not yet supply
 * `CONFIG_URL`), relying on the meta-tag / build-time fallbacks to supply
 * backend URLs instead.
 *
 * @param options.url - Absolute URL of the /config.json endpoint (`file://` or HTTP/HTTPS).
 */
export async function getServerRuntimeEnvironment({
  url,
}: {
  url: string | undefined;
}): Promise<ServerRuntimeEnvironment> {
  if (!url) {
    /* eslint-disable-next-line no-console */
    console.warn(
      '[getServerRuntimeEnvironment] CONFIG_URL is not set. Falling back to empty runtime environment. Set the CONFIG_URL environment variable to an absolute URL pointing to your /config.json endpoint.'
    );
    return {};
  }

  if (url.startsWith('file://')) {
    return readFileRuntimeEnvironment(url);
  }

  return fetchRuntimeEnvironment(url);
}

async function readFileRuntimeEnvironment(
  url: string
): Promise<ServerRuntimeEnvironment> {
  let filePath: string;
  try {
    // fileURLToPath correctly handles URL-encoded characters and Windows drive
    // letters — new URL(url).pathname does not and must not be used here.
    filePath = fileURLToPath(url);
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.warn(
      `[getServerRuntimeEnvironment] Invalid file:// URL "${url}". Falling back to empty runtime environment.`,
      error
    );
    return {};
  }

  try {
    const content = await readFile(filePath, 'utf-8');
    const raw: ConfigJson = JSON.parse(content);
    const runtimeEnvironment = parseConfigJson(raw, { excludeSecrets: true });
    /* eslint-disable-next-line no-console */
    console.info(
      '[getServerRuntimeEnvironment] Successfully loaded runtime environment from',
      url
    );
    return runtimeEnvironment;
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.warn(
      `[getServerRuntimeEnvironment] Could not read runtime config from ${url}. ` +
        `Falling back to empty runtime environment.`,
      error
    );
    return {};
  }
}

async function fetchRuntimeEnvironment(
  url: string
): Promise<ServerRuntimeEnvironment> {
  const timeoutMs =
    Number(process.env['CONFIG_FETCH_TIMEOUT_MS']) || DEFAULT_FETCH_TIMEOUT_MS;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      /* eslint-disable-next-line no-console */
      console.warn(
        `[getServerRuntimeEnvironment] Failed to fetch runtime config from ${url}: ` +
          `${response.status} ${response.statusText}. Falling back to empty runtime environment.`
      );
      return {};
    }

    const raw: ConfigJson = await response.json();
    const runtimeEnvironment = parseConfigJson(raw, { excludeSecrets: true });
    /* eslint-disable-next-line no-console */
    console.info(
      '[getServerRuntimeEnvironment] Successfully loaded runtime environment from',
      url
    );
    return runtimeEnvironment;
  } catch (error) {
    const isTimeout = error instanceof Error && error.name === 'AbortError';
    /* eslint-disable-next-line no-console */
    console.warn(
      isTimeout
        ? `[getServerRuntimeEnvironment] Timed out fetching runtime config from ${url} after ${timeoutMs} ms. Falling back to empty runtime environment.`
        : `[getServerRuntimeEnvironment] Could not fetch runtime config from ${url}. Falling back to empty runtime environment.`,
      error
    );
    return {};
  } finally {
    clearTimeout(timeoutId);
  }
}
