/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ConfigJson, parseConfigJson } from './parse-config-json';

export type ServerRuntimeEnvironment = Record<string, string>;

/**
 * Fetches runtime environment from the /config.json endpoint for SSR.
 *
 * Called once at server boot — not per request. Returns an empty object when
 * `url` is absent (CCV2 may not yet supply `CONFIG_URL`), relying on the
 * meta-tag / build-time fallbacks to supply backend URLs instead.
 *
 * @param options.url - Absolute URL of the /config.json endpoint.
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

  try {
    const response = await fetch(url);

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
    /* eslint-disable-next-line no-console */
    console.warn(
      `[getServerRuntimeEnvironment] Could not fetch runtime config from ${url}. ` +
        `Falling back to empty runtime environment.`,
      error
    );
    return {};
  }
}
