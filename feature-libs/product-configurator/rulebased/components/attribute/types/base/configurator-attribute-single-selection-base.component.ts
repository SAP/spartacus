import { ConfiguratorAttributeBaseComponent } from './configurator-attribute-base.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import {
  ConfiguratorAttributeQuantityComponentOptions,
  Quantity,
} from '../../quantity/configurator-attribute-quantity.component';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';

@Component({
  template: '',
})
export class ConfiguratorAttributeSingleSelectionBaseComponent extends ConfiguratorAttributeBaseComponent {
  loading$ = new BehaviorSubject<boolean>(false);

  @Input() attribute: Configurator.Attribute;
  @Input() ownerKey: string;
  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  // TODO(#11681): make quantityService a required dependency
  /**
   * default constructor
   * @param {ConfiguratorAttributeQuantityService} quantityService
   */
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  constructor(quantityService: ConfiguratorAttributeQuantityService);

  /**
   * @deprecated since 3.3
   */
  constructor();

  constructor(
    protected quantityService?: ConfiguratorAttributeQuantityService
  ) {
    super();
  }

  /**
   * Checks if we are supposed to render a quantity control, which
   * can be derived from the attribute meta data
   *
   * @return {boolean} - Display quantity picker?
   */
  get withQuantity() {
    return (
      this.quantityService?.withQuantity(
        this.attribute.dataType,
        this.attribute.uiType
      ) ?? false
    );
  }

  /**
   * Checks if quantity control should be disabled
   *
   * @return {boolean} - Disable quantity picker?
   */
  get disableQuantityActions() {
    return (
      this.quantityService?.disableQuantityActions(
        this.attribute.selectedSingleValue
      ) ?? true
    );
  }

  onSelect(value: string): void {
    this.loading$.next(true);

    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        selectedSingleValue: value,
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE,
    };

    this.selectionChange.emit(event);
  }

  onDeselect(): void {
    this.loading$.next(true);

    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        selectedSingleValue: '',
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE,
    };

    this.selectionChange.emit(event);
  }

  onHandleQuantity(quantity): void {
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

  onChangeQuantity(eventObject): void {
    if (!eventObject.quantity) {
      this.onDeselect();
    } else {
      this.onHandleQuantity(eventObject.quantity);
    }
  }

  /**
   *  Extract corresponding quantity parameters
   *
   * @param {boolean} disableQuantityActions - Disable quantity actions
   * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
   */
  extractQuantityParameters(): ConfiguratorAttributeQuantityComponentOptions {
    const quantity: number = this.attribute.quantity ?? 0;
    const initialQuantity: Quantity = {
      quantity: this.attribute.selectedSingleValue ? quantity : 0,
    };
    return {
      allowZero: !this.attribute.required,
      initialQuantity: initialQuantity,
      disableQuantityActions$: this.loading$.pipe(
        map((loading) => {
          return loading || this.disableQuantityActions;
        })
      ),
    };
  }

  /**
   * Extract corresponding price formula parameters
   *
   * @return {ConfiguratorPriceComponentOptions} - New price formula
   */
  extractPriceFormulaParameters(): ConfiguratorPriceComponentOptions {
    return {
      quantity: this.attribute.quantity,
      price: this.getSelectedValuePrice(),
      priceTotal: this.attribute.attributePriceTotal,
      isLightedUp: true,
    };
  }

  protected getSelectedValuePrice(): Configurator.PriceDetails | undefined {
    return this.attribute.values?.find((value) => value?.selected)?.valuePrice;
  }
}
