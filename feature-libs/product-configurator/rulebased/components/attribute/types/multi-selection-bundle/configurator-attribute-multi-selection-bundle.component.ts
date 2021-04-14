import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorAttributeProductCardComponentOptions } from '../../product-card/configurator-attribute-product-card.component';
import { ConfiguratorAttributeQuantityComponentOptions } from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';

interface SelectionValue {
  name?: string;
  quantity?: number;
  selected?: boolean;
  valueCode?: string;
}

@Component({
  selector: 'cx-configurator-attribute-multi-selection-bundle',
  templateUrl: './configurator-attribute-multi-selection-bundle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeMultiSelectionBundleComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit {
  preventAction$ = new BehaviorSubject<boolean>(false);
  multipleSelectionValues: SelectionValue[] = [];
  loading$ = new BehaviorSubject<boolean>(false);

  @Input() attribute: Configurator.Attribute;
  @Input() ownerKey: string;

  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  constructor(protected quantityService: ConfiguratorAttributeQuantityService) {
    super();
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
   * Returns true if the quantity control should be displayed on attribute level for this component.
   *
   * @return {boolean} - Returns true if quantity control should be displayed.
   */
  get withQuantityOnAttributeLevel(): boolean {
    return (
      this.attribute.dataType ===
      Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL
    );
  }

  /**
   * Returns true if the quantity control should be displayed on value level for this component.
   *
   * @return {boolean} - Returns true if quantity control should be displayed.
   */
  get withQuantity(): boolean {
    return this.quantityService.withQuantity(
      this.attribute.dataType ?? Configurator.DataType.NOT_IMPLEMENTED,
      this.attribute.uiType ?? Configurator.UiType.NOT_IMPLEMENTED
    );
  }

  /**
   * Returns true if the quantity control should be disabled.
   *
   * @return {boolean} - Returns true if quantity control should be disabled.
   */
  get disableQuantityActions(): boolean {
    return (
      this.attribute?.dataType ===
        Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL &&
      (!this.attribute.values.find((value) => value.selected) ||
        this.attribute?.quantity === 0)
    );
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
    const value: Configurator.Value = this.multipleSelectionValues.find(
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

  onHandleAttributeQuantity(quantity: any): void {
    this.loading$.next(true);

    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        quantity,
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE_QUANTITY,
    };

    this.selectionChange.emit(event);
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
    disableAllButtons: boolean,
    hideRemoveButton: boolean,
    value: Configurator.Value
  ): ConfiguratorAttributeProductCardComponentOptions {
    return {
      disableAllButtons: disableAllButtons,
      hideRemoveButton: hideRemoveButton,
      productBoundValue: value,
      multiSelect: true,
      withQuantity: this.withQuantity,
      loading$: this.loading$,
      attributeId: this.attribute.attrCode,
    };
  }

  /**
   *  Extract corresponding quantity parameters
   *
   * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
   */
  extractQuantityParameters(): ConfiguratorAttributeQuantityComponentOptions {
    return {
      allowZero: !this.attribute.required,
      initialQuantity: this.attribute?.quantity ?? 0,
      disableQuantityActions$: this.loading$.pipe(
        map((loading) => {
          return loading || this.disableQuantityActions;
        })
      ),
    };
  }
}
