import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CaptchaConfig } from '../config';
import { CaptchaActions, StateWithCaptcha } from '../store';
import { Store } from '@ngrx/store';

declare var grecaptcha: any;

@Injectable()
export class CaptchaService {
  constructor(
    private http: HttpClient,
    private config: CaptchaConfig,
    private store: Store<StateWithCaptcha>
  ) {
    if (this.isEnabled()) {
      this.initializeCaptcha();
    }
  }

  private initializeCaptcha(): void {
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
        this.renderCaptcha();
      });
  }

  private renderCaptcha(): void {
    grecaptcha.ready(() => {
      grecaptcha
        .execute(
          this.config.captcha.siteKey,
          this.config.captcha.captchaOptions
        )
        .then((token: string) => {
          this.store.dispatch(new CaptchaActions.SetToken(token));
        });
    });
  }

  private isEnabled(): boolean {
    return this.config.captcha.siteKey && this.config.captcha.captchaUrl
      ? true
      : false;
  }
}
