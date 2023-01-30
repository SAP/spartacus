/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  CmsConfig,
  Config,
  ConfigInitializerService,
  GlobalMessageService,
  provideDefaultConfig,
  provideDefaultConfigFactory,
  UserAddressService
} from '@spartacus/core';
import { AddressBookComponent, AddressBookComponentService, LogoutGuard } from '@spartacus/storefront';
import { tap } from 'rxjs/operators';
import { CDCAddressBookComponentService } from './service/cdc-address-book.component.service';
import { cdcRoutingConfig } from './config/cdc-routing-config';
import { CDC_CORE_FEATURE, CDC_FEATURE } from './feature-name';
import { CdcLogoutGuard } from './guards/cdc-logout.guard';
import { CdcJsService } from './service/cdc-js.service';

export function cdcJsFactory(
  cdcJsService: CdcJsService,
  configInit: ConfigInitializerService
): () => Promise<Config> {
  const func = () =>
    configInit
      .getStable('context', 'cdc')
      .pipe(
        tap(() => {
          cdcJsService.initialize();
        })
      )
      .toPromise();
  return func;
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

@NgModule({
  providers: [
    provideDefaultConfigFactory(defaultCdcComponentsConfig),
    { provide: LogoutGuard, useExisting: CdcLogoutGuard },
    {
      provide: APP_INITIALIZER,
      useFactory: cdcJsFactory,
      deps: [CdcJsService, ConfigInitializerService],
      multi: true,
    },
    provideDefaultConfig(cdcRoutingConfig),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountAddressBookComponent: {
          component: AddressBookComponent,
          providers: [
            {
              provide: AddressBookComponentService,
              useClass: CDCAddressBookComponentService,
              deps: [
                UserAddressService,
                GlobalMessageService,
                CdcJsService
              ],
            },
          ],
        },
      },
    }),
  ],
})
export class CdcRootModule { }
