/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { OAuthLibWrapperService, OAuthTryLoginResult } from '@spartacus/core';
import { OAuthEvent } from 'angular-oauth2-oidc';
import { filter, take } from 'rxjs/operators';

/**
 * Customized OAuthLibWrapperService.  Uses its own parameter cleaning function to
 * remove oAuth parameters.
 */
@Injectable({
  providedIn: 'root',
})
export class MyOAuthLibWrapperService extends OAuthLibWrapperService {
  // Original method code, with 3 lines changed
  override tryLogin(): Promise<OAuthTryLoginResult> {
    return new Promise((resolve, reject) => {
      let tokenReceivedEvent: OAuthEvent | undefined;
      const subscription = this.events$
        .pipe(
          filter((event) => event.type === 'token_received'),
          take(1)
        )
        .subscribe((event) => (tokenReceivedEvent = event));

      this.oAuthService
        .tryLogin({
          disableOAuth2StateCheck: true,
          preventClearHashAfterLogin: true, // add: disable parameter cleanup
        })
        .then((result: boolean) => {
          this.myParameterCleanup(); // add: run cleanup as soon as possible
          resolve({
            result: result,
            tokenReceived: !!tokenReceivedEvent,
          });
        })
        .catch((error) => {
          this.myParameterCleanup(); // add: run cleanup as soon as possible
          reject(error);
        })
        .finally(() => {
          // note: running the cleanup in finally is potentially too slow
          subscription.unsubscribe();
        });
    });
  }

  myParameterCleanup() {
    if (!this.winRef.nativeWindow) {
      return;
    }

    const { origin, pathname, search, hash } =
      this.winRef.nativeWindow.location;

    const href =
      origin +
      pathname +
      search
        .replace(/([?&])code=[^&$]*/, '$1')
        .replace(/([?&])scope=[^&$]*/, '$1')
        .replace(/([?&])state=[^&$]*/, '$1')
        .replace(/([?&])session_state=[^&$]*/, '$1')
        .replace(/&+/g, '&') //   squash repeated & to one
        .replace(/^\?&/, '?') //  remove leading & ('?&param' => '?param=')
        .replace(/&$/, '') //     remove trailing &
        .replace(/^\?$/, '') + // remove lone ?
      hash;

    this.winRef.nativeWindow.history.replaceState(null, window.name, href);
  }
}
