import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfiguratorSingleSelection } from '../../../service/configurator-single-selection';

@Component({
  selector: 'cx-configurator-attribute-radio-button',
  templateUrl: './configurator-attribute-radio-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeRadioButtonComponent extends ConfiguratorSingleSelection {}
