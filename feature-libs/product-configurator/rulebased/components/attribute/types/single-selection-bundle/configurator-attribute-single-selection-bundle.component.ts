import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

@Component({
  selector: 'cx-configurator-attribute-single-selection-bundle',
  templateUrl:
    './configurator-attribute-single-selection-bundle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeSingleSelectionBundleComponent extends ConfiguratorAttributeBaseComponent {
  loading$ = new BehaviorSubject<boolean>(false);

  @Input() attribute: Configurator.Attribute;
  @Input() ownerKey: string;
  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  constructor(protected quantityService: ConfiguratorAttributeQuantityService) {
    super();
  }

  get withQuantity() {
    return this.quantityService.withQuantity(
      this.attribute?.dataType,
      this.attribute?.uiType
    );
  }

  get disableQuantityActions() {
    return this.quantityService.disableQuantityActions(
      this.attribute?.selectedSingleValue
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

  onHandleQuantity(quantity: any): void {
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

  onChangeQuantity(eventObject: any): void {
    if (!eventObject.quantity) {
      this.onDeselect();
    } else {
      this.onHandleQuantity(eventObject.quantity);
    }
  }

  getSelectedValuePrice(): Configurator.PriceDetails | undefined {
    return this.attribute?.values?.find((value) => value?.selected)?.valuePrice;
  }

  /**
   * Extract corresponding price formula parameters
   *
   * @return {ConfiguratorPriceComponentOptions} - New price formula
   */
  extractPriceFormulaParameters(): ConfiguratorPriceComponentOptions {
    return {
      quantity: this.attribute?.quantity,
      price: this.getSelectedValuePrice(),
      priceTotal: this.attribute?.attributePriceTotal,
      isLightedUp: true,
    };
  }

  /**
   * Extract corresponding product card parameters
   *
   * @param {Configurator.Value} value - Value
   * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
   */
  extractProductCardParameters(
    value: Configurator.Value
  ): ConfiguratorAttributeProductCardComponentOptions {
    return {
      preventAction: this.attribute?.required,
      productBoundValue: value,
    };
  }

  /**
   *  Extract corresponding quantity parameters
   *
   * @param {boolean} disableQuantityActions - Disable quantity actions
   * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
   */
  extractQuantityParameters(
    disableQuantityActions: boolean
  ): ConfiguratorAttributeQuantityComponentOptions {
    const quantity = this.attribute?.quantity;
    const initialQuantity: Quantity = {
      quantity: this.attribute?.selectedSingleValue
        ? quantity
          ? quantity
          : 0
        : 0,
    };

    return {
      allowZero: !this.attribute?.required,
      initialQuantity: initialQuantity,
      disableQuantityActions: disableQuantityActions,
    };
  }
}
