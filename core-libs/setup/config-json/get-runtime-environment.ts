/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ConfigJson, parseConfigJson } from './parse-config-json';

export type RuntimeEnvironment = Record<string, string>;

/**
 * ID of the TransferState `<script>` element in the DOM.
 *
 * For more, see Angular source code:
 * - https://github.com/angular/angular/blob/f85c72739e0e067e568725912530dd5e5403c67a/packages/core/src/transfer_state.ts#L157
 * - https://github.com/angular/angular/blob/f85c72739e0e067e568725912530dd5e5403c67a/packages/core/src/application/application_tokens.ts#L48
 */
const TRANSFER_STATE_ELEMENT_ID = 'ng-state';

/**
 * Tells whether TransferState `<script>` element is available in the DOM.
 *
 * When TransferState from SSR is available, we skip fetching /config.json because
 * the environment will be provided via Angular's TransferState mechanism in
 * `provideRuntimeOccConfig`.
 */
export function isTransferStateAvailable(): boolean {
  // Pre-bootstrap utility: no Angular DI context available, direct DOM access is the only option here.
  /* eslint-disable no-restricted-globals */
  return (
    typeof document !== 'undefined' &&
    document.getElementById(TRANSFER_STATE_ELEMENT_ID) !== null
  );
  /* eslint-enable no-restricted-globals */
}

const DEFAULT_CONFIG_URL = '/config.json';

/**
 * Fetches runtime environment from /config.json, unless TransferState from SSR is available.
 *
 * Call this in `main.ts` **before** bootstrapping the Angular app and pass the result
 * as the `RUNTIME_ENVIRONMENT` provider. When CSR hydrates after SSR, the config is
 * already in the TransferState `<script id="ng-state">` element — this function returns
 * an empty object in that case, relying on `provideRuntimeOccConfig` to read it via DI.
 *
 * @param options.url - URL to fetch the config from. Defaults to `'/config.json'` (relative to the app origin).
 */
export async function getRuntimeEnvironment(options?: {
  url?: string;
}): Promise<{ runtimeEnvironment: RuntimeEnvironment }> {
  if (isTransferStateAvailable()) {
    return { runtimeEnvironment: {} };
  }

  const url = options?.url ?? DEFAULT_CONFIG_URL;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      /* eslint-disable-next-line no-console */
      console.warn(
        `[getRuntimeEnvironment] Failed to fetch runtime config from ${url}: ${response.status} ${response.statusText}. Falling back to empty runtime environment.`
      );
      return { runtimeEnvironment: {} };
    }

    const raw: ConfigJson = await response.json();
    const runtimeEnvironment = parseConfigJson(raw, { excludeSecrets: true });
    return { runtimeEnvironment };
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.warn(
      '[getRuntimeEnvironment] Error fetching runtime config. Falling back to empty runtime environment.',
      error
    );
    return { runtimeEnvironment: {} };
  }
}
