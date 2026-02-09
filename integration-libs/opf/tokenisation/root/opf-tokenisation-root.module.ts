/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { OPF_TOKENISATION_FEATURE } from './feature-name';
import { NgModule } from '@angular/core';

export function defaultOpfTokenisationCmsComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [OPF_TOKENISATION_FEATURE]: {
        cmsComponents: [''],
      },
    },
  };
  return config;
}

@NgModule({
  providers: [
    provideDefaultConfigFactory(defaultOpfTokenisationCmsComponentsConfig),
    // provideDefaultConfig(defaultOpfTokenisationConfig),
  ],
})
export class OpfTokenisationRootModule {}
