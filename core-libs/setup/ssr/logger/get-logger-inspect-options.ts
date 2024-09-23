/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isDevMode } from '@angular/core';
import { InspectOptions } from 'node:util';

/**
 * Default options to be used for formatting log messages in NodeJS (in both prod and dev mode).
 *
 * They are meant to be passed to `inspect()` or `formatWithOptions()` functions from the `node:util` module
 * for logging purposes.
 */
const DEFAULT_LOGGER_INSPECT_OPTIONS: InspectOptions = {
  /**
   * Prevent the depth of the logged object to be limited to 2 (which is a NodeJS default).
   * Otherwise, the object's properties at nested levels higher than 2 would not be visible in the logs.
   * e.g. `{ a: { b: { c: { d: 'e' } } } }` would be presented as `{ a: { b: { c: [Object] } } }` in the logs.
   *
   * The value 10 was chosen arbitrarily. It can be adjusted in the future, if needed.
   */
  depth: 10,
};

/**
 * Options to be used for formatting log messages in NodeJS only in PRODUCTION mode.
 *
 * They are meant to be passed to `inspect()` or `formatWithOptions()` functions from the `node:util` module
 * for logging purposes.
 */
const PRODUCTION_LOGGER_INSPECT_OPTIONS: InspectOptions = {
  /**
   * When converting an object into a string, we don't want separate properties
   * to be placed in separate lines of the output string, no matter how wide the output string would be.
   *
   * Otherwise, separate lines of the output string could be interpreted incorrectly
   * as separate log entries, by external monitoring tools (e.g. Kibana).
   */
  breakLength: Infinity,
};

/**
 * Options to be used for formatting log messages in NodeJS.
 *
 * They are meant to be passed to `inspect()` or `formatWithOptions()` functions from the `node:util` module
 * for logging purposes.
 *
 * - In dev mode, it's optimized for human-readable output (multi-line output).
 * - In prod mode, it's optimized for machine-readable output (single-line output)
 */
export function getLoggerInspectOptions(): InspectOptions {
  return {
    ...DEFAULT_LOGGER_INSPECT_OPTIONS,
    ...(isDevMode() ? {} : PRODUCTION_LOGGER_INSPECT_OPTIONS),
  };
}
