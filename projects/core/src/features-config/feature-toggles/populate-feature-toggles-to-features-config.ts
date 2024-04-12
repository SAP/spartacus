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
  RootFeatureToggles,
} from './feature-toggles-tokens';

/**
 * Copies FeatureToggles to FeaturesConfig
 */
export const populateFeatureTogglesToFeaturesConfig: FactoryProvider[] = [
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
