/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';

@Component({
  selector: 'cx-configurator-attribute-single-selection-image',
  templateUrl: './configurator-attribute-single-selection-image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeSingleSelectionImageComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit
{
  attributeRadioButtonForm = new UntypedFormControl('');

  @Input() attribute: Configurator.Attribute;
  @Input() ownerKey: string;
  @Input() expMode: boolean;

  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  ngOnInit(): void {
    this.attributeRadioButtonForm.setValue(this.attribute.selectedSingleValue);
  }

  /**
   * Submits a value.
   *
   * @param {string} value - Selected value
   */
  onClick(value: string): void {
    const event: ConfigFormUpdateEvent = {
      ownerKey: this.ownerKey,
      changedAttribute: {
        ...this.attribute,
        selectedSingleValue: value,
      },
    };
    this.selectionChange.emit(event);
  }

  extractValuePriceFormulaParameters(
    value?: Configurator.Value
  ): ConfiguratorPriceComponentOptions | undefined {
    if (value) {
      return {
        price: value.valuePrice,
        isLightedUp: value.selected,
      };
    }
  }
}
