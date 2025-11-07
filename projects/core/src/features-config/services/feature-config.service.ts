/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { FeaturesConfig } from '../config/features-config';
import {
  isFeatureEnabled,
  isFeatureLevel,
} from '../utils/feature-config-utils';

@Injectable({
  providedIn: 'root',
})
export class FeatureConfigService {
  protected config = inject(FeaturesConfig);


  isLevel(version: string): boolean {
    return isFeatureLevel(this.config, version);
  }

  isEnabled(feature: string) {
    return isFeatureEnabled(this.config, feature);
  }
}
