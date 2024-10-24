/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { OAuthEvent } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { OAuthLibWrapperService, OAuthTryLoginResult } from '@spartacus/core';

/**
 * Wrapper service on the library OAuthService. Normalizes the lib API for services.
 * Use this service when you want to access low level OAuth library methods.
 */
@Injectable({
  providedIn: 'root',
})
export class CdcOAuthLibWrapperService extends OAuthLibWrapperService {
  events$: Observable<OAuthEvent> = this.oAuthService.events;
  tryLogin(): Promise<OAuthTryLoginResult> {
    return new Promise((resolve) => {
      // We use the 'token_received' event to check if we have returned
      // from the auth server.
      let tokenReceivedEvent: OAuthEvent | undefined;
      const subscription = this.events$
        .pipe(
          filter((event) => event.type === 'token_received'),
          take(1)
        )
        .subscribe((event) => (tokenReceivedEvent = event));

      this.oAuthService
        .loadDiscoveryDocumentAndTryLogin({
          disableOAuth2StateCheck: true,
        })
        .then((result: boolean) => {
          resolve({
            result: result,
            tokenReceived: !!tokenReceivedEvent,
          });
        })
        .finally(() => {
          subscription.unsubscribe();
        });
    });
  }

  public refreshAuthConfig() {
    this.initialize();
  }
}
