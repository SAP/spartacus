/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  FormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  AuthConfigService,
  GlobalMessageService,
  GlobalMessageType,
  OAuthFlow,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import {
  OrganizationUserRegistration,
  UserRegistrationFacade,
} from '@spartacus/organization/user-registration/root';
import { Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

const globalMsgShowTime: number = 10000;
@Injectable({
  providedIn: 'root',
})
export class RegisterVerificationTokenFormComponentService {
  protected globalMessage: GlobalMessageService = inject(GlobalMessageService);
  protected formBuilder = inject(FormBuilder);
  protected organizationUserRegistrationFacade: UserRegistrationFacade = inject(
    UserRegistrationFacade
  );
  protected translationService: TranslationService = inject(TranslationService);
  protected authConfigService: AuthConfigService = inject(AuthConfigService);
  protected routingService: RoutingService = inject(RoutingService);

  form: UntypedFormGroup = new UntypedFormGroup({
    tokenId: new UntypedFormControl('', [Validators.required]),
    tokenCode: new UntypedFormControl('', [Validators.required]),
  });

  protected buildMessageContent(formValue: {
    [key: string]: any;
  }): Observable<string> {
    return this.translationService.translate(
      'userRegistrationForm.messageToApproverTemplate',
      {
        phoneNumber: formValue.phoneNumber,
        addressLine: formValue.line1,
        secondAddressLine: formValue.line2,
        city: formValue.city,
        state: formValue.region?.isocode,
        postalCode: formValue.postalCode,
        country: formValue.country?.isocode,
        companyName: formValue.companyName,
        message: formValue.message,
      }
    );
  }

  /**
   * Redirects the user back to the login page.
   *
   * This only happens in case of the `ResourceOwnerPasswordFlow` OAuth flow.
   */
  protected redirectToLogin(): void {
    if (
      this.authConfigService.getOAuthFlow() ===
      OAuthFlow.ResourceOwnerPasswordFlow
    ) {
      this.routingService.go({ cxRoute: 'login' });
    }
  }

  displayMessage(key: string, params: Object) {
    this.globalMessage.add(
      {
        key: key,
        params,
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION,
      globalMsgShowTime
    );
  }

  registerUser(formValue: {
    [key: string]: any;
  }): Observable<OrganizationUserRegistration> {
    return this.buildMessageContent(formValue).pipe(
      take(1),
      switchMap((message: string) =>
        this.organizationUserRegistrationFacade.registerUser({
          titleCode: formValue.titleCode,
          firstName: formValue.firstName,
          lastName: formValue.lastName,
          email: formValue.email,
          message: message,
          verificationTokenId: this.form.get('tokenId')?.value,
          verificationTokenCode: this.form.get('tokenCode')?.value,
        })
      ),
      tap(() => {
        this.displayMessage(
          'userRegistrationForm.successFormSubmitMessage',
          {}
        );
        this.redirectToLogin();
      })
    );
  }
}
