import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfiguratorSingleSelection } from '../../../service/configurator-single-selection';

@Component({
  selector: 'cx-configurator-attribute-single-selection-image',
  templateUrl: './configurator-attribute-single-selection-image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeSingleSelectionImageComponent extends ConfiguratorSingleSelection {}
