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
  updateStateName: string
): MemoizedSelector<StateWithProcess<T>, LoaderState<T>> {
  return createSelector(
    getProcessState(),
    details => entityStateSelector(details, updateStateName)
  );
}

export function getProcessLoadingFactory<T>(
  updateStateName: string
): MemoizedSelector<StateWithProcess<T>, boolean> {
  return createSelector(
    getProcessStateFactory(updateStateName),
    productState => loaderLoadingSelector(productState)
  );
}

export function getSelectedProductSuccessFactory<T>(
  updateStateName: string
): MemoizedSelector<StateWithProcess<T>, boolean> {
  return createSelector(
    getProcessStateFactory(updateStateName),
    productState => loaderSuccessSelector(productState)
  );
}

export function getSelectedProductErrorFactory<T>(
  updateStateName: string
): MemoizedSelector<StateWithProcess<T>, boolean> {
  return createSelector(
    getProcessStateFactory(updateStateName),
    productState => loaderErrorSelector(productState)
  );
}
