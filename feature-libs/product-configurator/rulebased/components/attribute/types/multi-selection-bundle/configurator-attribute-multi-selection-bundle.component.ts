import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorAttributeProductCardComponentOptions } from '../../product-card/configurator-attribute-product-card.component';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
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
  implements OnInit {
  preventAction$ = new BehaviorSubject<boolean>(false);
  multipleSelectionValues: SelectionValue[] = [];

  constructor(protected quantityService: ConfiguratorAttributeQuantityService) {
    super(quantityService);
  }

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
      this.attribute?.required &&
      this.multipleSelectionValues.filter((value) => value.selected).length < 2
    ) {
      this.preventAction$.next(true);
    }
  }

  /**
   * Updates the value dependent on the provided state
   *
   * @param  {string} valueCode - value code to be updated
   * @param  {boolean} state - selected state
   *
   * @return {ConfigFormUpdateEvent} - form update event
   */
  protected updateMultipleSelectionValues(
    valueCode: string,
    state: boolean
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
    const value:
      | Configurator.Value
      | undefined = this.multipleSelectionValues.find(
      (selectionValue) => selectionValue?.valueCode === eventValue.valueCode
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
    this.emitEvent(this.updateMultipleSelectionValues(eventValue, true));
  }

  onDeselect(eventValue: any): void {
    this.emitEvent(this.updateMultipleSelectionValues(eventValue, false));
  }

  onDeselectAll(): void {
    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        values: [],
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE,
    };
    this.emitEvent(event);
  }

  onChangeValueQuantity(eventValue: any): void {
    const event = this.updateMultipleSelectionValuesQuantity(eventValue);
    if (event) {
      this.emitEvent(event);
    }
  }

  onChangeAttributeQuantity(eventObject: any): void {
    if (!eventObject) {
      this.onDeselectAll();
    } else {
      this.onHandleQuantity(eventObject);
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
   * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
   */
  extractProductCardParameters(
    disableAllButtons: boolean | null,
    hideRemoveButton: boolean | null,
    value: Configurator.Value
  ): ConfiguratorAttributeProductCardComponentOptions {
    return {
      disableAllButtons: disableAllButtons ? disableAllButtons : false,
      hideRemoveButton: hideRemoveButton ? hideRemoveButton : false,
      productBoundValue: value,
      multiSelect: true,
      withQuantity: this.withQuantity,
      loading$: this.loading$,
      attributeId: this.getAttributeCode(this.attribute),
    };
  }
}
