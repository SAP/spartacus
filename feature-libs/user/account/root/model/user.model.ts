/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  displayUid?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  uid?: string;
}

/**
 * Base User options, used for extensibility.
 */
export type BaseUserOptions<T> = T & { userId: string };
