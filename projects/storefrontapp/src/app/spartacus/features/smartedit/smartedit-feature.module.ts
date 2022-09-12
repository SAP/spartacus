/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@commerce-storefront-toolset/core';
import {
  SmartEditRootModule,
  SMART_EDIT_FEATURE,
} from '@commerce-storefront-toolset/smartedit/root';

@NgModule({
  imports: [SmartEditRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [SMART_EDIT_FEATURE]: {
          module: () =>
            import('@commerce-storefront-toolset/smartedit').then((m) => m.SmartEditModule),
        },
      },
    }),
  ],
})
export class SmartEditFeatureModule {}
