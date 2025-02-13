/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  FeatureConfigService,
  GlobalMessageService,
  GlobalMessageType,
  User,
} from '@spartacus/core';
import { UserRegisterFacade, UserSignUp } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';

const globalMsgShowTime: number = 10000;
@Injectable()
export class RegistrationVerificationTokenFormComponentService {
  protected globalMessageService = inject(GlobalMessageService);
  protected userRegisterFacade = inject(UserRegisterFacade);
  private featureConfigService: FeatureConfigService =
    inject(FeatureConfigService);

  displayMessage(key: string, params: Object) {
    this.globalMessageService.add(
      {
        key: key,
        params,
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION,
      globalMsgShowTime
    );
  }

  register(user: UserSignUp): Observable<User> {
    return this.userRegisterFacade.register(user);
  }

  postRegisterMessage(): void {
    if (this.featureConfigService.isEnabled('a11yPostRegisterSuccessMessage')) {
      this.displayMessage(
        'register.postRegisterSuccessMessage',
        globalMsgShowTime
      );
    } else {
      this.globalMessageService.add(
        { key: 'register.postRegisterMessage' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    }
  }
}
