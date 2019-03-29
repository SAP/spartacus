import { createSelector, MemoizedSelector } from '@ngrx/store';
import { entityStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderErrorSelector,
  loaderLoadingSelector,
  loaderSuccessSelector,
} from '../../../state/utils/loader/loader.selectors';
import { StateWithProcess } from '../process-state';
import { getProcessState } from './feature.selector';

export function getProcessStateFactory<T>(
  processName: string
): MemoizedSelector<StateWithProcess<T>, LoaderState<T>> {
  return createSelector(
    getProcessState(),
    entityState => entityStateSelector(entityState, processName)
  );
}

export function getProcessLoadingFactory<T>(
  processName: string
): MemoizedSelector<StateWithProcess<T>, boolean> {
  return createSelector(
    getProcessStateFactory(processName),
    loaderState => loaderLoadingSelector(loaderState)
  );
}

export function getProcessSuccessFactory<T>(
  processName: string
): MemoizedSelector<StateWithProcess<T>, boolean> {
  return createSelector(
    getProcessStateFactory(processName),
    loaderState => loaderSuccessSelector(loaderState)
  );
}

export function getProcessErrorFactory<T>(
  processName: string
): MemoizedSelector<StateWithProcess<T>, boolean> {
  return createSelector(
    getProcessStateFactory(processName),
    loaderState => loaderErrorSelector(loaderState)
  );
}
