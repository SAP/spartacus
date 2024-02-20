/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { FeatureStylesService } from './feature-styles.service';

@Directive({
  selector: '[cxFeatureStyles]',
})
export class FeatureStylesDirective implements OnInit, OnDestroy {
  protected service = inject(FeatureStylesService);

  /**
   * The name of the feature flag that is used to enable or disable
   * the CSS flag in the body element
   */
  @Input({ required: true }) cxFeatureStyles: string;

  // SPIKE TODO UNCOMMENT
  ngOnInit(): void {
    this.service.registerUsage(this.cxFeatureStyles);
  }

  ngOnDestroy(): void {
    this.service.unregisterUsage(this.cxFeatureStyles);
  }
}
