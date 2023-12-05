import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { SiteContextState } from '../state';
export declare function getReducers(): ActionReducerMap<SiteContextState, any>;
export declare const reducerToken: InjectionToken<ActionReducerMap<SiteContextState>>;
export declare const reducerProvider: Provider;
