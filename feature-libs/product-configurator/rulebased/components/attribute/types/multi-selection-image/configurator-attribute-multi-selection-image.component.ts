import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeMultiSelectionBaseComponent } from '../base/configurator-attribute-multi-selection-base.component';

@Component({
  selector: 'cx-configurator-attribute-multi-selection-image',
  templateUrl: './configurator-attribute-multi-selection-image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeMultiSelectionImageComponent
  extends ConfiguratorAttributeMultiSelectionBaseComponent
  implements OnInit {
  constructor(
    /**
     * @deprecated since 4.1: remove ConfiguratorStorefrontUtilsService dependency
     */
    protected configUtilsService: ConfiguratorStorefrontUtilsService,
    protected quantityService: ConfiguratorAttributeQuantityService
  ) {
    super(quantityService);
  }

  attributeCheckBoxForms = new Array<FormControl>();

  ngOnInit() {
    const values = this.attribute.values;
    if (values) {
      for (const value of values) {
        let attributeCheckBoxForm: FormControl;
        if (value.selected) {
          attributeCheckBoxForm = new FormControl(true);
        } else {
          attributeCheckBoxForm = new FormControl(false);
        }
        this.attributeCheckBoxForms.push(attributeCheckBoxForm);
      }
    }
  }

  /**
   * Fired when a value has been selected
   * @param index Index of selected value
   */
  onSelect(): void {
    /**
    this.attributeCheckBoxForms[index].setValue(
      !this.attributeCheckBoxForms[index].value
    );*/

    const selectedValues = this.assembleValuesForMultiSelectAttributes(
      this.attributeCheckBoxForms,
      this.attribute
    );

    super.onSelect(selectedValues);
  }
}
