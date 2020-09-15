import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConfiguratorUIKeyGenerator } from '../../../service/configurator-ui-key-generator';
import { Configurator } from './../../../../core/model/configurator.model';
@Component({
  selector: 'cx-configurator-attribute-read-only',
  templateUrl: './configurator-attribute-read-only.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeReadOnlyComponent {
  @Input() attribute: Configurator.Attribute;
  @Input() group: String;

  createAttributeIdForConfigurator(attribute: Configurator.Attribute): string {
    return ConfiguratorUIKeyGenerator.createAttributeIdForConfigurator(
      attribute
    );
  }

  createValueUiKey(
    prefix: string,
    attributeId: string,
    valueId: string
  ): string {
    return ConfiguratorUIKeyGenerator.createValueUiKey(
      prefix,
      attributeId,
      valueId
    );
  }
}
