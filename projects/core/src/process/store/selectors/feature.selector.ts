import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';

import { EntityLoaderState } from '../../../state/utils/entity-loader/entity-loader-state';
import { PROCESS_FEATURE, StateWithProcess } from '../process-state';

export function getProcessState<T>(): MemoizedSelector<
  StateWithProcess<T>,
  EntityLoaderState<T>
> {
  return createFeatureSelector<EntityLoaderState<T>>(PROCESS_FEATURE);
}
