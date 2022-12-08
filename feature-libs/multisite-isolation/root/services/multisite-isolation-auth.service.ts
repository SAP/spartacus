/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AuthRedirectService,
  AuthService,
  AuthStorageService,
  BaseSiteService,
  GlobalMessageService,
  OAuthLibWrapperService,
  RoutingService,
  StateWithClientAuth,
  UserIdService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { MultisiteIsolationConfig } from '../config/multisite-isolation-config';

@Injectable({
  providedIn: 'root',
})
export class MultisiteIsolationAuthService extends AuthService {
  constructor(
    protected store: Store<StateWithClientAuth>,
    protected userIdService: UserIdService,
    protected oAuthLibWrapperService: OAuthLibWrapperService,
    protected authStorageService: AuthStorageService,
    protected authRedirectService: AuthRedirectService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    protected baseSiteService: BaseSiteService,
    protected multisiteIsolationConfig: MultisiteIsolationConfig
  ) {
    super(
      store,
      userIdService,
      oAuthLibWrapperService,
      authStorageService,
      authRedirectService,
      routingService
    );
  }

  /**
   * Creates decorator structure based on currently activated baseSite.
   */
  protected getUidDecorator(): Observable<string> {
    return this.baseSiteService.get().pipe(
      take(1),
      map((baseSite) => {
        const config = this.multisiteIsolationConfig.multisiteIsolation;
        const uidDecorator = `${config?.decorator}${baseSite?.uid}`;

        if (config) {
          if (config.isolationDetection && config.enabled) {
            if (baseSite?.isolated) {
              return uidDecorator;
            }
          } else {
            if (config.enabled) {
              return uidDecorator;
            }
          }
        }

        return '';
      })
    );
  }

  /**
   * Adds baseSite decorator to `userId` property before sending request for a token.
   *
   * @param userId
   * @param password
   */
  async loginWithCredentials(userId: string, password: string): Promise<void> {
    this.getUidDecorator().subscribe((decorator: string) => {
      super.loginWithCredentials(`${userId}${decorator}`, password);
    });
  }
}
