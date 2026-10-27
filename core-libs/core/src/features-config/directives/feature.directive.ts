/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { FeatureConfigService } from '../services/feature-config.service';
import { FeatureToggleExpression } from '../feature-toggles';

@Directive({ selector: '[cxFeature]' })
export class FeatureDirective {
  protected templateRef = inject<TemplateRef<any>>(TemplateRef);
  protected viewContainer = inject(ViewContainerRef);
  private featureConfig = inject(FeatureConfigService);

  private hasView = false;

  @Input() set cxFeature(feature: FeatureToggleExpression) {
    if (this.featureConfig.isEnabled(feature) && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!this.featureConfig.isEnabled(feature) && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
