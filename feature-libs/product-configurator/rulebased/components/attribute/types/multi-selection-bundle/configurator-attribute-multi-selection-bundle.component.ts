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
import {
  ConfiguratorAttributeQuantityComponentOptions,
  Quantity,
} from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';

interface SelectionValue {
  name: string;
  quantity: number;
  selected: boolean;
  valueCode: string;
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

  constructor(private quantityService: ConfiguratorAttributeQuantityService) {
    super();
  }

  ngOnInit() {
    if (this.attribute?.values && this.attribute?.values?.length > 0) {
      this.multipleSelectionValues = this.attribute?.values.map(
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

  get withQuantityOnAttributeLevel() {
    return (
      this.attribute?.dataType ===
      Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL
    );
  }

  get withQuantity() {
    return this.quantityService.withQuantity(
      this.attribute?.dataType,
      this.attribute?.uiType
    );
  }

  get disableQuantityActions() {
    return (
      this.attribute?.dataType ===
        Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL &&
      (!this.attribute?.values.find((value) => value.selected) ||
        this.attribute?.quantity === 0)
    );
  }

  protected updateMultipleSelectionValues(valueCode, state) {
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

  protected updateMultipleSelectionValuesQuantity(eventValue) {
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

  onHandleAttributeQuantity(quantity): void {
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

  onSelect(eventValue): void {
    this.selectionChange.emit(
      this.updateMultipleSelectionValues(eventValue, true)
    );
  }

  onDeselect(eventValue): void {
    this.selectionChange.emit(
      this.updateMultipleSelectionValues(eventValue, false)
    );
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
    this.selectionChange.emit(event);
  }

  onChangeValueQuantity(eventValue): void {
    this.selectionChange.emit(
      this.updateMultipleSelectionValuesQuantity(eventValue)
    );
  }

  onChangeAttributeQuantity(eventObject): void {
    this.loading$.next(true);

    if (!eventObject.quantity) {
      this.onDeselectAll();
    } else {
      this.onHandleAttributeQuantity(eventObject.quantity);
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
      priceTotal: this.attribute?.attributePriceTotal,
      isLightedUp: true,
    };
  }

  /**
   * Extract corresponding product card parameters
   *
   * @param {boolean} preventAction - Prevent action
   * @param {Configurator.Value} value - Value
   * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
   */
  extractProductCardParameters(
    preventAction: boolean,
    value: Configurator.Value
  ): ConfiguratorAttributeProductCardComponentOptions {
    return {
      preventAction: preventAction,
      productBoundValue: value,
      multiSelect: true,
      withQuantity: this.withQuantity,
    };
  }

  /**
   *  Extract corresponding quantity parameters
   *
   * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
   */
  extractQuantityParameters(): ConfiguratorAttributeQuantityComponentOptions {
    const initialQuantity: Quantity = {
      quantity: this.attribute?.quantity ?? 0,
    };

    return {
      allowZero: !this.attribute?.required,
      initialQuantity: initialQuantity,
      disableQuantityActions: this.loading$.pipe(
        map((loading) => {
          return loading || this.disableQuantityActions;
        })
      ),
    };
  }
}
