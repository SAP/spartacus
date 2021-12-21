import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
@Component({
  selector: 'cx-configurator-attribute-multi-selection-image',
  templateUrl: './configurator-attribute-multi-selection-image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeMultiSelectionImageComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit
{
  @Input() attribute: Configurator.Attribute;
  @Input() ownerKey: string;

  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  constructor(
    protected configUtilsService: ConfiguratorStorefrontUtilsService
  ) {
    super();
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
  onSelect(index: number): void {
    this.attributeCheckBoxForms[index].setValue(
      !this.attributeCheckBoxForms[index].value
    );

    const selectedValues =
      this.configUtilsService.assembleValuesForMultiSelectAttributes(
        this.attributeCheckBoxForms,
        this.attribute
      );

    const event: ConfigFormUpdateEvent = {
      ownerKey: this.ownerKey,
      changedAttribute: {
        ...this.attribute,
        values: selectedValues,
      },
    };

    this.selectionChange.emit(event);
  }

  extractValuePriceFormulaParameters(
    value: Configurator.Value
  ): ConfiguratorPriceComponentOptions | undefined {
    return {
      quantity: value.quantity,
      price: value.valuePrice,
      priceTotal: value.valuePriceTotal,
      isLightedUp: value.selected,
    };
  }
}
