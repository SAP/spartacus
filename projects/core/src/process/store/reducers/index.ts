import { InjectionToken, Provider } from '@angular/core';

import { ActionReducerMap, combineReducers } from '@ngrx/store';

import { EntityLoaderState } from '../../../state/utils/entity-loader/entity-loader-state';

export function getReducers<T>(): ActionReducerMap<EntityLoaderState<T>> {
  return {
    entities: combineReducers({})
  };
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
