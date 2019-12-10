import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConfiguratorTextfield } from '@spartacus/core';

@Component({
  selector: 'cx-config-textfield-input-field',
  templateUrl: './config-textfield-input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigTextfieldInputFieldComponent implements OnInit {
  PREFIX_TEXTFIELD = 'cx-config-textfield';
  attributeInputForm = new FormControl('');

  constructor() {}

  @Input() attribute: ConfiguratorTextfield.ConfigurationInfo;

  @Output() inputChange = new EventEmitter();

  ngOnInit() {
    this.attributeInputForm.setValue(this.attribute.configurationValue);
  }

  onChange() {
    const attribute: ConfiguratorTextfield.ConfigurationInfo = {
      configurationLabel: this.attribute.configurationLabel,
      configurationValue: this.attributeInputForm.value,
    };

    this.inputChange.emit(attribute);
  }

  getIdLabel(attribute: ConfiguratorTextfield.ConfigurationInfo): string {
    return (
      this.PREFIX_TEXTFIELD +
      'label' +
      attribute.configurationLabel.replace(/\s/g, '')
    );
  }
  getId(attribute: ConfiguratorTextfield.ConfigurationInfo): string {
    return (
      this.PREFIX_TEXTFIELD + attribute.configurationLabel.replace(/\s/g, '')
    );
  }
}
