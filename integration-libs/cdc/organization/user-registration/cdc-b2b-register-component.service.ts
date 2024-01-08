/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CdcJsService, CdcLoadUserTokenFailEvent } from '@spartacus/cdc/root';
import {
  AuthConfigService,
  AuthService,
  Command,
  CommandService,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  TranslationService,
  UserAddressService,
} from '@spartacus/core';
import { UserRegistrationFormService } from '@spartacus/organization/user-registration/components';
import {
  UserRegistrationFacade,
  OrganizationUserRegistrationForm,
} from '@spartacus/organization/user-registration/root';
import { UserRegisterFacade } from '@spartacus/user/profile/root';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class CDCB2BRegisterComponentService extends UserRegistrationFormService {
  protected registerCommand: Command<
    { orgInfo: OrganizationUserRegistrationForm },
    OrganizationUserRegistrationForm
  > = this.command.create(
    ({ orgInfo }) =>
      // Registering user through CDC Gigya SDK
      this.cdcJSService.registerOrganisationWithoutScreenSet(
        orgInfo
      ) as unknown as Observable<OrganizationUserRegistrationForm>
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

  constructor(
    protected command: CommandService,
    protected cdcJSService: CdcJsService,
    protected authService: AuthService,
    protected eventService: EventService,
    protected userRegisterFacade: UserRegisterFacade,
    protected userAddressService: UserAddressService,
    protected organizationUserRegistrationFacade: UserRegistrationFacade,
    protected translationService: TranslationService,
    protected globalMessageService: GlobalMessageService,
    protected authConfigService: AuthConfigService,
    protected routingService: RoutingService,
    protected formBuilder: FormBuilder
  ) {
    super(
      userRegisterFacade,
      userAddressService,
      organizationUserRegistrationFacade,
      translationService,
      globalMessageService,
      authConfigService,
      routingService,
      formBuilder
    );
  }

  /**
   * Register a new user using CDC SDK.
   *
   * @param form as FormGroup
   */
  registerUser(form: FormGroup): Observable<OrganizationUserRegistrationForm> {
    if (
      !form.get('firstName')?.value ||
      !form.get('lastName')?.value ||
      !form.get('email')?.value ||
      !form.get('companyName')?.value
    ) {
      return throwError(`The provided user is not valid: ${form.value}`);
    }

    const orgInfo: OrganizationUserRegistrationForm = {
      firstName: form.get('firstName')?.value,
      lastName: form.get('lastName')?.value,
      email: form.get('email')?.value,
      companyName: form.get('companyName')?.value,
      addressLine1: form.get('line1')?.value,
      addressLine2: form.get('line2')?.value,
      postalCode: form.get('postalCode')?.value,
      town: form.get('town')?.value,
      region: form.get('region')?.get('isocode')?.value,
      country: form.get('country')?.get('isocode')?.value,
      phoneNumber: form.get('phoneNumber')?.value,
      message: form.get('message')?.value,
    };
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
        this.registerCommand.execute({ orgInfo })
      ),
      tap(() => {
        this.displayGlobalMessage();
        this.redirectToLogin();
        form.reset();
      })
    );
  }

  // @override
  postRegisterMessage(): void {
    // don't show the message
  }
}
