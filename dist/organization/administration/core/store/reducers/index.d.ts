import { InjectionToken, Provider } from '@angular/core';
import { Action, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { OrganizationState } from '../organization-state';
export declare function getReducers(): ActionReducerMap<OrganizationState, any>;
export declare const reducerToken: InjectionToken<ActionReducerMap<OrganizationState>>;
export declare const reducerProvider: Provider;
export declare function clearOrganizationState(reducer: ActionReducer<OrganizationState, Action>): ActionReducer<OrganizationState, Action>;
export declare const metaReducers: MetaReducer<any>[];
