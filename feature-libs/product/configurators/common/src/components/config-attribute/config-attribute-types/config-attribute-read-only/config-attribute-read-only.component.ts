import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Configurator } from '@spartacus/core';
import { ConfigUIKeyGenerator } from '../../../service/config-ui-key-generator';
@Component({
  selector: 'cx-config-attribute-read-only',
  templateUrl: './config-attribute-read-only.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeReadOnlyComponent {
  @Input() attribute: Configurator.Attribute;
  @Input() group: String;

  createAttributeIdForConfigurator(attribute: Configurator.Attribute): string {
    return ConfigUIKeyGenerator.createAttributeIdForConfigurator(attribute);
  }

  createValueUiKey(
    prefix: string,
    attributeId: string,
    valueId: string
  ): string {
    return ConfigUIKeyGenerator.createValueUiKey(prefix, attributeId, valueId);
  }
}
