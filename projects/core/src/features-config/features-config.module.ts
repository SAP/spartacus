/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  APP_BOOTSTRAP_LISTENER,
  ComponentRef,
  ModuleWithProviders,
  NgModule,
  inject,
} from '@angular/core';
import { provideDefaultConfig } from '../config/config-providers';
import { FeaturesConfig } from './config/features-config';
import { FeatureLevelDirective } from './directives/feature-level.directive';
import { FeatureDirective } from './directives/feature.directive';
import { provideDefaultFeatureToggles } from './feature-toggles';
import { defaultFeatureToggles } from './feature-toggles/config/feature-toggles';
import { populateFeatureTogglesToFeaturesConfig } from './feature-toggles/populate-feature-toggles-to-features-config';
import { FeatureStylesService } from './services/feature-styles.service';

@NgModule({
  declarations: [FeatureLevelDirective, FeatureDirective],
  exports: [FeatureLevelDirective, FeatureDirective],
})
export class FeaturesConfigModule {
  static forRoot(
    defaultLevel = '3.0'
  ): ModuleWithProviders<FeaturesConfigModule> {
    return {
      ngModule: FeaturesConfigModule,
      providers: [
        provideDefaultFeatureToggles(defaultFeatureToggles),
        ...populateFeatureTogglesToFeaturesConfig, // for backward compatibility with the deprecated FeaturesConfig
        provideDefaultConfig(<FeaturesConfig>{
          features: {
            level: defaultLevel || '*',
          },
        }),
        {
          provide: APP_BOOTSTRAP_LISTENER,
          multi: true,
          useFactory: (): ((compRef: ComponentRef<any>) => void) => {
            const featureStylesService = inject(FeatureStylesService);
            return (compRef: ComponentRef<any>) =>
              featureStylesService.init(compRef);
          },
        },
      ],
    };
  }
}
