/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';

@Directive({
  selector: '[cxFeature]',
  standalone: false,
})
export class MockFeatureDirective {
  protected templateRef = inject<TemplateRef<any>>(TemplateRef);
  protected viewContainer = inject(ViewContainerRef);


  @Input() set cxFeature(_feature: string) {
    // ensure the deprecated DOM changes are not rendered during tests

    if (!_feature.toString().includes('!')) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
