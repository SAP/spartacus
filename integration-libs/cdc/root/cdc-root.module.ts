/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  AuthHttpHeaderService,
  CmsConfig,
  Config,
  CONFIG_INITIALIZER,
  ConfigInitializerService,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { LogoutGuard } from '@spartacus/storefront';
import { lastValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CdcConsentManagementModule } from './consent-management/cdc-consent.module';
import { defaultCdcRoutingConfig } from './config/default-cdc-routing-config';
import { CDC_CORE_FEATURE, CDC_FEATURE } from './feature-name';
import { CdcLogoutGuard } from './guards/cdc-logout.guard';
import { CdcJsService } from './service/cdc-js.service';
import { CdcConfigInitializer } from './config/cdc-config-initializer';
import { CdcAuthConfigInitializer } from './config/cdc-auth-config-initializer';
import { CdcAuthHttpHeaderService } from './service/cdc-auth-http-header.service';
import { SAPCDCScreenSetService } from './service';

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
        cmsComponents: ['GigyaRaasComponent','SAPCDCScreenSetComponent'],
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
      provide: AuthHttpHeaderService,
      useExisting: CdcAuthHttpHeaderService,
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
      deps: [CdcJsService, ConfigInitializerService,SAPCDCScreenSetService],
      multi: true,
    },
    {
      provide: CONFIG_INITIALIZER,
      useFactory: initCdcAuthConfigFactory,
      deps: [CdcAuthConfigInitializer],
      multi: true,
    },
    provideDefaultConfig(defaultCdcRoutingConfig),
  ],
})
export class CdcRootModule {}
