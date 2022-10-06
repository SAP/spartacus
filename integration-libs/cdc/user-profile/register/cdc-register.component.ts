/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { OAuthFlow } from '@spartacus/core';
import { RegisterComponent } from '@spartacus/user/profile/components';

@Component({
  selector: 'cx-register',
  templateUrl: './cdc-register.component.html',
})
export class CdcRegisterComponent extends RegisterComponent {
  protected onRegisterUserSuccess(): void {
    if (
      this.authConfigService.getOAuthFlow() ===
      OAuthFlow.ResourceOwnerPasswordFlow
    ) {
      this.router.go('login');
    }
  }
}
