/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributePriceChangeService } from '../../price-change/configurator-attribute-price-change.service';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';

@Component({
  selector: 'cx-configurator-attribute-checkbox',
  templateUrl: './configurator-attribute-checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfiguratorAttributePriceChangeService],
})
export class ConfiguratorAttributeCheckBoxComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit
{
  attribute: Configurator.Attribute;
  group: string;
  ownerKey: string;
  expMode: boolean;
  attributeValue: Configurator.Value;

  attributeCheckBoxForm = new UntypedFormControl('');

  constructor(
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext,
    protected configuratorCommonsService: ConfiguratorCommonsService
  ) {
    super();
    this.attribute = attributeComponentContext.attribute;
    this.group = attributeComponentContext.group.id;
    this.ownerKey = attributeComponentContext.owner.key;
    this.expMode = attributeComponentContext.expMode;
    this.initPriceChangedEvent(
      attributeComponentContext.isPricingAsync,
      attributeComponentContext.attribute.key
    );
  }

  ngOnInit() {
    this.attributeCheckBoxForm.setValue(this.attribute.selectedSingleValue);
    this.attributeValue = this.getValueFromAttribute();
  }

  /**
   * Fired when a check box has been selected i.e. when a value has been set
   */
  onSelect(valueCode?: string): void {
    const selectedValues = this.assembleSingleValue();
    if (valueCode && this.listenForPriceChanges) {
      this.configuratorStorefrontUtilsService.setLastSelected(
        this.attribute.name,
        valueCode
      );
    }
    this.configuratorCommonsService.updateConfiguration(
      this.ownerKey,
      {
        ...this.attribute,
        values: selectedValues,
      },
      Configurator.UpdateType.ATTRIBUTE
    );
  }

  protected getValueFromAttribute(): Configurator.Value {
    //we can assume that for this component, value is always present
    //otherwise attribute type would not be correct,
    //could only happen in exceptional cases, on wrong modifications e.g.
    return this.attribute.values ? this.attribute.values[0] : { valueCode: '' };
  }

  protected assembleSingleValue(): Configurator.Value[] {
    const localAssembledValues: Configurator.Value[] = [];
    const value = this.getValueFromAttribute();

    const localAttributeValue: Configurator.Value = {
      valueCode: value.valueCode,
    };

    localAttributeValue.name = value.name;
    localAttributeValue.selected = this.attributeCheckBoxForm.value;
    localAssembledValues.push(localAttributeValue);

    return localAssembledValues;
  }
}
