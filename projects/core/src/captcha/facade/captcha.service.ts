import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';

declare var grecaptcha: any;

@Injectable()
export class CaptchaService {
  constructor(protected captchaStore: Store<any>, private http: HttpClient) {
    this.initializeCaptcha();
  }

  initializeCaptcha(): void {
    const params = {
      render: `6LdOO7IUAAAAAFhoJI_MBUkqwkQkFEDYBL10EUZ7`,
    };

    this.http
      .get(
        `https://cors-anywhere.herokuapp.com/https://www.google.com/recaptcha/api.js`,
        {
          params: params,
          responseType: 'text',
        }
      )
      .subscribe(result => {
        const googleCaptchaScript = new Function(result);
        googleCaptchaScript();
        this.executeCaptcha();
      });
  }

  private executeCaptcha(): void {
    grecaptcha.ready(function() {
      grecaptcha
        .execute('6LdOO7IUAAAAAFhoJI_MBUkqwkQkFEDYBL10EUZ7', { action: 'homepage' })
        .then(function(token) {
          console.log(token);
        });
    });
  }
}
