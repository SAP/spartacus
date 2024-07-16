/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Observable, filter } from 'rxjs';
import { LoginFormComponentService } from './login-form-component.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';

declare var gigya: any;

@Component({
  selector: 'cx-login-form',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  constructor(protected service: LoginFormComponentService, private oauthService: OAuthService) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe(() => {
        this.oauthService.loadUserProfile();
        this.service.updateToken(this.oauthService.getAccessToken());
      });
      
    gigya.accounts.addEventHandlers({
      onLogin: (account: any) => {
        this.service.onCDCLoginSuccess(account);
      },
    });
  }

  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;

  @HostBinding('class.user-form') style = true;

  onSubmit(): void {
    this.service.login();
  }

  showCDCLoginForm(): void {
    gigya.accounts.showScreenSet({
      screenSet: 'Default-RegistrationLogin',
      onBeforeSubmit: (event: any) => {
        console.log('onBeforeSubmit', event);
      }
    });
  }

  startPKCEFlow(): void {
    this.oauthService.initCodeFlow();
  }
}
