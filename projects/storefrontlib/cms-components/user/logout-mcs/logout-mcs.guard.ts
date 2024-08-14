/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import {
  AuthService,
  CmsService,
  ProtectedRoutesService,
  SemanticPathService,
  WindowRef,
} from '@spartacus/core';
import { LogoutGuard } from '../logout/logout.guard';

/**
 * Guards the _logout_ route.
 *
 * Takes care of routing the user to a logout page (if available) or redirects to
 * the homepage. If the homepage is protected, the user is redirected
 * to the login route instead.
 */
@Injectable({
  providedIn: 'root',
})

export class LogoutMcsGuard extends LogoutGuard{
  constructor(
    protected winRef: WindowRef,
    protected auth: AuthService,
    protected cms: CmsService,
    protected semanticPathService: SemanticPathService,
    protected protectedRoutes: ProtectedRoutesService,
    protected router: Router
  ) {
      super(auth, cms, semanticPathService,protectedRoutes,router);
  }


  protected logout(): Promise<any> {
    this.addWedSdkScript();
    return Promise.all([this.auth.cmsLogout(), this.logoutFromCdc()]);
  }


  /**
   * Logout user from CDC
   */
  protected logoutFromCdc(): void {
    (this.winRef.nativeWindow as { [key: string]: any })?.[
      'gigya'
    ]?.socialize?.logout({"UID": "2648de813ad64ddd8429716ee797b7d1"});
  }

  private addWedSdkScript(): void {
    let javascriptUrl = "https://cdns.gigya.com/JS/gigya.js?apikey=4_haAyXsKhFEupcUCQ9UPizw";
    let profileTagScript = this.winRef.document.createElement('script');
    profileTagScript.type = 'text/javascript';
    profileTagScript.async = true;
    profileTagScript.src = javascriptUrl;
    this.winRef.document
        .getElementsByTagName('head')[0]
        .appendChild(profileTagScript);
  }
}
