import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { GenericConfigurator } from '@spartacus/core';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorUIKeyGenerator } from '../../../service/configurator-ui-key-generator';
import { Configurator } from './../../../../core/model/configurator.model';

@Component({
  selector: 'cx-configurator-attribute-input-field',
  templateUrl: './configurator-attribute-input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeInputFieldComponent implements OnInit {
  attributeInputForm = new FormControl('');
  @Input() ownerType: GenericConfigurator.OwnerType;
  @Input() attribute: Configurator.Attribute;
  @Input() ownerKey: string;

  @Output() inputChange = new EventEmitter<ConfigFormUpdateEvent>();

  ngOnInit() {
    this.attributeInputForm.setValue(this.attribute.userInput);
    if (
      this.ownerType === GenericConfigurator.OwnerType.CART_ENTRY &&
      this.attribute.required &&
      this.attribute.incomplete &&
      !this.attributeInputForm.value
    ) {
      this.attributeInputForm.markAsTouched();
    }
  }

  /**
   * Triggered when the user input has been changed
   */
  onChange(): void {
    const event: ConfigFormUpdateEvent = {
      productCode: this.ownerKey,
      changedAttribute: {
        name: this.attribute.name,
        userInput: this.attributeInputForm.value,
        uiType: this.attribute.uiType,
        groupId: this.attribute.groupId,
      },
    };

    this.inputChange.emit(event);
  }

  createAttributeIdForConfigurator(attribute: Configurator.Attribute): string {
    return ConfiguratorUIKeyGenerator.createAttributeIdForConfigurator(
      attribute
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
