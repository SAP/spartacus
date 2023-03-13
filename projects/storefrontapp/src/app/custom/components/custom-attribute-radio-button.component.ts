/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslationService } from '@spartacus/core';
import { ThemePalette } from '@angular/material/core';

import {
  ConfiguratorAttributeCompositionContext,
  ConfiguratorAttributeQuantityService,
  ConfiguratorCommonsService,
} from '@spartacus/product-configurator/rulebased';

@Component({
  selector: 'custom-attribute-radio-button',
  templateUrl: './custom-attribute-radio-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomAttributeRadioButtonComponent {
  colorCtr = new FormControl(null);
  disabled = false;
  touchUi = false;
  color: ThemePalette = 'primary';

  constructor(
    protected quantityService: ConfiguratorAttributeQuantityService,
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected translation: TranslationService
  ) {}
}
