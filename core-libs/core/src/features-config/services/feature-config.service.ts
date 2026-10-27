/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { FeaturesConfig } from '../config/features-config';
import {
  isFeatureEnabled,
  isFeatureLevel,
} from '../utils/feature-config-utils';
import { FeatureToggleExpression } from '../feature-toggles';

/**
 * @deprecated - Use FeatureToggles instead
 */
@Injectable({
  providedIn: 'root',
})
export class FeatureConfigService {
  protected config = inject(FeaturesConfig);

  /**
   * @deprecated - features level is no longer used
   */
  isLevel(version: string): boolean {
    return isFeatureLevel(this.config, version);
  }

  isEnabled(feature: FeatureToggleExpression) {
    return isFeatureEnabled(this.config, feature);
  }
}
