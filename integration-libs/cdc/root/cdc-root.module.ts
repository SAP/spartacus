/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, inject, NgModule, PLATFORM_ID } from '@angular/core';
import {
  AuthHttpHeaderService,
  AuthInterceptor,
  AuthService,
  AuthStatePersistenceService,
  BaseSiteService,
  CmsConfig,
  Config,
  CONFIG_INITIALIZER,
  ConfigInitializerService,
  LOCATION_INITIALIZED_MULTI,
  OAuthLibWrapperService,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { LogoutGuard } from '@spartacus/storefront';
import { lastValueFrom } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { CdcConsentManagementModule } from './consent-management/cdc-consent.module';
import { defaultCdcRoutingConfig } from './config/default-cdc-routing-config';
import { CDC_CORE_FEATURE, CDC_FEATURE } from './feature-name';
import { CdcLogoutGuard } from './guards/cdc-logout.guard';
import { CdcJsService } from './service/cdc-js.service';
import { CdcConfigInitializer } from './config/cdc-config-initializer';
import { CdcAuthConfigInitializer } from './config/cdc-auth-config-initializer';
import { CdcAuthHttpHeaderService } from './service/cdc-auth-http-header.service';
import { CdcAuthService } from './service/cdc-auth.service';
import { CdcAuthInterceptor } from './http-interceptors/cdc-auth.interceptor';
import { isPlatformBrowser } from '@angular/common';
import { authStatePersistenceFactory } from 'projects/core/src/auth/user-auth/user-auth.module';
import { CdcOAuthLibWrapperService } from './service/cdc-oauth-lib-wrapper.service';
import { CdcBaseSiteService } from './service/cdc-base-site.service';

export function checkOAuthParamsInUrl(
  authService: CdcAuthService,
  configInit: ConfigInitializerService,
  platformId: Object
): () => Promise<void> {
  return () =>
    isPlatformBrowser(platformId)
      ? lastValueFrom(
          configInit.getStable().pipe(
            switchMap(() => {
              authService.refreshAuthConfig();
              // Wait for stable config is used, because with auth redirect would kick so quickly that the page would not be loaded correctly
              return authService.checkOAuthParamsInUrl();
            })
          )
        )
      : Promise.resolve(); // Do nothing in SSR
}

const cdcAuthInitializedFactory = () => {
  const authService = inject(CdcAuthService);
  const configInit = inject(ConfigInitializerService);
  const platformId = inject(PLATFORM_ID);
  const authStatePersistenceService = inject(AuthStatePersistenceService);

  //We need to call it before checkOAuthParamsInUrl to ensure that in-memory storage is in sync with browser storage.
  //In other case "nonce" value used in Implicit Flow will be undefined causing the error.
  authStatePersistenceFactory(authStatePersistenceService)();
  return checkOAuthParamsInUrl(authService, configInit, platformId);
};

export function cdcJsFactory(
  cdcJsService: CdcJsService,
  configInit: ConfigInitializerService
): () => Promise<Config> {
  return () =>
    lastValueFrom(
      configInit.getStable('context', 'cdc').pipe(
        tap(() => {
          cdcJsService.initialize();
        })
      )
    );
}

export function defaultCdcComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [CDC_FEATURE]: {
        cmsComponents: ['GigyaRaasComponent'],
      },
      // by default core is bundled together with components
      [CDC_CORE_FEATURE]: CDC_FEATURE,
    },
  };
  return config;
}

export function initCdcConfigFactory(
  cdcConfigInitializer: CdcConfigInitializer
) {
  return cdcConfigInitializer;
}
export function initCdcAuthConfigFactory(
  cdcAuthConfigInitializer: CdcAuthConfigInitializer
) {
  return cdcAuthConfigInitializer;
}

@NgModule({
  imports: [CdcConsentManagementModule],
  providers: [
    provideDefaultConfigFactory(defaultCdcComponentsConfig),
    { provide: LogoutGuard, useExisting: CdcLogoutGuard },
    {
      provide: AuthService,
      useExisting: CdcAuthService,
    },
    {
      provide: AuthInterceptor,
      useExisting: CdcAuthInterceptor,
    },
    {
      provide: AuthHttpHeaderService,
      useExisting: CdcAuthHttpHeaderService,
    },
    {
      provide: OAuthLibWrapperService,
      useExisting: CdcOAuthLibWrapperService,
    },
    {
      provide: BaseSiteService,
      useExisting: CdcBaseSiteService,
    },
    {
      provide: CONFIG_INITIALIZER,
      useFactory: initCdcConfigFactory,
      deps: [CdcConfigInitializer],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: cdcJsFactory,
      deps: [CdcJsService, ConfigInitializerService],
      multi: true,
    },
    {
      provide: CONFIG_INITIALIZER,
      useFactory: initCdcAuthConfigFactory,
      deps: [CdcAuthConfigInitializer],
      multi: true,
    },
    {
      provide: LOCATION_INITIALIZED_MULTI,
      useFactory: cdcAuthInitializedFactory,
      multi: true,
    },
    provideDefaultConfig(defaultCdcRoutingConfig),
  ],
})
export class CdcRootModule {}
