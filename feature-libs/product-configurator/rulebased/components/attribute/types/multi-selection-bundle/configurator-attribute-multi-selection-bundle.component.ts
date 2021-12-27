import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorAttributeProductCardComponentOptions } from '../../product-card/configurator-attribute-product-card.component';
import { ConfiguratorAttributeMultiSelectionBaseComponent } from '../base/configurator-attribute-multi-selection-base.component';

interface SelectionValue {
  name?: string;
  quantity?: number;
  selected?: boolean;
  valueCode: string;
}

@Component({
  selector: 'cx-configurator-attribute-multi-selection-bundle',
  templateUrl: './configurator-attribute-multi-selection-bundle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeMultiSelectionBundleComponent
  extends ConfiguratorAttributeMultiSelectionBaseComponent
  implements OnInit
{
  preventAction$ = new BehaviorSubject<boolean>(false);
  multipleSelectionValues: SelectionValue[] = [];

  ngOnInit() {
    if (this.attribute.values && this.attribute.values.length > 0) {
      this.multipleSelectionValues = this.attribute.values.map(
        ({ name, quantity, selected, valueCode }) => ({
          name,
          quantity,
          selected,
          valueCode,
        })
      );
    }

    if (
      this.attribute.required &&
      this.multipleSelectionValues.filter((value) => value.selected).length < 2
    ) {
      this.preventAction$.next(true);
    }
  }

  /**
   * Updates the value dependent on the provided state
   *
   * @param  {any} valueCode - value code to be updated
   * @param  {any} state - selected state
   *
   * @return {ConfigFormUpdateEvent} - form update event
   */
  protected updateMultipleSelectionValues(
    valueCode: any,
    state: any
  ): ConfigFormUpdateEvent {
    const index = this.multipleSelectionValues.findIndex(
      (value) => value.valueCode === valueCode
    );

    this.multipleSelectionValues[index] = {
      ...this.multipleSelectionValues[index],
      selected: state,
    };

    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        values: this.multipleSelectionValues,
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE,
    };

    return event;
  }

  /**
   * Updates the quantity of the given value
   *
   * @param  eventValue - event value
   *
   * @return {ConfigFormUpdateEvent} - form update event
   */
  protected updateMultipleSelectionValuesQuantity(eventValue: {
    valueCode: string;
    quantity: number;
  }): ConfigFormUpdateEvent | undefined {
    const value: Configurator.Value | undefined =
      this.multipleSelectionValues.find(
        (selectionValue) => selectionValue.valueCode === eventValue.valueCode
      );

    if (!value) return;

    value.quantity = eventValue.quantity;

    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        values: [value],
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.VALUE_QUANTITY,
    };

    return event;
  }

  onSelect(eventValue: any): void {
    this.loading$.next(true);
    this.selectionChange.emit(
      this.updateMultipleSelectionValues(eventValue, true)
    );
  }

  onDeselect(eventValue: any): void {
    this.loading$.next(true);
    this.selectionChange.emit(
      this.updateMultipleSelectionValues(eventValue, false)
    );
  }

  onDeselectAll(): void {
    this.loading$.next(true);
    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        values: [],
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE,
    };
    this.selectionChange.emit(event);
  }

  onChangeValueQuantity(eventValue: any): void {
    this.loading$.next(true);
    this.selectionChange.emit(
      this.updateMultipleSelectionValuesQuantity(eventValue)
    );
  }

  onChangeAttributeQuantity(eventObject: any): void {
    this.loading$.next(true);

    if (!eventObject) {
      this.onDeselectAll();
    } else {
      this.onHandleAttributeQuantity(eventObject);
    }
  }

  /**
   * Extract corresponding price formula parameters
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
   * Extract corresponding product card parameters
   * @param {boolean} disableAllButtons - Prevent all actions, e.g. while loading
   * @param {boolean} hideRemoveButton - hide remove action, e.g. if only value required attribute
   * @param {Configurator.Value} value - Value
   * @param {number} index - index of current value in list of values of attribute
   * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
   */
  extractProductCardParameters(
    disableAllButtons: boolean | null,
    hideRemoveButton: boolean | null,
    value: Configurator.Value,
    index: number
  ): ConfiguratorAttributeProductCardComponentOptions {
    return {
      disableAllButtons: disableAllButtons ? disableAllButtons : false,
      hideRemoveButton: hideRemoveButton ? hideRemoveButton : false,
      productBoundValue: value,
      multiSelect: true,
      withQuantity: this.withQuantity,
      loading$: this.loading$,
      attributeId: this.getAttributeCode(this.attribute),
      attributeLabel: this.attribute.label,
      attributeName: this.attribute.name,
      itemCount: this.attribute.values?.length
        ? this.attribute.values?.length
        : 0,
      itemIndex: index ? index : 0,
    };
  }
}
