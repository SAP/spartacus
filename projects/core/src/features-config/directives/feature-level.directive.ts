/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { FeatureConfigService } from '../services/feature-config.service';

@Directive({
  selector: '[cxFeatureLevel]',
  standalone: false,
})
export class FeatureLevelDirective {
  protected templateRef = inject<TemplateRef<any>>(TemplateRef);
  protected viewContainer = inject(ViewContainerRef);
  protected featureConfig = inject(FeatureConfigService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  private hasView = false;

  @Input() set cxFeatureLevel(level: string | number) {
    if (this.featureConfig.isLevel(level.toString()) && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!this.featureConfig.isLevel(level.toString()) && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
