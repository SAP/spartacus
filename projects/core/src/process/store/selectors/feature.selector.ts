import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';

import { PROCESS_FEATURE, StateWithProcess } from '../process-state';
import { EntityLoaderState } from '../../../state/utils/entity-loader/entity-loader-state';

export function getProcessState<T>(): MemoizedSelector<
  StateWithProcess<T>,
  EntityLoaderState<T>
> {
  return createFeatureSelector<EntityLoaderState<T>>(PROCESS_FEATURE);
}
