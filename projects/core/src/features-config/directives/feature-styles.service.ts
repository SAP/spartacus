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
  protected featureConfig = inject(FeatureConfigService);
  private rendererFactory = inject(RendererFactory2); // private, because needed only to create a renderer
  protected logger = inject(LoggerService);

  protected readonly CSS_FEATURE_FLAG_PREFIX = 'cxFeat_';

  protected renderer = this.rendererFactory.createRenderer(null, null);
  protected targetElement: HTMLElement | undefined;
  protected usagesCounter = new Map<string, number>();

  init(_rootComponent: ComponentRef<any>): void {
    this.targetElement = _rootComponent.location.nativeElement;
  }

  registerUsage(feature: string): void {
    const currentCounter = this.usagesCounter.get(feature) ?? 0;
    const cssClass = this.getCssClass(feature);
    if (cssClass && currentCounter === 0) {
      this.renderer.addClass(this.targetElement, cssClass);
    }
    this.usagesCounter.set(feature, currentCounter + 1);
  }

  unregisterUsage(feature: string): void {
    const currentCounter = this.usagesCounter.get(feature) ?? 0;
    const cssClass = this.getCssClass(feature);
    if (cssClass && currentCounter === 1) {
      this.renderer.removeClass(this.targetElement, cssClass);
    }
    if (currentCounter === 0 && isDevMode()) {
      this.logger.warn(
        `Feature flag CSS: "${feature}" is already not used, so it cannot be unregistered.`
      );
    }
    this.usagesCounter.set(feature, Math.max(currentCounter - 1, 0));
  }

  protected getCssClass(feature: string): string | undefined {
    return this.featureConfig.isEnabled(feature)
      ? `${this.CSS_FEATURE_FLAG_PREFIX}${feature}`
      : undefined;
  }
}
