import { CaptchaConfig } from './captcha-config';

export const defaultCaptchaConfig: CaptchaConfig = {
  captcha: {
    captchaOptions: {
      action: 'homepage',
    },
    captchaUrl: 'https://www.google.com/recaptcha/api.js',
  },
};
