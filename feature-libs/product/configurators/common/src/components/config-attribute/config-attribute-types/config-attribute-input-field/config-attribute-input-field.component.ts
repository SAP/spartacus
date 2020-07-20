import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Configurator, GenericConfigurator } from '@spartacus/core';
import { ConfigFormUpdateEvent } from '../../../config-form/config-form.event';
import { ConfigUIKeyGeneratorService } from '../../../service/config-ui-key-generator.service';

@Component({
  selector: 'cx-config-attribute-input-field',
  templateUrl: './config-attribute-input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeInputFieldComponent implements OnInit {
  uiKeyGenerator = ConfigUIKeyGeneratorService;
  attributeInputForm = new FormControl('');
  @Input() ownerType: GenericConfigurator.OwnerType;
  @Input() attribute: Configurator.Attribute;
  @Input() group: string;
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
      },
      groupId: this.group,
    };

    this.inputChange.emit(event);
  }
}
