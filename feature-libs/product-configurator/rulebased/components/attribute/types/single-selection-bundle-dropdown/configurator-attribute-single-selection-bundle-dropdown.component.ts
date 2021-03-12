import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
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

@Component({
  selector: 'cx-configurator-attribute-single-selection-bundle-dropdown',
  templateUrl:
    './configurator-attribute-single-selection-bundle-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeSingleSelectionBundleDropdownComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit {
  attributeDropDownForm = new FormControl('');
  loading$ = new BehaviorSubject<boolean>(false);
  selectionValue: Configurator.Value | undefined;

  @Input() attribute: Configurator.Attribute;
  @Input() group: string;
  @Input() ownerKey: string;

  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  constructor(private quantityService: ConfiguratorAttributeQuantityService) {
    super();
  }

  ngOnInit() {
    this.attributeDropDownForm.setValue(this.attribute?.selectedSingleValue);

    if (this.attribute?.values && this.attribute?.values?.length > 0) {
      this.selectionValue = this.attribute?.values.find(
        (value) => value.selected
      );
    }
  }

  get withQuantity() {
    return this.quantityService.withQuantity(
      this.attribute?.dataType ?? Configurator.DataType.NOT_IMPLEMENTED,
      this.attribute?.uiType ?? Configurator.UiType.NOT_IMPLEMENTED
    );
  }

  get disableQuantityActions() {
    return this.quantityService.disableQuantityActions(
      this.attributeDropDownForm?.value
    );
  }

  onSelect(): void {
    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        selectedSingleValue: this.attributeDropDownForm?.value,
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE,
    };
    this.selectionChange.emit(event);
  }

  onDeselect(): void {
    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        selectedSingleValue: '0',
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE,
    };

    this.selectionChange.emit(event);
  }

  onChangeQuantity(eventObject: { quantity: number }): void {
    this.loading$.next(true);

    if (!eventObject.quantity) {
      this.attributeDropDownForm.setValue('');
      this.onSelect();
    } else {
      const event: ConfigFormUpdateEvent = {
        changedAttribute: {
          ...this.attribute,
          quantity: eventObject.quantity,
        },
        ownerKey: this.ownerKey,
        updateType: Configurator.UpdateType.ATTRIBUTE_QUANTITY,
      };

      this.selectionChange.emit(event);
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
   * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
   */
  extractProductCardParameters(): ConfiguratorAttributeProductCardComponentOptions {
    return {
      preventAction: true,
      productBoundValue: this.selectionValue,
      singleDropdown: true,
      withQuantity: false,
    };
  }

  /**
   *  Extract corresponding quantity parameters
   *
   * @param {boolean} disableQuantityActions - Disable quantity actions
   * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
   */
  extractQuantityParameters(): ConfiguratorAttributeQuantityComponentOptions {
    const initialQuantity: Quantity = {
      quantity:
        this.attributeDropDownForm.value !== '0'
          ? this.attribute?.quantity ?? 0
          : 0,
    };

    let quantityDisableObs: Observable<boolean> = this.loading$.pipe(
      map((isLoading) => {
        return isLoading || this.disableQuantityActions;
      })
    );

    return {
      allowZero: !this.attribute?.required,
      initialQuantity: initialQuantity,
      disableQuantityActions: quantityDisableObs,
    };
  }
}
