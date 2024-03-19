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
  BreakingChangesFlags,
  DefaultBreakingChangesFlags,
  RootBreakingChangesFlags,
} from './breaking-changes-flags-tokens';

export const populateBreakingChangesFlagsToFeatureConfig: FactoryProvider[] = [
  // Copies RootBreakingChangesFlags to RootConfig
  provideConfigFactory(() => {
    const flags = inject(RootBreakingChangesFlags);
    return { features: { ...flags } };
  }),

  // Copies DefaultBreakingChangesFlags to DefaultFeaturesConfig
  provideDefaultConfigFactory(() => {
    const flags = inject(DefaultBreakingChangesFlags);
    return { features: { ...flags } };
  }),
];

declare module '../config/features-config' {
  interface FeaturesConfigContent extends BreakingChangesFlags {}
}
