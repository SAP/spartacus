import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Configurator } from '@spartacus/core';
import { ConfigFormUpdateEvent } from '../../../config-form/config-form.event';
import { ConfigUIKeyGenerator } from '../../../service/config-ui-key-generator';
@Component({
  selector: 'cx-config-attribute-radio-button',
  templateUrl: './config-attribute-radio-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeRadioButtonComponent implements OnInit {
  attributeRadioButtonForm = new FormControl('');

  @Input() attribute: Configurator.Attribute;
  @Input() group: string;
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
      },
      groupId: this.group,
    };

    this.selectionChange.emit(event);
  }
  createAttributeValueIdForConfigurator(
    attribute: Configurator.Attribute,
    value: string
  ): string {
    return ConfigUIKeyGenerator.createAttributeValueIdForConfigurator(
      attribute,
      value
    );
  }

  createAttributeIdForConfigurator(attribute: Configurator.Attribute): string {
    return ConfigUIKeyGenerator.createAttributeIdForConfigurator(attribute);
  }

  createValueUiKey(
    prefix: string,
    attributeId: string,
    valueId: string
  ): string {
    return ConfigUIKeyGenerator.createValueUiKey(prefix, attributeId, valueId);
  }

  createAriaLabelledBy(
    prefix: string,
    attributeId: string,
    valueId?: string,
    hasQuantity?: boolean
  ): string {
    return ConfigUIKeyGenerator.createAriaLabelledBy(
      prefix,
      attributeId,
      valueId,
      hasQuantity
    );
  }
}
