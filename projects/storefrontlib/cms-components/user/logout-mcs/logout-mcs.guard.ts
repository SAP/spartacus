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
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';

// import { CdcJsService } from '@spartacus/cdc/root';

//import { HttpClient } from '@angular/common/http';

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
    protected userInfoUrl: string ;
    protected socializeLogoutUrl: string ;
    protected UID: string;
    protected APIKey: string;
    protected issuerUrl: string;
    protected token:string;
  constructor(
    protected winRef: WindowRef,
    protected auth: AuthService,
    protected cms: CmsService,
    protected semanticPathService: SemanticPathService,
    protected protectedRoutes: ProtectedRoutesService,
    protected router: Router,
    protected http: HttpClient,
    protected oauthService: OAuthService
  ) {
      super(auth, cms, semanticPathService,protectedRoutes,router);
  }

  protected async logout(): Promise<any> {
      this.token = this.oauthService.getAccessToken();
      this.getCustomerUID(this.token).subscribe(
        response => {
            console.log('User Info:', response);
            const uid = response.sub;
            this.UID = response.sub;
            console.log('UID:', uid);
          },
          error => {
            console.error('Error:', error);
          }
      );
         await this.auth.cmsLogout();
    //   if (token == null){
    //     console.log("token is undefined!");
    //   }
      
    //   const UID = 'f94a918044fe44f985725552f7a59df0';
      
       // const APIKey = '4_haAyXsKhFEupcUCQ9UPizw';
      if(this.oauthService.issuer == null){ console.log("issuerUrl is undefined!");}
      else{
        this.issuerUrl = this.oauthService.issuer;
        const lastSlashIndex = this.issuerUrl.lastIndexOf('/');
        this.APIKey = this.issuerUrl.substring(lastSlashIndex + 1);}
      this.logoutUseSocializeLogout(this.UID,this.APIKey).subscribe(
        response => {
            console.log('Success:', response);
        },
        error => {
            console.error('Error:', error);
          }
    );
}
  protected getCustomerUID(token:string): Observable<any>{
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });
    if(this.oauthService.issuer == null){ console.log("issuerUrl is undefined!");}
    else{
      this.issuerUrl = this.oauthService.issuer;}
      this.userInfoUrl = this.issuerUrl + '/userinfo';

    return this.http.get<any>(this.userInfoUrl, {
        headers: headers,
        responseType: 'json' as 'json' 
      });
  }

  protected logoutUseSocializeLogout(uid: string, apiKey: string): Observable<any> {
    const params = new HttpParams()
      .set('UID', uid)
      .set('APIKey', apiKey);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const match = this.issuerUrl.match(/https:\/\/fidm\.(.*?)\.gigya\.com/);
    if(match == null){
        console.log("match is unsuccessful!")
    }
    else{
        const dataCenter = match[1];
        this.socializeLogoutUrl = "https://socialize." + dataCenter + ".gigya.com/socialize.logout?";
    }

    return this.http.post<any>(this.socializeLogoutUrl, null, {
      headers: headers,
      params: params,
      responseType: 'json' as 'json' 
    });
  }

}