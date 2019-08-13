import { InjectionToken, Provider } from '@angular/core';
import * as fromCaptcha from './captcha.reducer';
import { CaptchaState } from '../captcha-state';
import { ActionReducer } from '@ngrx/store';

export function getReducers(): ActionReducer<CaptchaState> {
  return fromCaptcha.reducer;
}

export const reducerToken: InjectionToken<
  ActionReducer<CaptchaState>
> = new InjectionToken<ActionReducer<CaptchaState>>('CaptchaReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
