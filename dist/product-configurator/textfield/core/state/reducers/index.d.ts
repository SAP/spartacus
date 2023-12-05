import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { ConfigurationTextfieldState } from '../configuration-textfield-state';
export declare function getConfiguratorTextfieldReducers(): ActionReducerMap<ConfigurationTextfieldState>;
export declare const configuratorTextfieldReducerToken: InjectionToken<ActionReducerMap<ConfigurationTextfieldState>>;
export declare const configuratorTextfieldReducerProvider: Provider;
