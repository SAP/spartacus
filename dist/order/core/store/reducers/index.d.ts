import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { OrderState } from '../order-state';
export declare function getReducers(): ActionReducerMap<OrderState, any>;
export declare const reducerToken: InjectionToken<ActionReducerMap<OrderState>>;
export declare const reducerProvider: Provider;
