/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
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
    protected globalMessageService: GlobalMessageService
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
}
