/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ComponentRef,
  Injectable,
  RendererFactory2,
  inject,
  isDevMode,
} from '@angular/core';
import { LoggerService } from '../../logger/logger.service';
import { FeatureConfigService } from './feature-config.service';

/**
 * Automatically adds/removes CSS classes to/from the root element of the application,
 * based on the explicitly registered usage of feature flags.
 *
 * The CSS classes are added only for flags that are currently used and enabled in the config.
 *
 * The CSS classes for flags that are enabled BUT NOT USED are NOT ADDED to the root element.
 */
@Injectable({ providedIn: 'root' })
export class FeatureStylesService {
  private rendererFactory = inject(RendererFactory2); // private, because needed only to create a renderer
  protected featureConfig = inject(FeatureConfigService);
  protected logger = inject(LoggerService);

  /**
   * Prefix for feature's CSS classes that are added to the root element
   *
   * The same as the one used in the SCSS mixin `@include forFeature()`
   */
  protected readonly CSS_FEATURE_FLAG_PREFIX = 'cxFeat_';

  /**
   * Angular Renderer util to add/remove CSS classes to/from the root element.
   */
  protected renderer = this.rendererFactory.createRenderer(null, null);

  /**
   * The root HTML element of the application to apply CSS classes to.
   *
   * It's set by the `init()` method.
   */
  protected rootElement: HTMLElement | undefined;

  /**
   * Tracks the number of usages of each feature flag.
   *
   * - when a counter becomes >0, the feature's CSS class will be added to the root element.
   * - when a counter becomes =0, the feature's CSS class will be removed from the root element.
   */
  protected usagesCounter = new Map<string, number>();

  /**
   * Saves the root element of the application for later usage in this service.
   *
   * In edge cases, if some usages of feature flags were registered
   * before the `init()` method was called, this method immediately adds
   * CSS classes to the root element for the already registered features usages.
   */
  init(rootComponent: ComponentRef<any>): void {
    this.rootElement = rootComponent.location.nativeElement;

    // Handle edge-case:
    // Add classes for all features that were used (called `registerUsage()`) before `init()` was invoked.
    // (e.g. it's the case when `registerUsage` was called in the constructor of the root component,
    //       which happens before the hook APP_BOOTSTRAP_LISTENER is invoked by Angular, therefore before `init` is invoked.)
    for (const [feature, count] of this.usagesCounter.entries()) {
      if (count > 0) {
        this.addClass(feature);
      }
    }
  }

  /**
   * Registers the usage of a given feature flag.
   *
   * - If the feature flag enabled, this method adds the feature's CSS class
   *    to the root element.
   * - If the feature flag is disabled, this method does nothing.
   *
   * Note: Please mind to call `unregisterUsage()` when the feature is not used anymore.
   *       Otherwise, the feature's CSS class will be added to the root element forever.
   */
  registerUsage(feature: string): void {
    const currentCounter = this.usagesCounter.get(feature) ?? 0;
    if (this.isEnabled(feature) && currentCounter === 0) {
      this.addClass(feature);
    }
    this.usagesCounter.set(feature, currentCounter + 1);
  }

  /**
   * Unregisters the usage of a feature flag.
   *
   * If the feature flag is enabled, this method removes the feature's CSS class
   * from the root element (unless there are other registered usages of the same feature yet).
   */
  unregisterUsage(feature: string): void {
    const currentCounter = this.usagesCounter.get(feature) ?? 0;
    if (currentCounter === 0 && isDevMode()) {
      this.logger.warn(
        `Feature flag CSS: "${feature}" is already not used, so it cannot be unregistered.`
      );
    }

    if (this.isEnabled(feature) && currentCounter === 1) {
      this.removeClass(feature);
    }
    this.usagesCounter.set(feature, Math.max(currentCounter - 1, 0));
  }

  /**
   * Returns whether the given feature flag is enabled.
   */
  protected isEnabled(feature: string): boolean {
    return this.featureConfig.isEnabled(feature);
  }

  /**
   * Adds the feature's CSS class to the root element, if the flag is enabled.
   *
   * It does nothing if the feature flag is disabled
   * or if the root element is not yet available.
   */
  protected addClass(feature: string) {
    const cssClass = this.getCssClass(feature);
    if (!this.rootElement || !cssClass) {
      return;
    }
    this.renderer.addClass(this.rootElement, cssClass);
  }

  /**
   * Removes the feature's CSS class from the root element, if the flag is enabled.
   *
   * It does nothing if the feature flag is disabled
   * or if the root element is not yet available.
   */
  protected removeClass(feature: string) {
    const cssClass = this.getCssClass(feature);
    if (!this.rootElement || !cssClass) {
      return;
    }
    this.renderer.removeClass(this.rootElement, cssClass);
  }

  /**
   * Returns a feature flag's CSS class name.
   *
   * The CSS class name consists of the prefix `cxFeat_`
   * and the feature flag name.
   */
  protected getCssClass(feature: string): string | undefined {
    return this.featureConfig.isEnabled(feature)
      ? `${this.CSS_FEATURE_FLAG_PREFIX}${feature}`
      : undefined;
  }
}
