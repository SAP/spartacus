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
import { ConfiguratorUIKeyGenerator } from '../../../service/configurator-ui-key-generator';
import { Configurator } from './../../../../core/model/configurator.model';
@Component({
  selector: 'cx-config-attribute-radio-button',
  templateUrl: './configurator-attribute-radio-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeRadioButtonComponent implements OnInit {
  attributeRadioButtonForm = new FormControl('');

  @Input() attribute: Configurator.Attribute;
  @Input() ownerKey: string;

  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  ngOnInit() {
    this.attributeRadioButtonForm.setValue(this.attribute.selectedSingleValue);
  }
  /**
   * Hit when value has been selected (from available domain)
   */
  onSelect(): void {
    const event: ConfigFormUpdateEvent = {
      productCode: this.ownerKey,
      changedAttribute: {
        name: this.attribute.name,
        selectedSingleValue: this.attributeRadioButtonForm.value,
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

  createAriaLabelledBy(
    prefix: string,
    attributeId: string,
    valueId?: string,
    hasQuantity?: boolean
  ): string {
    return ConfiguratorUIKeyGenerator.createAriaLabelledBy(
      prefix,
      attributeId,
      valueId,
      hasQuantity
    );
  }
}
