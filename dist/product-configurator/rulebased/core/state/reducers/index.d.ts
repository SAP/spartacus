import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { ConfiguratorState } from '../configurator-state';
export declare function getConfiguratorReducers(): ActionReducerMap<ConfiguratorState>;
export declare const configuratorReducerToken: InjectionToken<ActionReducerMap<ConfiguratorState>>;
export declare const configuratorReducerProvider: Provider;
