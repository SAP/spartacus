/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';
import {
  SMART_EDIT_FEATURE,
  SmartEditConfig,
  SmartEditRootModule,
} from '@spartacus/smartedit/root';

@NgModule({
  declarations: [],
  imports: [SmartEditRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [SMART_EDIT_FEATURE]: {
          module: () =>
            import('@spartacus/smartedit').then((m) => m.SmartEditModule),
        },
      },
    }),
    provideConfig(<SmartEditConfig>{
      smartEdit: {
        storefrontPreviewRoute: 'STOREFRONT_PREVIEW_ROUTE_PLACEHOLDER',
        allowOrigin: 'ALLOWED_ORIGIN_PLACEHOLDER',
      },
    }),
  ],
})
export class SmartEditFeatureModule {}
