/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit, inject } from '@angular/core';
import { OAuthLibWrapperService } from '@spartacus/core';
@Component({
  selector: 'cx-login-form-oidc',
  templateUrl: './login-form-oidc.component.html',
})
export class LoginFormOidcComponent implements OnInit {
  protected oauthLibWrapper = inject(OAuthLibWrapperService);
  ngOnInit(): void {
    this.oauthLibWrapper.initLoginFlow();
  }
}
