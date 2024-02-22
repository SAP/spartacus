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
import { FeatureConfigService } from '../services/feature-config.service';

@Injectable({ providedIn: 'root' })
export class FeatureStylesService {
  private rendererFactory = inject(RendererFactory2); // private, because needed only to create a renderer
  protected featureConfig = inject(FeatureConfigService);
  protected logger = inject(LoggerService);

  protected readonly CSS_FEATURE_FLAG_PREFIX = 'cxFeat_';

  protected renderer = this.rendererFactory.createRenderer(null, null);
  protected targetElement: HTMLElement | undefined;
  protected usagesCounter = new Map<string, number>();

  init(_rootComponent: ComponentRef<any>): void {
    this.targetElement = _rootComponent.location.nativeElement;

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

  registerUsage(feature: string): void {
    const currentCounter = this.usagesCounter.get(feature) ?? 0;
    if (this.isEnabled(feature) && currentCounter === 0) {
      this.addClass(feature);
    }
    this.usagesCounter.set(feature, currentCounter + 1);
  }

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

  protected isEnabled(feature: string): boolean {
    return this.featureConfig.isEnabled(feature);
  }

  protected addClass(feature: string) {
    const cssClass = this.getCssClass(feature);
    if (!this.targetElement || !cssClass) {
      return;
    }
    this.renderer.addClass(this.targetElement, cssClass);
  }

  protected removeClass(feature: string) {
    const cssClass = this.getCssClass(feature);
    if (!this.targetElement || !cssClass) {
      return;
    }
    this.renderer.removeClass(this.targetElement, cssClass);
  }

  protected getCssClass(feature: string): string | undefined {
    return this.featureConfig.isEnabled(feature)
      ? `${this.CSS_FEATURE_FLAG_PREFIX}${feature}`
      : undefined;
  }
}
