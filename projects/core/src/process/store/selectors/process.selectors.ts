/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateUtils } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderErrorSelector,
  loaderLoadingSelector,
  loaderSuccessSelector,
} from '../../../state/utils/loader/loader.selectors';
import { StateWithProcess } from '../process-state';
import { getProcessState } from './feature.selector';

export function getProcessStateFactory<T>(
  processId: string
): MemoizedSelector<StateWithProcess<T>, LoaderState<T>> {
  return createSelector(
    getProcessState(),
    (entityState: StateUtils.EntityLoaderState<T>) =>
      StateUtils.entityLoaderStateSelector(entityState, processId)
  );
}

export function getProcessLoadingFactory<T>(
  processId: string
): MemoizedSelector<StateWithProcess<T>, boolean> {
  return createSelector(
    getProcessStateFactory<T>(processId),
    (loaderState: LoaderState<T>) => loaderLoadingSelector(loaderState)
  );
}

export function getProcessSuccessFactory<T>(
  processId: string
): MemoizedSelector<StateWithProcess<T>, boolean> {
  return createSelector(
    getProcessStateFactory<T>(processId),
    (loaderState: LoaderState<T>) => loaderSuccessSelector(loaderState)
  );
}

export function getProcessErrorFactory<T>(
  processId: string
): MemoizedSelector<StateWithProcess<T>, boolean> {
  return createSelector(
    getProcessStateFactory<T>(processId),
    (loaderState: LoaderState<T>) => loaderErrorSelector(loaderState)
  );
}
