import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorPriceComponentOptions } from '../../../price';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';

@Component({
  selector: 'cx-configurator-attribute-checkbox',
  templateUrl: './configurator-attribute-checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeCheckBoxComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit
{
  @Input() attribute: Configurator.Attribute;
  @Input() group: string;
  @Input() ownerKey: string;
  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  attributeCheckBoxForm = new FormControl('');

  ngOnInit() {
    this.attributeCheckBoxForm.setValue(this.attribute.selectedSingleValue);
  }

  /**
   * Fired when a check box has been selected i.e. when a value has been set
   */
  onSelect(): void {
    const selectedValues = this.assembleSingleValue();

    const event: ConfigFormUpdateEvent = {
      ownerKey: this.ownerKey,
      changedAttribute: {
        ...this.attribute,
        values: selectedValues,
      },
    };
    this.selectionChange.emit(event);
  }

  protected assembleSingleValue(): Configurator.Value[] {
    const localAssembledValues: Configurator.Value[] = [];
    const value = this.attribute.values ? this.attribute.values[0] : undefined;
    //we can assume that for this component, value is always present
    if (value) {
      const localAttributeValue: Configurator.Value = {
        valueCode: value.valueCode,
      };

      localAttributeValue.name = value.name;
      localAttributeValue.selected = this.attributeCheckBoxForm.value;
      localAssembledValues.push(localAttributeValue);
    }

    return localAssembledValues;
  }

  /**
   * Extract corresponding value price formula parameters.
   * For the multi-selection attribute types the complete price formula should be displayed at the value level.
   *
   * @param {Configurator.Value} value - Configurator value
   * @return {ConfiguratorPriceComponentOptions} - New price formula
   */
  extractValuePriceFormulaParameters(
    value: Configurator.Value
  ): ConfiguratorPriceComponentOptions | undefined {
    return {
      quantity: value.quantity,
      price: value.valuePrice,
      priceTotal: value.valuePriceTotal,
      isLightedUp: value.selected,
    };
  }
}
