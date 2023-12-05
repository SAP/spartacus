import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { EntityLoaderState } from '../../../state/utils/entity-loader/entity-loader-state';
export declare function getReducers<T>(): ActionReducer<EntityLoaderState<T>>;
export declare const reducerToken: InjectionToken<ActionReducerMap<EntityLoaderState<any>>>;
export declare const reducerProvider: Provider;
