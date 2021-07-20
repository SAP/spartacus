import { Directive, isDevMode } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorAttributeQuantityComponentOptions } from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeBaseComponent } from './configurator-attribute-base.component';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class ConfiguratorAttributeMultiSelectionBaseComponent extends ConfiguratorAttributeBaseComponent {
  /**
   * Checks if we are supposed to render a quantity control on attribute level, which
   * can be derived from the attribute meta data
   *
   * @return {boolean} - Display quantity picker on attribute level?
   */
  get withQuantityOnAttributeLevel(): boolean {
    return (
      this.quantityService?.withQuantityOnAttributeLevel(this.attribute) ??
      false
    );
  }

  /**
   * Checks if quantity control should be disabled
   *
   * @return {boolean} - Disable quantity picker?
   */
  get disableQuantityActions(): boolean {
    return (
      this.quantityService?.disableQuantityActionsMultiSelection(
        this.attribute
      ) ?? true
    );
  }

  /**
   *  Extract corresponding quantity parameters
   *
   * @param {number} initialQuantity - Initial quantity
   * @param {boolean} allowZero - Allow zero
   * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
   */
  extractQuantityParameters(
    initialQuantity?: number,
    allowZero?: boolean
  ): ConfiguratorAttributeQuantityComponentOptions {
    const disableQuantityActions$ = this.loading$.pipe(
      map((loading) => {
        return loading || this.disableQuantityActions;
      })
    );

    return {
      allowZero: allowZero ?? !this.attribute.required,
      initialQuantity: initialQuantity,
      disableQuantityActions$: disableQuantityActions$,
    };
  }

  /**
   * Assemble an attribute value with the currently selected values from a checkbox list.
   *
   * @param {FormControl[]} controlArray - Control array
   * @param {Configurator.Attribute} attribute -  Configuration attribute
   * @return {Configurator.Value[]} - list of configurator values
   */
  assembleValuesForMultiSelectAttributes(
    controlArray: FormControl[],
    attribute: Configurator.Attribute
  ): Configurator.Value[] {
    const localAssembledValues: Configurator.Value[] = [];

    for (let i = 0; i < controlArray.length; i++) {
      const value = attribute.values ? attribute.values[i] : undefined;
      if (value) {
        const localAttributeValue: Configurator.Value = {
          valueCode: value.valueCode,
        };
        localAttributeValue.name = value.name;
        localAttributeValue.quantity = value.quantity;
        localAttributeValue.selected = controlArray[i].value;

        localAssembledValues.push(localAttributeValue);
      } else {
        if (isDevMode()) {
          console.warn(
            'ControlArray does not match values, at least one value could not been found'
          );
        }
      }
    }
    return localAssembledValues;
  }

  onSelect(values: Configurator.Value[]): void {
    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        values: values,
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE,
    };
    this.selectionChange.emit(event);
  }

  /**
   * Extract corresponding price formula parameters.
   * For the multi-selection attribute types only total price of the attribute should be displayed at the attribute level.
   *
   * @return {ConfiguratorPriceComponentOptions} - New price formula
   */
  extractPriceFormulaParameters(): ConfiguratorPriceComponentOptions {
    return {
      quantity: 0,
      price: {
        value: 0,
        currencyIso: '',
      },
      priceTotal: this.attribute.attributePriceTotal,
      isLightedUp: true,
    };
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
      quantity: value?.quantity,
      price: value?.valuePrice,
      priceTotal: value?.valuePriceTotal,
      isLightedUp: value.selected,
    };
  }
}
