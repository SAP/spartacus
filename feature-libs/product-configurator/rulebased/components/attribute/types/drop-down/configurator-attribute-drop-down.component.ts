import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConfiguratorAttributeQuantityComponentOptions } from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';

@Component({
  selector: 'cx-configurator-attribute-drop-down',
  templateUrl: './configurator-attribute-drop-down.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeDropDownComponent
  extends ConfiguratorAttributeSingleSelectionBaseComponent
  implements OnInit {
  attributeDropDownForm = new FormControl('');

  @Input() group: string;

  ngOnInit() {
    this.attributeDropDownForm.setValue(this.attribute.selectedSingleValue);
  }

  onSelect(): void {
    super.onSelect(this.attributeDropDownForm.value);
  }

  onChangeQuantity(eventObject: any): void {
    if (!eventObject) {
      this.attributeDropDownForm.setValue('');
      this.onSelect();
    } else {
      this.onHandleQuantity(eventObject);
    }
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
