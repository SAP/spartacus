/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { FEATURE_FLAG_COMMENTS_PRODUCT_SUPPORT } from './feature-toggles';

@NgModule({})
export class FeatureTogglesModule {
  static forRoot(): ModuleWithProviders<FeatureTogglesModule> {
    return {
      ngModule: FeatureTogglesModule,
      providers: [
        { provide: FEATURE_FLAG_COMMENTS_PRODUCT_SUPPORT, useValue: true },
      ],
    };
  }
}
