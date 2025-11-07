/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';

@Directive({
  selector: '[cxFeatureLevel]',
  standalone: false,
})
export class MockFeatureLevelDirective {
  protected templateRef = inject<TemplateRef<any>>(TemplateRef);
  protected viewContainer = inject(ViewContainerRef);


  @Input() set cxFeatureLevel(_feature: string | number) {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }
}
