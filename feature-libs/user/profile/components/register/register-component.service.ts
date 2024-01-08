/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormArray } from '@angular/forms';
import {
  ConsentTemplate,
  GlobalMessageService,
  GlobalMessageType,
  Title,
  User,
} from '@spartacus/core';
import { UserRegisterFacade, UserSignUp } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';

@Injectable()
export class RegisterComponentService {
  constructor(
    protected userRegisterFacade: UserRegisterFacade,
    protected globalMessageService: GlobalMessageService,
    protected fb?: UntypedFormBuilder
  ) {}

  /**
   * Register a new user.
   *
   * @param user as UserSignUp
   */
  register(user: UserSignUp): Observable<User> {
    return this.userRegisterFacade.register(user);
  }

  /**
   * Returns titles that can be used for the user profiles.
   */
  getTitles(): Observable<Title[]> {
    return this.userRegisterFacade.getTitles();
  }

  /**
   * Show the message after successful registration.
   */
  postRegisterMessage(): void {
    this.globalMessageService.add(
      { key: 'register.postRegisterMessage' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  /**
   * Get if any additional consents needs to be provided during registration
   * In core feature, no additional consents are necessary during registration.
   * In integration scenarios, eg: cdc, this method will be overridden to return
   * necessary cdc consents
   */
  getAdditionalConsents(): {
    template: ConsentTemplate;
    required: boolean;
  }[] {
    return [];
  }

  /**
   * Generate form control if any additional consents that needs to be provided during registration
   * In core feature, no additional consents are necessary during registration.
   * In integration scenarios, eg: cdc, this method will be overridden to return
   * form controls for necessary cdc consents
   */
  generateAdditionalConsentsFormControl(): UntypedFormArray | undefined {
    return this.fb?.array([]) ?? undefined;
  }
}
