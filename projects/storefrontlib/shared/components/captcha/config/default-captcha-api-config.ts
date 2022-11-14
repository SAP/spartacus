import { CaptchaApiConfig } from './captcha-api-config';

export const defaultCaptchaApiConfig: CaptchaApiConfig = {
  apiUrl: 'https://www.google.com/recaptcha/api.js',
  fields: { 'data-theme': 'light', 'data-size': 'normal' },
};
