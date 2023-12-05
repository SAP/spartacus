import { InjectionToken, Provider } from '@angular/core';
import { Action, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AsmState } from '../asm-state';
export declare function getReducers(): ActionReducerMap<AsmState>;
export declare const reducerToken: InjectionToken<ActionReducerMap<AsmState>>;
export declare const reducerProvider: Provider;
export declare function clearCustomerSupportAgentAsmState(reducer: ActionReducer<AsmState, Action>): ActionReducer<AsmState, Action>;
export declare const metaReducers: MetaReducer<any>[];
