/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  defaultCmsModuleConfig,
  newCmsModuleConfig,
} from './config/default-cms-config';
import { CmsService } from './facade/cms.service';
import { PageMetaModule } from './page/page-meta.module';
import { CmsStoreModule } from './store/cms-store.module';
import { provideDefaultConfig, provideDefaultConfigFactory } from '../config';
import { isFeatureEnabled } from '../features-config';

const config = {
  features: {
    newCmsEndpoint: false,
  },
};

function isNewCmsEndpoint() {
  if (isFeatureEnabled(config, 'newCmsEndpoint')) {
    return newCmsModuleConfig;
  } else {
    return defaultCmsModuleConfig;
  }
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
        provideDefaultConfig(config), // This overrides default config in AppModule - to be removed
        provideDefaultConfigFactory(isNewCmsEndpoint),
      ],
    };
  }
}
