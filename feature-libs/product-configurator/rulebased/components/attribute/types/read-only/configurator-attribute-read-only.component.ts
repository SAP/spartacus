import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
@Component({
  selector: 'cx-configurator-attribute-read-only',
  templateUrl: './configurator-attribute-read-only.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeReadOnlyComponent extends ConfiguratorAttributeBaseComponent {
  @Input() attribute: Configurator.Attribute;
  @Input() group: String;
}
