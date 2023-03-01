/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslationService } from '@spartacus/core';

import {
  ConfiguratorAttributeCompositionContext,
  ConfiguratorAttributeQuantityService,
  ConfiguratorAttributeRadioButtonComponent,
  ConfiguratorCommonsService,
} from '@spartacus/product-configurator/rulebased';

@Component({
  selector: 'custom-attribute-radio-button',
  templateUrl: './custom-attribute-radio-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomAttributeRadioButtonComponent extends ConfiguratorAttributeRadioButtonComponent {
  constructor(
    protected quantityService: ConfiguratorAttributeQuantityService,
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected translation: TranslationService
  ) {
    super(
      quantityService,
      attributeComponentContext,
      configuratorCommonsService,
      translation
    );
  }
}
