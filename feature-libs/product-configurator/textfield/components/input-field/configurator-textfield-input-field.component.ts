import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConfiguratorTextfield } from '../../core/model/configurator-textfield.model';

@Component({
  selector: 'cx-configurator-textfield-input-field',
  templateUrl: './configurator-textfield-input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorTextfieldInputFieldComponent implements OnInit {
  PREFIX_TEXTFIELD = 'cx-configurator-textfield';
  attributeInputForm = new FormControl('');

  @Input() attribute: ConfiguratorTextfield.ConfigurationInfo;
  @Output()
  inputChange = new EventEmitter<ConfiguratorTextfield.ConfigurationInfo>();

  constructor() {}

  ngOnInit() {
    this.attributeInputForm.setValue(this.attribute.configurationValue);
  }
  /**
   * Triggered if an attribute value is changed. Triggers the emission of the inputChange event emitter that is
   * in turn received in the form component
   */
  onInputChange(): void {
    const attribute: ConfiguratorTextfield.ConfigurationInfo = {
      configurationLabel: this.attribute.configurationLabel,
      configurationValue: this.attributeInputForm.value,
    };

    this.inputChange.emit(attribute);
  }
  /**
   * Compiles an ID for the attribute label by using the label from the backend and a prefix 'label'
   * @param attribute Textfield configurator attribute. Carries the attribute label information from the backend
   * @returns ID
   */
  getIdLabel(attribute: ConfiguratorTextfield.ConfigurationInfo): string {
    return (
      this.PREFIX_TEXTFIELD + 'label' + this.getLabelForIdGeneration(attribute)
    );
  }
  /**
   * Compiles an ID for the attribute value by using the label from the backend
   * @param attribute Textfield configurator attribute. Carries the attribute label information from the backend
   * @returns ID
   */
  getId(attribute: ConfiguratorTextfield.ConfigurationInfo): string {
    return this.PREFIX_TEXTFIELD + this.getLabelForIdGeneration(attribute);
  }

  protected getLabelForIdGeneration(
    attribute: ConfiguratorTextfield.ConfigurationInfo
  ): string {
    //replace white spaces with an empty string
    return attribute.configurationLabel.replace(/\s/g, '');
  }
}
