import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorUiKeyGeneratorComponent } from '../base/configurator-ui-key-generator.component';

@Component({
  selector: 'cx-configurator-attribute-read-only',
  templateUrl: './configurator-attribute-read-only.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeReadOnlyComponent extends ConfiguratorUiKeyGeneratorComponent {
  @Input() attribute: Configurator.Attribute;
  /**
   * @deprecated since 4.1: remove redundant input parameter
   */
  @Input() group: String;
}
