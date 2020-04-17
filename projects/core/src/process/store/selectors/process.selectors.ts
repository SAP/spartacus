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
  return createSelector(getProcessState(), (entityState) =>
    StateUtils.entityLoaderStateSelector(entityState, processId)
  );
}

export function getProcessLoadingFactory<T>(
  processId: string
): MemoizedSelector<StateWithProcess<T>, boolean> {
  return createSelector(getProcessStateFactory(processId), (loaderState) =>
    loaderLoadingSelector(loaderState)
  );
}

export function getProcessSuccessFactory<T>(
  processId: string
): MemoizedSelector<StateWithProcess<T>, boolean> {
  return createSelector(getProcessStateFactory(processId), (loaderState) =>
    loaderSuccessSelector(loaderState)
  );
}

export function getProcessErrorFactory<T>(
  processId: string
): MemoizedSelector<StateWithProcess<T>, boolean> {
  return createSelector(getProcessStateFactory(processId), (loaderState) =>
    loaderErrorSelector(loaderState)
  );
}
