import { InjectionToken, Provider } from '@angular/core';
import { Action, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { CmsState, StateWithCms } from '../cms-state';
export declare function getReducers(): ActionReducerMap<CmsState, any>;
export declare const reducerToken: InjectionToken<ActionReducerMap<CmsState>>;
export declare const reducerProvider: Provider;
export declare function clearCmsState(reducer: ActionReducer<StateWithCms, Action>): ActionReducer<StateWithCms, Action>;
export declare const metaReducers: MetaReducer<StateWithCms>[];
