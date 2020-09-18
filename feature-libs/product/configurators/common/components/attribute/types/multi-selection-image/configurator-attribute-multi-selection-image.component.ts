import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorUIKeyGenerator } from '../../../service/configurator-ui-key-generator';
import { Configurator } from './../../../../core/model/configurator.model';
@Component({
  selector: 'cx-configurator-attribute-multi-selection-image',
  templateUrl: './configurator-attribute-multi-selection-image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeMultiSelectionImageComponent
  implements OnInit {
  @Input() attribute: Configurator.Attribute;
  @Input() ownerKey: string;

  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  constructor(
    protected configUtilsService: ConfiguratorStorefrontUtilsService
  ) {}

  attributeCheckBoxForms = new Array<FormControl>();

  ngOnInit() {
    for (const value of this.attribute.values) {
      let attributeCheckBoxForm: FormControl;
      if (value.selected === true) {
        attributeCheckBoxForm = new FormControl(true);
      } else {
        attributeCheckBoxForm = new FormControl(false);
      }
      this.attributeCheckBoxForms.push(attributeCheckBoxForm);
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

    const selectedValues = this.configUtilsService.assembleValuesForMultiSelectAttributes(
      this.attributeCheckBoxForms,
      this.attribute
    );

    const event: ConfigFormUpdateEvent = {
      productCode: this.ownerKey,
      changedAttribute: {
        name: this.attribute.name,
        values: selectedValues,
        uiType: this.attribute.uiType,
        groupId: this.attribute.groupId,
      },
    };

    this.selectionChange.emit(event);
  }

  createAttributeValueIdForConfigurator(
    attribute: Configurator.Attribute,
    value: string
  ): string {
    return ConfiguratorUIKeyGenerator.createAttributeValueIdForConfigurator(
      attribute,
      value
    );
  }

  createAttributeIdForConfigurator(attribute: Configurator.Attribute): string {
    return ConfiguratorUIKeyGenerator.createAttributeIdForConfigurator(
      attribute
    );
  }

  createValueUiKey(
    prefix: string,
    attributeId: string,
    valueId: string
  ): string {
    return ConfiguratorUIKeyGenerator.createValueUiKey(
      prefix,
      attributeId,
      valueId
    );
  }
}
