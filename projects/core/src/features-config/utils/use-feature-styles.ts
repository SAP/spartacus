/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DestroyRef, assertInInjectionContext, inject } from '@angular/core';
import { FeatureStylesService } from '../services/feature-styles.service';

/**
 * Registers the usage of the feature flag's styles in the component. Must be called in the component's constructor.
 *
 * IMPORTANT: If not called in the constructor of your component, the feature styles MIGHT NOT be activated EVEN if the flag is enabled!
 *
 * You should call it in the constructor of EVERY component that uses feature flag's styles.
 * For instance, if the SCSS of your component you have:
 * ```scss
 * %cx-my-component {
 *   ...
 *     ...
 *       @include forFeature('myFeatureFlag') { ... }
 * }
 * ```
 * ... then you should also call `useFeatureStyles('myFeatureFlag')` in the constructor of this component.
 *
 * Under the hood, to activate the styles, a corresponding CSS class is added the root element of the application.
 *
 * Note: When your component is destroyed, the CSS class is removed from the root element
 * (unless there exist yet other components that declared using the same feature flag's styles).
 */
export function useFeatureStyles(feature: string): void {
  assertInInjectionContext(useFeatureStyles);

  const featureStylesService = inject(FeatureStylesService);
  const destroyRef = inject(DestroyRef);

  featureStylesService.registerUsage(feature);
  destroyRef.onDestroy(() => featureStylesService.unregisterUsage(feature));
}
