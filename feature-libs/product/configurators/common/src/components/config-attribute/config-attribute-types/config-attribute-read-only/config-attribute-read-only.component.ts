import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Configurator } from '@spartacus/core';
import { ConfigUIKeyGeneratorService } from '../../../service/config-ui-key-generator.service';
@Component({
  selector: 'cx-config-attribute-read-only',
  templateUrl: './config-attribute-read-only.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeReadOnlyComponent {
  @Input() attribute: Configurator.Attribute;
  @Input() group: String;

  constructor(public uiKeyGenerator: ConfigUIKeyGeneratorService) {}
}
