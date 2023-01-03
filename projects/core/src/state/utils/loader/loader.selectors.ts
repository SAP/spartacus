/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { LoaderState } from './loader-state';

export function loaderValueSelector<T>(state: LoaderState<T>): T {
  return state.value as T;
}

export function loaderLoadingSelector<T>(state: LoaderState<T>): boolean {
  return state.loading ?? false;
}

export function loaderErrorSelector<T>(state: LoaderState<T>): boolean {
  return state.error ?? false;
}

export function loaderSuccessSelector<T>(state: LoaderState<T>): boolean {
  return state.success ?? false;
}
