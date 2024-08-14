/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { UpdateEmailComponentService } from './update-email-component.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'cx-update-email',
  templateUrl: './update-email.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'user-form' },
})
export class UpdateEmailComponent {
  constructor(
    protected service: UpdateEmailComponentService,
    protected oauthService: OAuthService
  ) {}

  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;

  onSubmit(): void {
    this.service.save();
  }

  logout(){
    this.oauthService.revokeTokenAndLogout({
      client_id: 'FeWB0V0Opi2hEL-T21DlUuEO',
      returnTo: window.location.origin + '/' + 'powertools-spa'  + '/en/USD/login'
    }, true);
  }
}
