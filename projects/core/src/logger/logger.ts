/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export abstract class Logger {
  abstract log(...args: Parameters<typeof console.log>): void;
  abstract error(...args: Parameters<typeof console.error>): void;
  abstract warn(...args: Parameters<typeof console.warn>): void;
}
