/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Inject,
  Injectable,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import {
  AuthService,
  BaseSiteService,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  LanguageService,
  ScriptLoader,
  WindowRef,
} from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import {
  Observable,
  ReplaySubject,
  Subscription,
} from 'rxjs';
import { CdcConfigInitializer } from '../config/cdc-config-initializer';

@Injectable({
  providedIn: 'root',
})
export class SAPCDCScreenSetService implements OnDestroy {
  protected loaded$ = new ReplaySubject<boolean>(1);
  protected errorLoading$ = new ReplaySubject<boolean>(1);
  protected subscription: Subscription = new Subscription();
  protected gigyaSDK: { [key: string]: any };

  constructor(
    protected baseSiteService: BaseSiteService,
    protected languageService: LanguageService,
    protected scriptLoader: ScriptLoader,
    protected winRef: WindowRef,
    protected auth: AuthService,
    protected zone: NgZone,
    protected userProfileFacade: UserProfileFacade,
    @Inject(PLATFORM_ID) protected platform: any,
    protected globalMessageService: GlobalMessageService,
    protected eventService: EventService,
    private cdcConfigInitializer: CdcConfigInitializer
  ) {}


  async loadCdcConfig(): Promise<boolean> {
    try {
      const config = await this.cdcConfigInitializer.configFactory();
      
      if (config && config.cdc && config.cdc.length > 0) {
        console.log('Loaded CDC Config:', config);
        return true;  // Return true if config is successfully loaded and valid
      } else {
        console.warn('CDC Config is empty or invalid');
        return false;  // Return false if config is empty or invalid
      }
    } catch (error) {
      console.error('Error loading CDC Config:', error);
      return false;  // Return false in case of any errors
    }
  }


  /**
   * handle toast message on profile update
   * @param response
   *
   */
  public handleProfileUpdateResponse(response?: any) {
    if (response?.response?.errorCode === 0) {
      this.globalMessageService.add(
        {
          key: 'cdcProfile.profileUpdateSuccess',
        },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    } else {
      this.globalMessageService.add(
        {
          key: 'cdcProfile.profileUpdateFailure',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  }
  
  public logoutUser() {
    this.auth.logout();
    this.invokeAPI('accounts.logout', {});
  }


  /**
   * Invoke the CDC SDK Method and convert the callback to an Observable
   * @param methodName - method to be invoked
   * @param payload - Object payload
   * @returns - Observable with the response
   */
  protected invokeAPI(methodName: string, payload: Object): Observable<any> {
    return new Observable<any>((result) => {
      const actualAPI = this.getSdkFunctionFromName(methodName);
      if (typeof actualAPI != 'function') {
        result.error('CDC API name is incorrect');
        return;
      }
      actualAPI({
        ...payload,
        callback: (response: any) => {
          this.zone.run(() => {
            if (response?.status === 'OK') {
              result.next(response);
              result.complete();
            } else {
              result.error(response);
            }
          });
        },
      });
    });
  }

   /**
   * Obtain the CDC SDK Method from the input method name as string
   * @param methodName
   * @returns CDC SDK Function
   */
   protected getSdkFunctionFromName(
    methodName: string
  ): (payload: Object) => void {
    //accounts.setAccountInfo or accounts.b2b.openDelegatedAdmin
    const nestedMethods = methodName.split('.');
    let cdcAPI: any = this.gigyaSDK;
    nestedMethods.forEach((method) => {
      if (cdcAPI && cdcAPI.hasOwnProperty(method)) {
        cdcAPI = cdcAPI[method];
      }
    });

    return cdcAPI;
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
