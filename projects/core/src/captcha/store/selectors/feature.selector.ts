import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  CaptchaState,
  CAPTCHA_FEATURE,
  StateWithCaptcha,
} from '../captcha-state';

export const getCaptchaState: MemoizedSelector<
  StateWithCaptcha,
  CaptchaState
> = createFeatureSelector<CaptchaState>(CAPTCHA_FEATURE);
