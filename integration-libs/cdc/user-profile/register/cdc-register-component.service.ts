/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CdcConsentManagementService,
  CdcJsService,
  CdcLoadUserTokenFailEvent,
  CDC_USER_PREFERENCE_SERIALIZER,
} from '@spartacus/cdc/root';
import {
  AuthService,
  Command,
  CommandService,
  ConsentTemplate,
  ConverterService,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { RegisterComponentService } from '@spartacus/user/profile/components';
import {
  UserProfileFacade,
  UserRegisterFacade,
  UserSignUp,
} from '@spartacus/user/profile/root';
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
    protected eventService: EventService,
    protected userProfileFacade: UserProfileFacade,
    protected cdcConsentManagementService: CdcConsentManagementService,
    protected converter: ConverterService
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

    /** fill the user preferences */
    user.preferences = this.generatePreferencesObject();

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
      switchMap(() =>
        merge(this.loadUserTokenFailed$, this.isLoggedIn$).pipe(
          map(() => {
            //update user title code
            this.userProfileFacade.update(user);
          })
        )
      ),
      switchMap(() => {
        return this.userProfileFacade
          .get()
          .pipe(filter((userObj): userObj is User => Boolean(userObj)));
      })
    );
  }

  generatePreferencesObject(): any {
    var preferences = {};
    let consentIDs = this.cdcConsentManagementService.getCdcRequiredConsents();
    for (var id in consentIDs) {
      if (Object.hasOwn(consentIDs, id)) {
        let consent: ConsentTemplate = {};
        consent.id = consentIDs[id];
        consent.currentConsent = {};
        consent.currentConsent.consentGivenDate = new Date();
        let serializedPreference: any = this.converter.convert(
          consent,
          CDC_USER_PREFERENCE_SERIALIZER
        );
        preferences = Object.assign(preferences,serializedPreference);
      }
    }
    return preferences;
  }

  // @override
  postRegisterMessage(): void {
    // don't show the message
  }
}
