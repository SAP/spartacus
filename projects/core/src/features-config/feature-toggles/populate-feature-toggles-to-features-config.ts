/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FactoryProvider, inject } from '@angular/core';
import {
  provideConfigFactory,
  provideDefaultConfigFactory,
} from '../../config';
import '../config/features-config';
import {
  DefaultFeatureToggles,
  FeatureToggles,
  RootFeatureToggles,
} from './feature-toggles-tokens';

export const populateFeatureTogglesToFeatureConfig: FactoryProvider[] = [
  // Copies RootFeatureToggles to RootConfig
  provideConfigFactory(() => {
    const flags = inject(RootFeatureToggles);
    return { features: { ...flags } };
  }),

  // Copies DefaultFeatureToggles to DefaultFeaturesConfig
  provideDefaultConfigFactory(() => {
    const flags = inject(DefaultFeatureToggles);
    return { features: { ...flags } };
  }),
];

declare module '../config/features-config' {
  interface FeaturesConfigContent extends FeatureToggles {}
}
