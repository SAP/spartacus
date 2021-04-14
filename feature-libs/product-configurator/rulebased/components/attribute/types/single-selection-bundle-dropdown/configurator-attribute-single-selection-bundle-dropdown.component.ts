import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeProductCardComponentOptions } from '../../product-card/configurator-attribute-product-card.component';
import { ConfiguratorAttributeQuantityComponentOptions } from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';

@Component({
  selector: 'cx-configurator-attribute-single-selection-bundle-dropdown',
  templateUrl:
    './configurator-attribute-single-selection-bundle-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeSingleSelectionBundleDropdownComponent
  extends ConfiguratorAttributeSingleSelectionBaseComponent
  implements OnInit {
  attributeDropDownForm = new FormControl('');
  selectionValue: Configurator.Value | undefined;

  @Input() group: string;

  ngOnInit() {
    this.attributeDropDownForm.setValue(this.attribute?.selectedSingleValue);

    if (this.attribute?.values && this.attribute?.values?.length > 0) {
      this.selectionValue = this.attribute?.values.find(
        (value) => value.selected
      );
    }
  }

  onDeselect(): void {
    super.onDeselect('0');
  }

  onChangeQuantity(eventObject: any): void {
    this.loading$.next(true);

    if (!eventObject) {
      this.attributeDropDownForm.setValue('');
      this.onSelect(this.attributeDropDownForm?.value);
    } else {
      this.onHandleQuantity(eventObject);
    }
  }

  /**
   * Extract corresponding product card parameters
   *
   * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
   */
  extractProductCardParameters(): ConfiguratorAttributeProductCardComponentOptions {
    return {
      hideRemoveButton: true,
      productBoundValue: this.selectionValue,
      singleDropdown: true,
      withQuantity: false,
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
    const initialQuantity =
      this.attributeDropDownForm.value !== '0'
        ? this.attribute.quantity ?? 0
        : 0;

    return super.extractQuantityParameters(initialQuantity);
  }
}
