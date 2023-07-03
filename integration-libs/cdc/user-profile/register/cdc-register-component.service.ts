/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CdcJsService, CdcLoadUserTokenFailEvent } from '@spartacus/cdc/root';
import {
  AuthService,
  Command,
  CommandService,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { RegisterComponentService } from '@spartacus/user/profile/components';
import { UserRegisterFacade, UserSignUp } from '@spartacus/user/profile/root';
import { merge, Observable, throwError } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class CDCRegisterComponentService extends RegisterComponentService {
  protected registerCommand: Command<{ user: UserSignUp }, User> =
    this.command.create(({ user }) =>
      // Registering user through CDC Gigya SDK
      this.cdcJSService.registerUserWithoutScreenSet(user)
    );

  protected loadUserTokenFailed$: Observable<boolean> = this.eventService
    .get(CdcLoadUserTokenFailEvent)
    .pipe(
      map((event) => !!event),
      tap((failed) => {
        if (failed) {
          throw new Error(`User token failed to load.`);
        }
      })
    );

  protected isLoggedIn$: Observable<boolean> = this.authService
    .isUserLoggedIn()
    .pipe(filter((loggedIn) => loggedIn));

  constructor(
    protected userRegisterFacade: UserRegisterFacade,
    protected command: CommandService,
    protected store: Store,
    protected cdcJSService: CdcJsService,
    protected globalMessageService: GlobalMessageService,
    protected authService: AuthService,
    protected eventService: EventService
  ) {
    super(userRegisterFacade, globalMessageService);
  }

  /**
   * Register a new user using CDC SDK.
   *
   * @param user as UserSignUp
   */
  register(user: UserSignUp): Observable<User> {
    if (!user.firstName || !user.lastName || !user.uid || !user.password) {
      return throwError(`The provided user is not valid: ${user}`);
    }

    return this.cdcJSService.didLoad().pipe(
      tap((cdcLoaded) => {
        if (!cdcLoaded) {
          this.globalMessageService.add(
            {
              key: 'errorHandlers.scriptFailedToLoad',
            },
            GlobalMessageType.MSG_TYPE_ERROR
          );
          throw new Error(`CDC script didn't load.`);
        }
      }),
      switchMap(() =>
        // Logging in using CDC Gigya SDK, update the registerCommand
        this.registerCommand.execute({ user })
      ),
      switchMap((user) =>
        merge(this.loadUserTokenFailed$, this.isLoggedIn$).pipe(map(() => user))
      )
    );
  }

  // @override
  postRegisterMessage(): void {
    // don't show the message
  }
}
