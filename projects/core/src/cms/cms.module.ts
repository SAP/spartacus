/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  defaultCmsModuleConfig,
  defaultUserCmsModuleConfig,
} from './config/default-cms-config';
import { CmsService } from './facade/cms.service';
import { PageMetaModule } from './page/page-meta.module';
import { CmsStoreModule } from './store/cms-store.module';
import { ConfigChunk, provideDefaultConfigFactory } from '../config';
import { USER_CMS_ENDPOINTS } from '../model';

function getDefaultCmsConfig(configChunk: any) {
  let isUserCmsEndpoint = false;

  configChunk.find((config: any) => {
    const userCmsEndpoints = config.features?.[USER_CMS_ENDPOINTS];

    if (Boolean(userCmsEndpoints)) {
      isUserCmsEndpoint = userCmsEndpoints;
    }
  });

  if (isUserCmsEndpoint) {
    return defaultUserCmsModuleConfig;
  }
  return defaultCmsModuleConfig;
}

@NgModule({
  imports: [CmsStoreModule, PageMetaModule.forRoot()],
})
export class CmsModule {
  static forRoot(): ModuleWithProviders<CmsModule> {
    return {
      ngModule: CmsModule,
      providers: [
        CmsService,
        // TODO: (CXSPA-4886) In the major change to provideDefaultConfig(defaultCmsModuleConfig)
        provideDefaultConfigFactory(getDefaultCmsConfig, [ConfigChunk]),
      ],
    };
  }
}
