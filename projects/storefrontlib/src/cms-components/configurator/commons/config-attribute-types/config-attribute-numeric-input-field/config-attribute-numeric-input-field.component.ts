import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { Configurator } from '@spartacus/core';
import { ConfigFormUpdateEvent } from '../../config-form/config-form.event';
import { ConfigUIKeyGeneratorService } from '../../service/config-ui-key-generator.service';
@Component({
  selector: 'cx-config-attribute-numeric-input-field',
  templateUrl: './config-attribute-numeric-input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeNumericInputFieldComponent implements OnInit {
  attributeInputForm = new FormControl('', [
    this.numberFormatValidator(100000000),
  ]);

  constructor(public uiKeyGenerator: ConfigUIKeyGeneratorService) {}

  @Input() attribute: Configurator.Attribute;
  @Input() group: string;
  @Input() ownerKey: string;

  @Output() inputChange = new EventEmitter<ConfigFormUpdateEvent>();

  ngOnInit() {
    this.attributeInputForm.setValue(this.attribute.userInput);
  }

  onChange() {
    const event: ConfigFormUpdateEvent = this.createEventFromInput();
    console.log('CHHI is invalid: ' + this.attributeInputForm.invalid);
    console.log('CHHI user input ' + this.attributeInputForm.value);
    if (!this.attributeInputForm.invalid) {
      this.inputChange.emit(event);
    }
  }

  createEventFromInput(): ConfigFormUpdateEvent {
    return {
      productCode: this.ownerKey,
      changedAttribute: {
        name: this.attribute.name,
        userInput: this.attributeInputForm.value,
        uiType: this.attribute.uiType,
      },
      groupId: this.group,
    };
  }

  numberFormatValidator(numberDecimalPlaces: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const numericValue: number = control.value;
      if (numericValue) {
        const wrongFormat: boolean =
          numericValue.valueOf() > numberDecimalPlaces;
        return wrongFormat ? { wrongFormat: { value: control.value } } : null;
      }
      return null;
    };
  }
}
