/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * A single entry in the config.json format.
 *
 * @example
 * { "value": "https://api.commerce.sap.com" }
 * { "value": "sk-abc123...", "secret": "true" }
 */
export interface ConfigJsonEntry {
  value: string;
  /** When `"true"` (string) the entry is a secret and must not be forwarded to SSR or the browser. */
  secret?: 'true' | 'false' | boolean;
}

/**
 * The config.json file shape served by the Hosting Portal.
 *
 * ```json
 * {
 *   "OCC_BASE_URL": { "value": "https://api.commerce.sap.com" },
 *   "API_KEY":      { "value": "sk-abc123...", "secret": "true" }
 * }
 * ```
 */
export type ConfigJson = Record<string, ConfigJsonEntry>;

function isSecret(entry: ConfigJsonEntry): boolean {
  return entry.secret === true || entry.secret === 'true';
}

/**
 * Parses a raw config.json payload into a flat key/value record.
 *
 * @param raw - The parsed JSON from config.json.
 * @param excludeSecrets - When `true`, entries marked with `"secret": "true"` are omitted.
 *   This **must** be `true` for both CSR and SSR paths so that secrets never reach
 *   the rendering process or the browser's runtime environment.
 * @returns A flat `{ KEY: value }` record ready to be used as a runtime environment.
 */
export function parseConfigJson(
  raw: ConfigJson,
  { excludeSecrets = false }: { excludeSecrets?: boolean } = {}
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, entry] of Object.entries(raw)) {
    if (excludeSecrets && isSecret(entry)) {
      continue;
    }
    result[key] = entry.value;
  }

  return result;
}
