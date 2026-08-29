/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, NgModule } from '@angular/core';
import {
  CmsConfig,
  FeatureToggles,
  OAuthCallbackGuard,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { SpinnerComponent } from '@spartacus/storefront';

@NgModule({
  imports: [],
  providers: [
    provideDefaultConfigFactory(
      (): CmsConfig =>
        inject(FeatureToggles).oauthCallbackPage
          ? <CmsConfig>{
              cmsComponents: {
                OAuthCallbackComponent: {
                  component: SpinnerComponent,
                  guards: [OAuthCallbackGuard],
                },
              },
            }
          : {}
    ),
  ],
})
export class OAuthCallbackModule {}
