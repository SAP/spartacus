import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import {
  AuthState,
} from '@spartacus/core';


export const reducerToken: InjectionToken<
  ActionReducerMap<AuthState>
> = new InjectionToken<ActionReducerMap<AuthState>>('AuthReducers');
