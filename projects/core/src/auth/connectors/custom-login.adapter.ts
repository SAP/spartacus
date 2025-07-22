import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
// import { EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Config } from '../../config';
import { CSRFResponse } from '../user-auth/models/csfr-response';
import { AuthConfigService } from '../user-auth/services/auth-config.service';
// import { UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomLoginPageAdapter {
  protected config = inject(Config);
  protected http = inject(HttpClient);
  protected authConfigService = inject(AuthConfigService);

  /** DEBUG: flag to switch between sending the login form data via _fetch_ or _form action_ */
  // DEBUG_useFetch = true;
  // DEBUG_useFetch = false;

  getCustomLoginCsrf() {
    const baseUrl = this.authConfigService.getBaseUrl();
    const { csfrPath } = this.config.authentication?.customLoginPage ?? {};

    return this.http
      .get<CSRFResponse>(`${baseUrl}${csfrPath}`, {
        withCredentials: true,
      })
      .pipe(
        tap({
          next: (value) => {
            console.log('got csrf', value);
          },
          error: (e) => {
            console.log('failed to get csrf token', e);
          },
        })
      );
  }

  // login(form: UntypedFormGroup) {
  //   // DEBUG: adjust values
  //   // - baseUrl in projects/core/src/auth/user-auth/config/default-auth-config.ts
  //   // - loginForm in projects/storefrontapp/src/app/spartacus/spartacus-b2c-configuration.module.ts:53
  //   // const { userId, password } = this.form.value;
  //
  //   const baseUrl = this.authConfigService.getBaseUrl();
  //   const destination = `${baseUrl}${this.config.authentication?.customLoginPage?.loginForm}`;
  //
  //   return this.getCustomLoginCsrf().pipe(
  //     concatMap((csrf) => {
  //       // if (this.DEBUG_useFetch) {
  //       //   return this.fetchApiPostForm({
  //       //     destination,
  //       //     username,
  //       //     password,
  //       //     csrf,
  //       //   });
  //       // } else {
  //       return this.formActionSubmit({
  //         destination,
  //         csrf,
  //         form,
  //       });
  //       // }
  //     })
  //   );
  // }

  // Note: This is poor UX.  An HTTP POST is an outdated process and contrary to the SPA web application
  // paradigm.  Additionally, there are performance issues.  The entire application is will need to be
  // reloaded on every reloaded on every submit.  This will be a friction point for consumers
  // if they are on a slower connection or device.
  // Also, this should not be in adapter/connector services, which are intended for AJAX requests
  /**
   * login form is configured to submit via fetch APIs, so we need to dynamically create a
   * submittable form.
   *
   */
  // formActionSubmit({
  //   destination,
  //   csrf,
  //   username,
  //   password,
  //   form,
  // }: {
  //   destination: string;
  //   csrf: { parameterName: string; token: string };
  //   username: string;
  //   password: string;
  //   form: UntypedFormGroup;
  // }) {
  // const form = document.createElement('form');
  // form.action = destination;
  // form.method = 'POST';
  //
  // const csrfInput = document.createElement('input');
  // csrfInput.type = 'hidden';
  // csrfInput.name = csrf.parameterName;
  // csrfInput.value = csrf.token;
  // form.appendChild(csrfInput);

  // const usernameInput = document.createElement('input');
  // usernameInput.name = 'username';
  // usernameInput.value = username;
  // form.appendChild(usernameInput);
  //
  // const pwInput = document.createElement('input');
  // pwInput.type = 'password';
  // pwInput.name = 'password';
  // pwInput.value = password;
  // form.appendChild(pwInput);

  // document.body.appendChild(form);
  // form.ngSubmit.emit();

  // form.submit();
  //
  //   return EMPTY;
  // }

  /**
   * Use fetch API to post from details to server.
   *
   * Note: incomplete, only intended to get the 302 redirect to auth server or error page.
   *   Processing the location to follow later
   */
  // fetchApiPostForm({
  //   destination,
  //   csrf,
  //   username,
  //   password,
  // }: {
  //   destination: string;
  //   csrf: { parameterName: string; token: string };
  //   username: string;
  //   password: string;
  // }) {
  //   // make CORS fetch request to POST login form data
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   });
  //
  //   const body = new HttpParams({
  //     fromObject: {
  //       username,
  //       password,
  //       [csrf.parameterName]: csrf.token,
  //     },
  //   });
  //
  //   return this.http
  //     .post(destination, body.toString(), {
  //       headers,
  //       withCredentials: true,
  //       observe: 'response',
  //     })
  //     .pipe(
  //       tap({
  //         next: (response) => {
  //           console.log('redirect location', response.headers.get('location'));
  //           debugger;
  //         },
  //         error: (error) => {
  //           console.log(error);
  //         },
  //       })
  //     );
  // }
}
