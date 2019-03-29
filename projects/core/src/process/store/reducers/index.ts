import { InjectionToken, Provider } from '@angular/core';

import { ActionReducer, ActionReducerMap } from '@ngrx/store';

import { entityLoaderReducer } from 'projects/core/src/state';

import { PROCESS_FEATURE } from '../process-state';
import { EntityLoaderState } from '../../../state/utils/entity-loader/entity-loader-state';

export function getReducers<T>(): ActionReducer<EntityLoaderState<T>> {
  return entityLoaderReducer(PROCESS_FEATURE);
}

export const reducerToken: InjectionToken<
  ActionReducerMap<EntityLoaderState<any>>
> = new InjectionToken<ActionReducerMap<EntityLoaderState<any>>>(
  'ProcessReducers'
);

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers
};
