export const CAPTCHA_FEATURE = 'captcha';

export interface StateWithCaptcha {
  [CAPTCHA_FEATURE]: CaptchaState;
}

export interface CaptchaState {
  token: string;
}
