import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CaptchaConfig } from '../config';

declare var grecaptcha: any;

@Injectable()
export class CaptchaService {
  constructor(private http: HttpClient, private config: CaptchaConfig) {
    this.initializeCaptcha();
  }

  initializeCaptcha(): void {
    const params = {
      render: this.config.captcha.siteKey,
    };

    this.http
      .get(this.config.captcha.captchaUrl, {
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
        .execute(
          this.config.captcha.siteKey,
          this.config.captcha.captchaOptions
        )
        .then(function(token) {
          console.log(token);
        });
    });
  }
}
