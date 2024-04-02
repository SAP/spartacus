/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProcessesLoaderState } from './processes-loader-state';

export function isStableSelector<T>(state: ProcessesLoaderState<T>): boolean {
  return !state.processesCount && !state.loading;
}

export function hasPendingProcessesSelector<T>(
  state: ProcessesLoaderState<T>
): boolean {
  return state.processesCount !== undefined && state.processesCount > 0;
}
