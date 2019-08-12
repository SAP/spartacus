import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { CaptchaConfig } from '../config';

declare var grecaptcha: any;
const RECAPTCHA_URL =
  'https://cors-anywhere.herokuapp.com/https://www.google.com/recaptcha/api.js';

@Injectable()
export class CaptchaService {
  constructor(
    protected captchaStore: Store<any>,
    private http: HttpClient,
    private config: CaptchaConfig
  ) {
    this.initializeCaptcha();
  }

  initializeCaptcha(): void {
    const params = {
      render: this.config.captcha.siteKey,
    };

    this.http
      .get(RECAPTCHA_URL, {
        params: params,
        responseType: 'text',
      })
      .subscribe(result => {
        const googleCaptchaScript = new Function(result);
        googleCaptchaScript();
        this.executeCaptcha();
      });
  }

  private executeCaptcha(): void {
    grecaptcha.ready(() => {
      grecaptcha
        .execute(this.config.captcha.siteKey, {
          action: 'homepage',
        })
        .then(function(token) {
          console.log(token);
        });
    });
  }
}
