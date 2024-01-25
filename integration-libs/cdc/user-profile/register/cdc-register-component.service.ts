/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  FormControl,
  UntypedFormArray,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  CdcConsentManagementComponentService,
  CdcJsService,
  CdcLoadUserTokenFailEvent,
  CDC_USER_PREFERENCE_SERIALIZER,
} from '@spartacus/cdc/root';
import {
  AnonymousConsentsService,
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
import { Observable, merge, throwError } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class CDCRegisterComponentService extends RegisterComponentService {
  protected registerCommand: Command<{ user: UserSignUp }, User> =
    this.command.create(
      ({ user }) =>
        // Registering user through CDC Gigya SDK
        this.cdcJSService.registerUserWithoutScreenSet(
          user
        ) as unknown as Observable<User>
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
    protected cdcConsentManagementService: CdcConsentManagementComponentService,
    protected converter: ConverterService,
    protected fb: UntypedFormBuilder,
    protected anonymousConsentsService: AnonymousConsentsService
  ) {
    super(userRegisterFacade, globalMessageService, fb);
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

  /**
   * Return preferences object that needs to be updated during register process
   * @returns preference object
   */
  generatePreferencesObject(): any {
    let preferences = null;
    const consentIDs = this.cdcConsentManagementService.getCdcConsentIDs(); //fetch all active consents
    for (const id of consentIDs) {
      const consent: ConsentTemplate = {};
      consent.id = id;
      consent.currentConsent = {};
      consent.currentConsent.consentGivenDate = new Date();
      const serializedPreference: any = this.converter.convert(
        consent,
        CDC_USER_PREFERENCE_SERIALIZER
      );
      preferences = Object.assign(preferences ?? {}, serializedPreference);
    }
    return preferences;
  }

  // @override
  postRegisterMessage(): void {
    // don't show the message
  }

  /**
   * fetch consents that exist in commerce and is active in cdc
   * @returns array of consent templates
   */
  fetchCdcConsentsForRegistration(): ConsentTemplate[] {
    const consentList: ConsentTemplate[] = [];
    const cdcActiveConsents: string[] =
      this.cdcConsentManagementService.getCdcConsentIDs();
    this.anonymousConsentsService.getTemplates().subscribe((templates) => {
      if (templates && templates.length > 0) {
        for (const template of templates) {
          if (template.id && cdcActiveConsents.includes(template.id)) {
            consentList.push(template);
          }
        }
      }
    });
    return consentList;
  }

  /**
   * generates a form array with form control for each consent
   * @returns a form array
   */
  generateAdditionalConsentsFormControl(): UntypedFormArray {
    const consentArray = this.fb.array([]);
    const templates: ConsentTemplate[] = this.fetchCdcConsentsForRegistration();
    for (const _template of templates) {
      consentArray.push(new FormControl(false, [Validators.requiredTrue]));
    }
    return consentArray;
  }

  /**
   * creates an array of active cdc consents and makes them mandatory to be provided during registration
   * @returns consent templates in the necessary format for the component
   */
  getAdditionalConsents(): {
    template: ConsentTemplate;
    required: boolean;
  }[] {
    const templates: ConsentTemplate[] = this.fetchCdcConsentsForRegistration();
    const returnConsents: {
      template: ConsentTemplate;
      required: boolean;
    }[] = [];
    for (const template of templates) {
      const returnConsent: any = {};
      returnConsent['template'] = template;
      returnConsent['required'] = true; //these consents are always mandatory
      returnConsents.push(returnConsent);
    }
    return returnConsents;
  }
}
