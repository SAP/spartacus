/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export {};

declare global {
  namespace Express {
    export interface Request {
      uuid?: string; // request uuid for debug tracking
      startTime?: number; // start timestamp of renderring
    }
  }
}
