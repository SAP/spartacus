import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { HttpCaptchaInterceptor } from './http-captcha.interceptor';

export const captchaErrorHandlers: Provider[] = [];

export const captchaHttpInterceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpCaptchaInterceptor,
    multi: true,
  },
];
