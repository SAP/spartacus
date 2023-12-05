import { InjectionToken, Provider } from '@angular/core';
import { Action, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { OrderApprovalState } from '../order-approval-state';
export declare function getReducers(): ActionReducerMap<OrderApprovalState>;
export declare const reducerToken: InjectionToken<ActionReducerMap<OrderApprovalState>>;
export declare const reducerProvider: Provider;
export declare function clearOrganizationState(reducer: ActionReducer<OrderApprovalState, Action>): ActionReducer<OrderApprovalState, Action>;
export declare const metaReducers: MetaReducer<any>[];
