/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { TranslationService } from '@spartacus/core';

import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';

@Component({
  selector: 'cx-configurator-attribute-radio-button',
  templateUrl: './configurator-attribute-radio-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeRadioButtonComponent
  extends ConfiguratorAttributeSingleSelectionBaseComponent
  implements OnInit
{
  attributeRadioButtonForm = new UntypedFormControl('');

  constructor(
    protected quantityService: ConfiguratorAttributeQuantityService,
    protected translation: TranslationService
  ) {
    super(quantityService, translation);
  }

  ngOnInit(): void {
    this.attributeRadioButtonForm.setValue(this.attribute.selectedSingleValue);
  }
}
