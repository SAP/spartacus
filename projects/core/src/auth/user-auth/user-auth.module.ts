/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { lastValueFrom } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { provideDefaultConfig } from '../../config/config-providers';
import { provideConfigValidator } from '../../config/config-validator/config-validator';
import { baseUrlConfigValidator } from './config/base-url-config-validator';
import { defaultAuthConfig } from './config/default-auth-config';
import { UserAuthEventModule } from './events/user-auth-event.module';
import { AuthService } from './facade/auth.service';
import { interceptors } from './http-interceptors/index';
import { AuthStatePersistenceService } from './services/auth-state-persistence.service';
import { AuthStorageService } from './services/auth-storage.service';
import { LOCATION_INITIALIZED_MULTI } from '../../routing/location-initialized-multi/location-initialized-multi';

/**
 * Initialize the check for `token` or `code` in the url returned from the OAuth server.
 */
export function checkOAuthParamsInUrl(
  authService: AuthService,
  configInit: ConfigInitializerService,
  platformId: Object
): () => Promise<void> {
  return () =>
    isPlatformBrowser(platformId)
      ? lastValueFrom(
          configInit.getStable().pipe(
            switchMap(() =>
              // Wait for stable config is used, because with auth redirect would kick so quickly that the page would not be loaded correctly
              authService.checkOAuthParamsInUrl()
            )
          )
        )
      : Promise.resolve(); // Do nothing in SSR
}

export function authStatePersistenceFactory(
  authStatePersistenceService: AuthStatePersistenceService
) {
  const result = () => authStatePersistenceService.initSync();
  return result;
}

/**
 * Factory to ensure that auth is initialized and its state is synced between
 * browser storage and in-memory storage.
 * This is required to handle the OAuth callback.
 */
const authInitializedFactory = () => {
  const authService = inject(AuthService);
  const configInit = inject(ConfigInitializerService);
  const platformId = inject(PLATFORM_ID);
  const authStatePersistenceService = inject(AuthStatePersistenceService);

  //We need to call it before checkOAuthParamsInUrl to ensure that in-memory storage is in sync with browser storage.
  //In other case "nonce" value used in Implicit Flow will be undefined causing the error.
  authStatePersistenceFactory(authStatePersistenceService)();
  return checkOAuthParamsInUrl(authService, configInit, platformId);
};

/**
 * Authentication module for a user. Handlers requests for logged in users,
 * provides authorization services and storage for tokens.
 */
@NgModule({
  imports: [CommonModule, OAuthModule.forRoot(), UserAuthEventModule],
})
export class UserAuthModule {
  static forRoot(): ModuleWithProviders<UserAuthModule> {
    return {
      ngModule: UserAuthModule,
      providers: [
        provideDefaultConfig(defaultAuthConfig),
        provideConfigValidator(baseUrlConfigValidator),
        ...interceptors,
        {
          provide: OAuthStorage,
          useExisting: AuthStorageService,
        },
        {
          provide: LOCATION_INITIALIZED_MULTI,
          useFactory: authInitializedFactory,
          multi: true,
        },
      ],
    };
  }
}
