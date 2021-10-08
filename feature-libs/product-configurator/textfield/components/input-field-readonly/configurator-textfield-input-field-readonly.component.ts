import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ConfiguratorTextfield } from '../../core/model/configurator-textfield.model';

@Component({
  selector: 'cx-configurator-textfield-input-field-readonly',
  templateUrl: './configurator-textfield-input-field-readonly.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorTextfieldInputFieldReadonlyComponent {
  PREFIX_TEXTFIELD = 'cx-configurator-textfield';

  @Input() attribute: ConfiguratorTextfield.ConfigurationInfo;

  /**
   * Compiles an ID for the attribute label by using the label from the backend and a prefix 'label'
   * @param {ConfiguratorTextfield.ConfigurationInfo} attribute Textfield configurator attribute. Carries the attribute label information from the backend
   * @returns {string} ID
   */
  getIdLabel(attribute: ConfiguratorTextfield.ConfigurationInfo): string {
    return (
      this.PREFIX_TEXTFIELD + 'label' + this.getLabelForIdGeneration(attribute)
    );
  }

  protected getLabelForIdGeneration(
    attribute: ConfiguratorTextfield.ConfigurationInfo
  ): string {
    //replace white spaces with an empty string
    return attribute.configurationLabel.replace(/\s/g, '');
  }
}
