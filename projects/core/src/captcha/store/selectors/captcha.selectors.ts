import { createSelector, MemoizedSelector } from '@ngrx/store';
import { CaptchaState, StateWithCaptcha } from '../captcha-state';
import { getCaptchaState } from './feature.selector';

export const getCaptchaToken: MemoizedSelector<
  StateWithCaptcha,
  string
> = createSelector(
  getCaptchaState,
  (state: CaptchaState) => state.token
);
