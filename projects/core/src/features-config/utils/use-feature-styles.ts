/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DestroyRef, inject } from '@angular/core';
import { FeatureStylesService } from '../directives/feature-styles.service';

export function useFeatureStyles(feature: string): void {
  const featureStylesService = inject(FeatureStylesService);
  const destroyRef = inject(DestroyRef);

  featureStylesService.registerUsage(feature);
  destroyRef.onDestroy(() => featureStylesService.unregisterUsage(feature));
}
