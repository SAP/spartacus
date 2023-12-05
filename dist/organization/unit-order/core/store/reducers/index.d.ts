import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { UnitOrderState } from '../unit-order-state';
export declare function getReducers(): ActionReducerMap<UnitOrderState, any>;
export declare const reducerToken: InjectionToken<ActionReducerMap<UnitOrderState>>;
export declare const reducerProvider: Provider;
