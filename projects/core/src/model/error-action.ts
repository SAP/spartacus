/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';

/**
 * Type of the `error` property in NgRx actions representing a failure/error.
 *
 * Such a property cannot be `null` or `undefined`,
 * as it may be used to determine whether an action represents a failure/error.
 */
export type ActionErrorProperty = NonNullable<unknown>;

/**
 * Interface for NgRx actions representing a failure/error.
 *
 * Such actions must have an `error` property that is not `null` or `undefined`,
 * as it may be used to determine whether an action represents a failure/error.
 */
export interface ErrorAction extends Action {
  error: ActionErrorProperty;
}
